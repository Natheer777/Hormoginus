import axios from "axios";
import "./Products_home.css";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

function capitalizeFirstLetter(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

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

  // "Carntin+Yohimbine": "#008081",
  "ANAVAR-10mg": "#6564aa",
  "CLENBUT-40mg": "#008081",
  "DIANABOL-10mg": "#3bb9eb",
  "OXYTHOL-50mg": "#25356e",
  "WINSTROL-10mg": "#6564aa"
};

// دالة JSX مخصصة لعرض اسم المنتج بشكل مقسم وملون
const renderSpecialLCarnitineName = () => (
  <div style={{ lineHeight: 1.1 }}>
    <div style={{ fontSize: '1.5rem', letterSpacing: '1px' }}>
      L-Carnitine
    </div>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
      <span style={{ fontSize: '1.2rem', }}>+ Yohimbine</span>
    </div>
    <div style={{ fontSize: '1.2rem', marginTop: 2 }}>+ CLEN</div>
  </div>
);


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

  const renderProductCard = (product, index, sectionType) => {
    return (
      <div key={product.p_id || index} className="product-card back top">
        <div className="product-image">
          {product.img_url ? (
            <div>
              <img
                src={product.img_url}
                alt={product.pname || 'product'}
                style={{
                  borderRadius: "10px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                }}
                loading="lazy"
                onError={e => { e.target.style.display = 'none'; }}
              />
            </div>
          ) : (
            <div></div>
          )}
        </div>

        <div className="detailsMainProduct">
          <div>
            <h1
              className={
                `product_name text-xl font-bold left${(product.pname && (product.pname.trim().toUpperCase().replace(/^L\s+/, '') === 'CARNITINE+YOHIMBINE+CLEN'))
                  ? ' small-font' : ''
                }`
              }
              style={{ color: productColors[product.pname] || undefined }}
            >
              {/* تخصيص عرض اسم المنتج إذا كان هو المطلوب */}
              {(product.pname && product.pname.replace(/-/g, '').replace(/\s+/g, '').toLowerCase() === 'lcarnitine+yohimbine+clen200mg')
                ? renderSpecialLCarnitineName()
                : (() => {
                  let name = product.pname || '';
                  // Only remove '-' for tablets products
                  if (product.sec_name && product.sec_name.toLowerCase() === 'tablets') {
                    name = name.replace(/-/g, ' ');
                  }
                  // Always remove leading 'L ' if the rest matches target
                  if (name.trim().toUpperCase().replace(/^L\s+/, '') === 'CARNITINE+YOHIMBINE+CLEN') {
                    name = name.replace(/^L\s+/i, '');
                  }
                  const match = name.match(/^[^\d]*/);
                  return match
                    ? match[0].trim().toUpperCase()
                    : name.toUpperCase();
                })()
              }
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
              <span>{sectionType === 'INJECTIONS' ? 'Vial:' : 'Tablets:'} </span>{" "}
              {product.vial
                ? product.vial.replace(/tablets?/gi, "").trim()
                : ""}
            </span>
            <p className="caliber right" style={{ color: productColors[product.pname] || undefined }}>
              {formatTextWithNumbers(
                product.caliber,
                sectionType === 'TABLETS' ? (productColors[product.pname] || undefined) : (productColors[product.pname] || undefined)
              )}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="Products_home">
      {error && (
        <div className="error">
          <p>{error}</p>
        </div>
      )}
      {loading && <div>Loading...</div>}

      {!loading && !error && (
        <>



          <div className="INJECTIONS">

            <div className="center-section-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ flex: 1, textAlign: 'center' }}>
                <h2 className="center-float-title mb-4">INJECTIONS</h2>
              </div>
            </div>
            {(injections.filter(product => product.pname !== 'Carntin+Yohimbine')).length > 0 ? (
              <>
                <div style={{ position: 'relative' }}>
                  <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    lazy='true'
                    autoplay={{
                      delay: 5000,
                      disableOnInteraction: false,
                    }}
                    navigation
                    spaceBetween={20}
                    breakpoints={{
                      320: { slidesPerView: 1 },
                      640: { slidesPerView: 2 },
                      1024: { slidesPerView: 3 },
                    }}
                    className="products-swiper"
                  >
                    {injections.filter(product => product.pname !== 'Carntin+Yohimbine').map((product, index) => (
                      <SwiperSlide key={index}>
                        {renderProductCard(product, index, 'INJECTIONS')}
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  {injections.filter(product => product.pname !== 'Carntin+Yohimbine').length > 0 && (
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                      <Link to='/Products' className="seeAll">SEE ALL</Link>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="no-products">
                <p>No INJECTIONS products found.</p>
              </div>
            )}
          </div>


          <div className="TABLETS">

            <div className="center-section-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ flex: 1, textAlign: 'center' }}>
                <h2 className="center-float-title mb-4">TABLETS</h2>
              </div>
            </div>
            {tablets.filter(product => product.pname !== 'Carntin+Yohimbine').length > 0 ? (
              <>
                <div style={{ position: 'relative' }}>
                  <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    lazy='true'
                    autoplay={{
                      delay: 5000,
                      disableOnInteraction: false,
                    }}
                    navigation
                    spaceBetween={20}
                    breakpoints={{
                      320: { slidesPerView: 1 },
                      640: { slidesPerView: 2 },
                      1024: { slidesPerView: 3 },
                    }}
                    className="products-swiper"
                  >
                    {tablets.filter(product => product.pname !== 'Carntin+Yohimbine').map((product, idx) => (
                      <SwiperSlide key={idx}>
                        {renderProductCard(product, idx, 'TABLETS')}
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  {tablets.filter(product => product.pname !== 'Carntin+Yohimbine').length > 0 && (
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                      <Link to='/Products' className="seeAll">SEE ALL</Link>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="no-products">
                <p>No TABLETS products found.</p>
              </div>
            )}
          </div>
        </>
      )}
      <div className="product-features mb-4">
        <div className="feature-item ">
          <div className="feature-icon">🔬</div>
          <h4>Advanced Technology</h4>
          <p>Cutting-edge pharmaceutical technology</p>
        </div>
        <div className="feature-item ">
          <div className="feature-icon">🛡️</div>
          <h4>Quality Standards</h4>
          <p>Strict quality control and safety measures</p>
        </div>
        <div className="feature-item ">
          <div className="feature-icon">🌍</div>
          <h4>Global Trust</h4>
          <p>Trusted by clients worldwide</p>
        </div>
        <div className="feature-item ">
          <div className="feature-icon">⚡</div>
          <h4>Performance Support</h4>
          <p>Designed for optimal results</p>
        </div>
      </div>
    </div>
  );
}
