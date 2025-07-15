import React, { useEffect, useState, useRef } from "react";
import {
    Footer,
    Verfiy_product,
    Details_Product,
    Navbar,
} from "../sections";
import { Background } from "../../components/index";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ProductById() {
    const { id } = useParams(); // الرقم من الرابط
    const [productData, setProductData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [verified, setVerified] = useState(false);
    const actualLinkId = useRef(null); // الرقم الحقيقي من قاعدة البيانات

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            setError(null);
            setProductData(null);
            setVerified(false);
            console.log("[ProductById] id from URL:", id);
            try {
                // الخطوة 1: أرسل id إلى get_p_by_link.php
                const res1 = await axios.post(
                    "https://hormogenius.com/api/get_p_by_link.php",
                    { id }
                );
                console.log("[ProductById] Response from get_p_by_link.php:", res1.data);
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
                    linkIdFromDb = res1.data.data[0].link_id || res1.data.data[0].id;
                }
                console.log("[ProductById] productIdFromLink:", productIdFromLink, "linkIdFromDb:", linkIdFromDb);
                if (productIdFromLink) {
                    if (linkIdFromDb) {
                        actualLinkId.current = linkIdFromDb;
                    }
                    // الخطوة 2: أرسل productId إلى get_product_by_id.php
                    const res2 = await axios.post(
                        "https://hormogenius.com/api/get_product_by_id.php",
                        { id: productIdFromLink }
                    );
                    console.log("[ProductById] Response from get_product_by_id.php:", res2.data);
                    if (
                        res2.data.status === "success" &&
                        res2.data.data &&
                        res2.data.data[0]
                    ) {
                        setProductData(res2.data.data[0]);
                        setVerified(true);
                    } else {
                        setError("notfound");
                        console.log("[ProductById] Product not found in get_product_by_id.php");
                    }
                } else {
                    setError("notfound");
                    console.log("[ProductById] No productIdFromLink found");
                }
            } catch (err) {
                setError("notfound");
                console.log("[ProductById] Error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    // حذف الرابط عند الخروج من الصفحة أو الموقع
    useEffect(() => {
        const deleteLink = async () => {
            const idToDelete = actualLinkId.current || id;
            if (idToDelete) {
                try {
                    await axios.post("https://hormogenius.com/api/delete_link.php", {
                        id: idToDelete
                    });
                    console.log("[ProductById] Link deleted successfully, ID:", idToDelete);
                } catch (error) {
                    console.log("[ProductById] Error deleting link:", error);
                }
            }
        };
        const handleBeforeUnload = async () => {
            const idToDelete = actualLinkId.current || id;
            if (idToDelete) {
                try {
                    await fetch("https://hormogenius.com/api/delete_link.php", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ id: idToDelete }),
                        keepalive: true,
                    });
                    console.log("[ProductById] Link deleted via fetch on beforeunload, ID:", idToDelete);
                } catch (error) {
                    const params = new URLSearchParams();
                    params.append('id', String(idToDelete));
                    const result = navigator.sendBeacon(
                        "https://hormogenius.com/api/delete_link.php",
                        params
                    );
                    console.log("[ProductById] Fallback beacon sent?", result, "ID:", idToDelete);
                }
            }
        };
        const handleUnload = () => {
            const idToDelete = actualLinkId.current || id;
            if (idToDelete) {
                const params = new URLSearchParams();
                params.append('id', String(idToDelete));
                const result = navigator.sendBeacon(
                    "https://hormogenius.com/api/delete_link.php",
                    params
                );
                console.log("[ProductById] Beacon sent on unload?", result, "ID:", idToDelete);
            }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        window.addEventListener('unload', handleUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            window.removeEventListener('unload', handleUnload);
            deleteLink();
        };
    }, [id]);

    if (loading) return <p></p>;
    if (error === "notfound") {
        return (
            <div style={{ textAlign: "center", marginTop: "3rem", fontSize: "2rem", color: "#dc3545" }}>
                Page Not Found
            </div>
        );
    }
    if (!productData) return <p></p>;

    return (
        <>
            <Navbar />
            {verified && (
                <div style={{ textAlign: "center", marginTop: "2rem", fontSize: "2rem", color: "green" }}>
                    Verify Check <span role="img" aria-label="check">✅</span>
                </div>
            )}
            <Details_Product productData={productData} overrideLoading={false} />
            <Background />
            <Verfiy_product />
            <Footer />
        </>
    );
} 