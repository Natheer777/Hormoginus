import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import DetailsProduct from "../sections/Details_Product/Details_Product";
import axios from "axios";
import "./VerifyProduct.css";

export default function VerifyProduct() {
  const { id: linkId } = useParams(); // الرقم بعد السلاش (8, 2, 9, etc. أو اسم المنتج)
  const [productId, setProductId] = useState(null);
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [verified, setVerified] = useState(false);
  const [searchType, setSearchType] = useState(null); // جديد: نوع البحث
  const shouldDelete = useRef(false);
  const actualLinkId = useRef(null); // الـ link_id الحقيقي من قاعدة البيانات

  useEffect(() => {
    const verifyAndFetch = async () => {
      setLoading(true);
      setError(null);
      setProductData(null);
      setVerified(false);
      setSearchType(null);

      // تحقق إذا كان linkId رقم فقط (بحث بالرقم) أو نص (بحث بالاسم)
      const isId = /^\d+$/.test(linkId);
      setSearchType(isId ? 'id' : 'name');

      try {
        if (isId) {
          // البحث بالرقم (نفس المنطق السابق)
          const res1 = await axios.post(
            "https://hormogenius.com/api/get_p_by_link.php",
            { id: linkId }
          );

          let productIdFromLink = null;
          let linkIdFromDb = null;

          if (typeof res1.data === "string" && !isNaN(Number(res1.data))) {
            productIdFromLink = parseInt(res1.data, 10);
          } else if (
            res1.data &&
            res1.data.status === "success" &&
            res1.data.data &&
            res1.data.data[0]?.product_id
          ) {
            productIdFromLink = res1.data.data[0].product_id;
            // احفظ الـ link_id الحقيقي من قاعدة البيانات
            linkIdFromDb = res1.data.data[0].link_id || res1.data.data[0].id;
          }

          if (productIdFromLink) {
            setProductId(productIdFromLink);
            if (linkIdFromDb) {
              actualLinkId.current = linkIdFromDb;
            }
            const res2 = await axios.post(
              "https://hormogenius.com/api/get_product_by_id.php",
              { id: productIdFromLink }
            );
            if (
              res2.data.status === "success" &&
              res2.data.data &&
              res2.data.data[0]
            ) {
              setProductData(res2.data.data[0]);
              setVerified(true);
              shouldDelete.current = true;
            } else {
              setError("Product not found");
            }
          } else {
            setError("Product not found");
          }
        } else {
          // البحث بالاسم
          const res = await axios.post(
            "https://hormogenius.com/api/get_product_by_name.php",
            { name: linkId }
          );
          if (
            res.data.status === "success" &&
            res.data.data &&
            res.data.data[0]
          ) {
            setProductData(res.data.data[0]);
            setVerified(true);
            shouldDelete.current = false; // لا داعي للحذف عند البحث بالاسم
          } else {
            setError("Product not found");
          }
        }
      } catch (err) {
        setError("Product not found");
      } finally {
        setLoading(false);
      }
    };

    verifyAndFetch();
  }, [linkId]);

  // دالة لحذف الرابط باستخدام الـ link_id الحقيقي
  const deleteLink = async () => {
    const idToDelete = actualLinkId.current || linkId;

    if (shouldDelete.current && idToDelete) {
      try {
        await axios.post("https://hormogenius.com/api/delete_link.php", {
          id: idToDelete
        });
        console.log('Link deleted successfully, ID:', idToDelete);
        console.log('Original linkId from URL:', linkId);
        console.log('Actual linkId from DB:', actualLinkId.current);
      } catch (error) {
        console.error('Error deleting link:', error);
      }
    }
  };

  useEffect(() => {
    // دالة للتعامل مع إغلاق الصفحة
    const handleBeforeUnload = async () => {
      const idToDelete = actualLinkId.current || linkId;

      if (shouldDelete.current && idToDelete) {
        try {
          // استخدام fetch مع keepalive للحفاظ على الطلب عند إغلاق الصفحة
          await fetch("https://hormogenius.com/api/delete_link.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: idToDelete }),
            keepalive: true,
          });
          console.log('Link deleted via fetch on beforeunload, ID:', idToDelete);
        } catch (error) {
          console.error("Error deleting link via fetch:", error);

          // Fallback: استخدام sendBeacon كبديل
          const params = new URLSearchParams();
          params.append('id', String(idToDelete));
          const result = navigator.sendBeacon(
            "https://hormogenius.com/api/delete_link.php",
            params
          );
          console.log('Fallback beacon sent?', result, 'ID:', idToDelete);
        }
      }
    };

    // دالة احتياطية باستخدام sendBeacon
    const handleUnload = () => {
      const idToDelete = actualLinkId.current || linkId;

      if (shouldDelete.current && idToDelete) {
        const params = new URLSearchParams();
        params.append('id', String(idToDelete));
        const result = navigator.sendBeacon(
          "https://hormogenius.com/api/delete_link.php",
          params
        );
        console.log('Beacon sent on unload?', result, 'ID:', idToDelete);
      }
    };

    // إضافة المستمعين
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('unload', handleUnload);

    // تنظيف المستمعين وحذف الرابط عند إلغاء تحميل المكون
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('unload', handleUnload);

      // حذف الرابط عند الخروج من المكون (مثل الانتقال لصفحة أخرى)
      deleteLink();
    };
  }, [linkId]);

  if (loading) return <p></p>;
  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "3rem", fontSize: "2rem", color: "#dc3545" }}>
        {error}
      </div>
    );
  }
  if (!productData) return <p></p>;

  // إذا كان البحث بالاسم، اعرض فقط DetailsProduct بدون أي واجهة إضافية
  if (searchType === 'name') {
    return <DetailsProduct productData={productData} overrideLoading={false} />;
  }

  // إذا كان البحث بالرقم، اعرض واجهة التحقق مع DetailsProduct
  return (
    <div>
      {verified && (
        <div className="verify-check">
          Check Verified <span className="check-icon">✅</span>
        </div>
      )}
      <div style={{ textAlign: "center", marginTop: "1rem", color: "#888" }}>
        تم البحث باستخدام الرقم
      </div>
      <div style={{ marginTop: "2rem" }}>
        <DetailsProduct productData={productData} overrideLoading={false} />
      </div>
    </div>
  );
}