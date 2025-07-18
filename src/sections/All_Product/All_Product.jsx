import "./All_Product.css";
import { useState, useEffect } from "react";
import axios from "axios";
import GradientText from "../../components/GradientText/GradientText";

// نسخ productColors من Products_home
const productColors = {
  "DECA250mg": "#3bb9eb",
  "NPP100mg": "#3bb9eb",
  "primo100mg": "#3bb9eb",
  "Sustalon250mg": "#3bb9eb",
  "L-carnitine+Yohimbine+Clen200mg": "#008081",
  "MASTE100mg": "#008081",
  "MASTERON200mg": "#008081",
  "TEST-C200": "#25356e",
  "TEST-E250": "#25356e",
  "TEST-P100": "#25356e",
  "TREN-A100mg": "#6564aa",
  "TREN-E200mg": "#6564aa",
  "Bolde250mg": "#6564aa",
  "ANAVAR-10mg": "#6564aa",
  "CLENBUT-40mg": "#008081",
  "DIANABOL-10mg": "#3bb9eb",
  "OXYTHOL-50mg": "#25356e",
  "WINSTROL-10mg": "#6564aa"
};

// دالة JSX مخصصة لعرض اسم المنتج بشكل مقسم وملون
const renderSpecialLCarnitineName = () => (
  <div className="carntine" style={{ lineHeight: 1.1 }}>
    <div >
      L-Carnitine
    </div>
    <div >
      + Yohimbine
    </div>
    <div >+ CLEN </div>
  </div>
);

// روابط API حسب الفئة
const API_ENDPOINT = "https://hormogenius.com/api/get_full_info.php";

export default function All_Product() {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState("ALL"); // الفئة المختارة
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(API_ENDPOINT)
      .then((res) => setData(res.data.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // فلترة المنتجات حسب الفئة
  const filteredData = category === "ALL"
    ? data
    : data.filter((item) => item.sec_name && item.sec_name.toLowerCase() === category.toLowerCase());

  return (
    <div className="container All_Products">
      <GradientText className="products-title mt-4 mb-4" showBorder colors={["#ffffff", "#e74c3c", "#ffffff", "#e74c3c", "#ffffff"]}>OUR PRODUCTS</GradientText>
      {/* أزرار الفئات */}
      <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 24 }}>
        <button
          className={`category-tabs-btn${category === "ALL" ? " active-tab" : ""}`}
          onClick={() => setCategory("ALL")}
        >
          ALL
        </button>
        <button
          className={`category-tabs-btn${category === "injections" ? " active-tab" : ""}`}
          onClick={() => setCategory("injections")}
        >
          INJECTIONS
        </button>
        <button
          className={`category-tabs-btn${category === "tablets" ? " active-tab" : ""}`}
          onClick={() => setCategory("tablets")}
        >
          Tablets
        </button>
      </div>
      <div className="All_Product">
        {loading ? (
          <div style={{ textAlign: "center", width: "100%" }}>Loading...</div>
        ) : (
          filteredData && filteredData.length > 0 ? (
            filteredData
              .filter((item) => item.pname !== "Carntin+Yohimbine")
              .map((item) => (
                <div key={item.id} className="All_Product_items hidden">
                  <div className="product-card p-4 shadow-sm ">
                    <img loading="lazy" src={item.img_url} alt="" />
                    {item.pname === "L-carnitine+Yohimbine+Clen200mg" ? (
                      <div style={{ color: productColors[item.pname] || undefined }}>
                        {renderSpecialLCarnitineName()}
                      </div>
                    ) : (
                      <h2 style={{ color: productColors[item.pname] || undefined }}>
                        {(item.sec_name && item.sec_name.toLowerCase() === "tablets")
                          ? item.pname.replace(/\d.*/, "").replace(/-$/, "")
                          : item.pname.replace(/\d.*/, "")}
                      </h2>
                    )}
                    <p className="price mb-4">
                      <strong>Price:</strong> {item.price}$
                    </p>
                    <a
                      className="Link_Product"
                      href={`${item.qr_code}?from=internal`}
                      target="_blank"
                    >
                      read more
                    </a>
                  </div>
                </div>
              ))
          ) : (
            <div style={{ textAlign: "center", width: "100%" }}>No products found.</div>
          )
        )}
      </div>
    </div>
  );
}
