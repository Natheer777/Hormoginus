import axios from "axios";
import "./Products_home.css";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// دالة لتكبير أول حرف من النص
function capitalizeFirstLetter(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// كائن ألوان المنتجات المنسوخ من Details_Product.jsx
const productColors = {
  DECA250mg: "#3bb9eb",
  NPP100mg: "#3bb9eb",
  "\tprimo100mg": "#3bb9eb",
  Sustalon250mg: "#3bb9eb",
  "Carntin+Yohimbine": "#008081",
  MASTE100mg: "#008081",
  MASTERON200mg: "#008081",
  "TEST-C200": "#25356e",
  "TEST-E250": "#25356e",
  "TEST-P100": "#25356e",
  "TREN-A100": "#6564aa",
  "TREN-E200": "#6564aa",
  Bolde250mg: "#6564aa",
};

function getProductColor(product) {
  if (!product || !product.pname) return "var(--color-blue)";
  const normalized = product.pname.replace(/\s|\t/g, "").toLowerCase();
  for (const key in productColors) {
    const normalizedKey = key.replace(/\s|\t/g, "").toLowerCase();
    if (normalized === normalizedKey) {
      return productColors[key];
    }
  }
  const name = product.pname.toLowerCase();
  if (name.includes("tablet")) return "var(--color-blue)";
  if (name.includes("inject")) return "var(--color-blue2)";
  return "var(--color-blue)";
}

export default function Products_home() {
  const [tablets, setTablets] = useState([]);
  const [injections, setInjections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProductsBySection("TABLETS", setTablets);
    fetchProductsBySection("INJECTIONS", setInjections);
  }, []);

  const fetchProductsBySection = async (sectionValue, setState) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "https://hormogenius.com/api/get_products_by_section.php",
        { name: sectionValue },
        { headers: { "Content-Type": "application/json" } }
      );
      const productData = response.data.data || response.data;
      setState(productData);
    } catch (err) {
      setError(`Failed to load ${sectionValue} products`);
    } finally {
      setLoading(false);
    }
  };

  const formatTextWithNumbers = (text, color) => {
    if (!text) return "";
    const parts = text.split(/(\d+)/);
    return parts.map((part, index) => {
      if (/^\d+$/.test(part)) {
        return (
          <span
            key={index}
            className="number-value"
            style={color ? { color } : {}}
          >
            {part}
          </span>
        );
      } else {
        return (
          <span key={index} className="text-content">
            {part}
          </span>
        );
      }
    });
  };

  const renderProductCard = (product, index) => {
    const color = getProductColor(product);
    return (
      <div key={product.p_id || index} className="product-card back top">
        <div className="product-image">
          {product.vid_url ? (
            <video
              src={product.vid_url}
              autoPlay
              loop
              muted
              playsInline
              style={{
                maxWidth: "30rem",
                maxHeight: "500px",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
              }}
            />
          ) : (
            <div className="no-image">No Image</div>
          )}
        </div>

        <div className="detailsMainProduct">
          <div>
            <h1
              className="product_name text-xl font-bold left"
              style={{ color }}
            >
              {(() => {
                const name = (product.pname || "").replace(/-/g, " ");
                const match = name.match(/^[^\d]*/);
                return match
                  ? match[0].trim().toUpperCase()
                  : name.toUpperCase();
              })()}
            </h1>
            <p className="sec_name">
              {product.science_name
                ? capitalizeFirstLetter(
                    product.science_name.replace(/[()]/g, "")
                  )
                : ""}
            </p>
          </div>
          <div>
            <span className="vial right">
              <span>Vial: </span>{" "}
              {product.vial
                ? product.vial.replace(/tablets?/gi, "").trim()
                : ""}
            </span>
            <p className="caliber right">
              {formatTextWithNumbers(product.caliber, color)}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="Products_home container">
      {error && (
        <div className="error">
          <p>{error}</p>
        </div>
      )}
      {loading && <div>Loading...</div>}

      {!loading && !error && (
        <>
          {/* TABLETS */}
          <h2 style={{ textAlign: "center", marginTop: "2rem" }}>TABLETS</h2>
          {tablets.length > 0 ? (
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              spaceBetween={20}
              breakpoints={{
                320: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="products-swiper"
            >
              {tablets.map((product, index) => (
                <SwiperSlide key={index}>
                  {renderProductCard(product, index)}
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="no-products">
              <p>No TABLETS products found.</p>
            </div>
          )}

          {/* INJECTIONS */}
          <h2
            style={{ textAlign: "center", marginTop: "3rem"}}
          >
            INJECTIONS
          </h2>
          {injections.length > 0 ? (
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              spaceBetween={20}
              breakpoints={{
                320: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="products-swiper"
            >
              {injections.map((product, index) => (
                <SwiperSlide key={index}>
                  {renderProductCard(product, index)}
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="no-products">
              <p>No INJECTIONS products found.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
