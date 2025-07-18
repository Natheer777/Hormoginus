import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import DetailsProduct from "../sections/Details_Product/Details_Product";
import "./VerifyProduct.css";
import { Footer, Verfiy_product } from "../sections";

const VerifyProduct = ({ id: productId }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const confLink = "https://hormogenius.com/api/get_p_by_link.php";
  const prodApi = "https://hormogenius.com/api/get_product_by_id.php";
  const deleteApi = "https://hormogenius.com/api/delete_link.php";

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState(null);
  const [deletionResponse, setDeletionResponse] = useState({});
  const [linkId, setLinkId] = useState(null);
  const linkIdRef = useRef(null);

  useEffect(() => {
    linkIdRef.current = linkId;
  }, [linkId]);

  const fetchProduct = async (url, id) => {
    console.log("القيمة المرسلة إلى API الأول:", id);
    try {
      const response = await axios.post(url, { id });
      console.log("استجابة API الأول:", response.data);

      if (
        response.data &&
        Array.isArray(response.data) &&
        response.data.length > 0 &&
        response.data[0]?.p_id &&
        response.data[0]?.link_id
      ) {
        const prodId = response.data[0].p_id;
        const linkIdFromApi = response.data[0].link_id;
        setLinkId(linkIdFromApi);
        linkIdRef.current = linkIdFromApi;

        const res = await axios.post(prodApi, { id: prodId });
        console.log("استجابة API الثاني:", res.data);

        if (
          res.data.status === "success" &&
          Array.isArray(res.data.data) &&
          res.data.data.length > 0 &&
          res.data.data[0]?.p_id
        ) {
          setProduct(res.data.data[0]);
          setIsLoading(false);
        } else {
          setError("This product has been previously verified.");
          setIsLoading(false);
        }
      } else {
        setError("This product has been previously verified.");
        setIsLoading(false);
        navigate("/*", { replace: true });
      }
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  const deleteProduct = async (url, id) => {
    if (!id) return;
    try {
      const response = await axios.post(url, { id });
      setDeletionResponse(response.data);
      console.log("تم حذف الرابط:", response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchProduct(confLink, productId);

    const handlePageLeave = async () => {
      await deleteProduct(deleteApi, linkIdRef.current);
    };

    // حذف الرابط بعد مدة (مثلاً 5 دقائق = 300000 ms) — هنا 10 ثوانٍ لأغراض التجربة
    const deletionTimer = setTimeout(() => {
      handlePageLeave();
    }, 1000);

    // عند مغادرة الصفحة (reload / close tab)
    window.addEventListener("beforeunload", handlePageLeave);

    return () => {
      clearTimeout(deletionTimer);
      handlePageLeave();
      window.removeEventListener("beforeunload", handlePageLeave);
    };
  }, [productId, confLink, deleteApi, navigate, location]);

  if (isLoading) return <p></p>;
  if (error)



    if (!product) return <p></p>;

  return (
    <div>
      <div className="verification-container">
        {/* شريط ملون متحرك */}
        <div className="verification-shimmer" />

        {/* تأثيرات بصرية إضافية */}
        <div className="verification-pulse" />

        <div className="verification-content">
          <div className="verification-title">
            Check Verified
          </div>
          <div className="verification-icon">
            ✅
          </div>
          <div className="verification-subtitle">
            This product is original
          </div>
        </div>
      </div>
      <div style={{ marginTop: "2rem" }}>
        <DetailsProduct productData={product} overrideLoading={false} suppressErrors={true} />
      </div>
      <Verfiy_product />
      <Footer />
    </div>
  );
};

export default VerifyProduct;
