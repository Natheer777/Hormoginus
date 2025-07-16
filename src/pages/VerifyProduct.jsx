import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import DetailsProduct from "../sections/Details_Product/Details_Product";
import axios from "axios";

export default function VerifyProduct() {
  const { id } = useParams();
  const [linkId, setLinkId] = useState(null);
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [verified, setVerified] = useState(false);
  const shouldDelete = useRef(false);
  const linkIdRef = useRef(null);

  // تحديث linkId في ref دائمًا
  useEffect(() => {
    linkIdRef.current = linkId;
  }, [linkId]);

  useEffect(() => {
    const verifyAndFetch = async () => {
      setLoading(true);
      setError(null);
      setProductData(null);
      setVerified(false);
      try {
        console.log('STEP 1: Sending to get_p_by_link.php with id:', id);
        const res1 = await axios.post(
          "https://hormogenius.com/api/get_p_by_link.php",
          { id }
        );
        console.log('STEP 1 RESPONSE:', res1.data);
        if (
          Array.isArray(res1.data) &&
          res1.data.length > 0 &&
          res1.data[0]?.link_id &&
          res1.data[0]?.p_id
        ) {
          const linkIdFromApi = res1.data[0].link_id;
          const prodId = res1.data[0].p_id;
          setLinkId(linkIdFromApi);
          console.log('STEP 2: Sending to get_product_by_id.php with p_id:', prodId);
          const res2 = await axios.post(
            "https://hormogenius.com/api/get_product_by_id.php",
            { id: prodId }
          );
          console.log('STEP 2 RESPONSE:', res2.data);
          if (res2.data.status === "success" && res2.data.data && res2.data.data[0]) {
            setProductData(res2.data.data[0]);
            setVerified(true);
            shouldDelete.current = true;
            console.log('STEP 3: Product found and verified.');
          } else {
            setError("Product not found");
            console.log('STEP 3: Product not found in get_product_by_id.php');
          }
        } else {
          setError("Product not found");
          console.log('STEP 1: Product not found in get_p_by_link.php or missing keys.');
        }
      } catch (err) {
        setError("Product not found");
        console.log('ERROR:', err);
      } finally {
        setLoading(false);
      }
    };
    verifyAndFetch();
  }, [id]);

  // سجل event listener مرة واحدة فقط
  useEffect(() => {
    const handleUnload = (event) => {
      console.log('handleUnload called, linkId:', linkIdRef.current, 'shouldDelete:', shouldDelete.current);
      if (shouldDelete.current && linkIdRef.current) {
        console.log('Preparing to send delete request with id =', linkIdRef.current);
        if (navigator.sendBeacon) {
          const formData = new FormData();
          formData.append('id', linkIdRef.current);
          const beaconResult = navigator.sendBeacon("https://hormogenius.com/api/delete_link.php", formData);
          console.log('sendBeacon sent? ', beaconResult, 'id:', linkIdRef.current);
        } else {
          fetch("https://hormogenius.com/api/delete_link.php", {
            method: "POST",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `id=${encodeURIComponent(linkIdRef.current)}`,
            keepalive: true
          }).then(res => {
            console.log('Fallback fetch sent for id:', linkIdRef.current, 'status:', res.status);
          }).catch(err => {
            console.warn('Fetch error:', err);
          });
        }
      } else {
        console.warn('Delete request not sent: shouldDelete or linkId not set.', 'shouldDelete:', shouldDelete.current, 'linkId:', linkIdRef.current);
      }
    };
    window.addEventListener('beforeunload', handleUnload);
    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, []);

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
      <div style={{ marginTop: '2rem' }}>
        <DetailsProduct productData={productData} overrideLoading={false} />
      </div>
    </div>
  );
}