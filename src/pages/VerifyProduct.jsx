import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import DetailsProduct from "../sections/Details_Product/Details_Product";
import axios from "axios";

export default function VerifyProduct() {
  const { id } = useParams();
  console.log('Component loaded, id:', id); // تشخيص
  const [productId, setProductId] = useState(null);
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [verified, setVerified] = useState(false);
  const shouldDelete = useRef(false);

  useEffect(() => {
    console.log('useEffect running, id:', id); // تشخيص
    const verifyAndFetch = async () => {
      setLoading(true);
      setError(null);
      setProductData(null);
      setVerified(false);
      try {
        // 1. جلب رقم المنتج المرتبط بالرابط
        console.log('Sending request to get_p_by_link.php with id:', id);
        const res1 = await axios.post(
          "https://hormogenius.com/api/get_p_by_link.php",
          { id }
        );
        console.log('Raw response from get_p_by_link.php:', res1.data);
        let productIdFromLink = null;
        if (typeof res1.data === 'string' && !isNaN(res1.data)) {
          // إذا كانت الاستجابة مجرد رقم كنص
          productIdFromLink = parseInt(res1.data, 10);
        } else if (res1.data && res1.data.status === 'success' && res1.data.data && res1.data.data[0]?.product_id) {
          // إذا كانت الاستجابة JSON
          productIdFromLink = res1.data.data[0].product_id;
        }
        if (productIdFromLink) {
          setProductId(productIdFromLink);
          // 2. جلب بيانات المنتج
          console.log('Sending request to get_product_by_id.php with id:', productIdFromLink);
          const res2 = await axios.post(
            "https://hormogenius.com/api/get_product_by_id.php",
            { id: productIdFromLink }
          );
          console.log('Response from get_product_by_id.php:', res2.data);
          if (res2.data.status === "success" && res2.data.data && res2.data.data[0]) {
            setProductData(res2.data.data[0]);
            setVerified(true);
            shouldDelete.current = true;
          } else {
            setError("Product not found");
          }
        } else {
          setError("Product not found");
        }
      } catch (err) {
        console.log('Error in verifyAndFetch:', err);
        setError("Product not found");
      } finally {
        setLoading(false);
      }
    };
    verifyAndFetch();
  }, [id]);

  useEffect(() => {
    // حذف الرابط عند الخروج من الصفحة فقط إذا تم التحقق بنجاح
    const handleUnload = (event) => {
      console.log('handleUnload called, id:', id, 'shouldDelete:', shouldDelete.current);
      if (shouldDelete.current && id && !isNaN(Number(id))) {
        const idStr = String(id);
        // طباعة تفاصيل الريكويست
        console.log('--- تفاصيل ريكويست الحذف ---');
        console.log('API:', 'https://hormogenius.com/api/delete_link.php');
        console.log('Method:', 'POST');
        console.log('Data:', { id: idStr });
        // إرسال بـ sendBeacon
        const formData = new FormData();
        formData.append('id', idStr);
        const beaconResult = navigator.sendBeacon("https://hormogenius.com/api/delete_link.php", formData);
        console.log('Beacon sent?', beaconResult, 'id:', idStr);
        // إرسال احتياطي بـ fetch
        fetch("https://hormogenius.com/api/delete_link.php", {
          method: "POST",
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `id=${encodeURIComponent(idStr)}`,
          keepalive: true
        }).then(res => {
          console.log('Fallback fetch sent for id:', idStr, 'status:', res.status);
        }).catch(err => {
          console.warn('Fetch error:', err);
        });
      } else {
        console.warn('لم يتم إرسال طلب حذف: id غير صالح', id);
      }
    };
    window.addEventListener('beforeunload', handleUnload);
    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, [id]);

  if (loading) return <p></p>;
  if (error) return <div style={{ textAlign: 'center', marginTop: '3rem', fontSize: '2rem', color: '#dc3545' }}>{error}</div>;
  if (!productData) return <p></p>;

  return (
    <div>
      {verified && (
        <div style={{
          background: '#28a745',
          color: '#fff',
          padding: '1rem',
          borderRadius: '10px',
          textAlign: 'center',
          fontSize: '2rem',
          margin: '2rem auto',
          maxWidth: '500px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
        }}>
          Check Verified <span style={{ fontSize: '2.5rem', verticalAlign: 'middle' }}>✅</span>
        </div>
      )}
      {/* إعادة استخدام تصميم Details_Product */}
      <div style={{ marginTop: '2rem' }}>
        <DetailsProduct productData={productData} overrideLoading={false} />
      </div>
    </div>
  );
}