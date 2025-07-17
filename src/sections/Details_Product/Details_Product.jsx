import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Details_Product.css";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// CircularProgress component for inline use
const CircularProgress = ({
  size = 32,
  color = "#007bff",
  thickness = 4,
  value, // 0-100
  showValue = false,
  className = "",
  ...props
}) => {
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = typeof value === "number"
    ? Math.min(Math.max(value, 0), 100)
    : undefined;
  const offset = progress !== undefined
    ? circumference - (progress / 100) * circumference
    : circumference * 0.25;

  // Animation: fill to value, then empty, repeat
  const animationName = progress !== undefined ? `circular-fill-${progress}` : undefined;
  const animationDuration = 2.5; // seconds

  // Inject keyframes for this value
  const styleId = `circular-progress-style-${progress}`;
  if (progress !== undefined && !document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.innerHTML = `
      @keyframes ${animationName} {
        0% { stroke-dashoffset: ${circumference}; }
        45% { stroke-dashoffset: ${offset}; }
        55% { stroke-dashoffset: ${offset}; }
        100% { stroke-dashoffset: ${circumference}; }
      }
    `;
    document.head.appendChild(style);
  }

  return (
    <div
      className={`circular-progress-wrapper ${className}`}
      style={{ position: "relative", display: "inline-block", width: size, height: size }}
      {...props}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ display: "block" }}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e6e6e6"
          strokeWidth={thickness}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={thickness}
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          strokeLinecap="round"
          style={
            progress !== undefined
              ? {
                animation: `${animationName} ${animationDuration}s cubic-bezier(0.4,0,0.2,1) infinite`,
              }
              : {
                transformOrigin: "center",
                animation: "circular-rotate 1s linear infinite",
              }
          }
        />
      </svg>
      {showValue && progress !== undefined && (
        <span
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: size,
            height: size,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: size * 0.3,
            fontWeight: "bold",
            color: color,
            userSelect: "none",
          }}
        >
          {progress}%
        </span>
      )}
      <style>
        {`
          @keyframes circular-rotate {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
          }
        `}
      </style>
    </div>
  );
};
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
function capitalizeFirstLetter(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// دالة JSX مخصصة لعرض اسم المنتج بشكل مقسم وملون (نفس منطق Products_home)
const renderSpecialLCarnitineName = () => (
  <div style={{ lineHeight: 1.1 }}>
    <div style={{  letterSpacing: '1px' }}>
      L-Carnitine
    </div>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
      <span style={{  }}>+ Yohimbine</span>
    </div>
    <div style={{  marginTop: 2 }}>+ CLEN</div>
  </div>
);

export default function Details_product({ productData: productDataProp, overrideLoading, productId, productName, suppressErrors = false }) {
  const params = useParams();
  // تتبع القيم المستلمة
  console.log("Details_Product.jsx - productName prop:", productName, "useParams:", params);
  const [productData, setProductData] = useState(productDataProp || null);
  const [loading, setLoading] = useState(productDataProp ? false : true);
  const [error, setError] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    if (productDataProp) return;
    const fetchProduct = async () => {
      try {
        let res;
        if (productId) {
          res = await axios.post(
            "https://hormogenius.com/api/get_product_by_id.php",
            {
              id: productId,
            }
          );
        } else {
          res = await axios.post(
            "https://hormogenius.com/api/get_product_by_name.php",
            {
              name: productName,
            }
          );
        }
        if (res.data.status === "success") {
          setProductData(res.data.data[0]);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        setError("Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productName, productId, productDataProp]);

  // تتبع بيانات المنتج بعد الجلب
  useEffect(() => {
    console.log("Details_Product.jsx - productData:", productData);
  }, [productData]);

  if (overrideLoading === false ? false : loading) return <p></p>;
  if (error && !suppressErrors) return (
    <div className="details-error-container">
      <p className="details-error-message">{error}</p>
      <p className="details-error-subtitle">
        This product has been previously verified. <br />
        (This QR code has been scanned before.)
      </p>
    </div>
  );
  if (!productData) return <p></p>;

  // إخفاء منتج Carntin+Yohimbine
  if (productData.pname === 'Carntin+Yohimbine') {
    return (
      <div className="details-error-container">
        <p className="details-error-message">This product not found</p>
      </div>
    );
  }

  const {
    pname,
    description,
    price,
    qr_code,
    warnings,
    strength,
    vial,
    caliber,
    side_effects,
    how_to_use,
    muscle_gain,
    science_name,
    keep_gains,
    fat_water,
    vid_url,
    img_url,
  } = productData;

  const productColor = productColors[pname] || "#ffffff";
  const descriptionLines = description
    ?.split(/\r?\n/)
    .filter((line) => line.trim() !== "");
  const shortDescription = descriptionLines?.slice(0, 2);
  // const fullDescription = descriptionLines;


  const formatTextWithNumbers = (text, useProductColor = false) => {
    if (!text) return "";


    const parts = text.split(/(\d+)/);
    return parts.map((part, index) => {
      if (/^\d+$/.test(part)) {

        return (
          <span
            key={index}
            className="number-value"
            style={useProductColor ? { color: productColor } : {}}
          >
            {part}
          </span>
        );
      } else {

        return <span key={index} className="text-content">{part}</span>;
      }
    });
  };


  return (
    <>
      {/* <div
        className="BackgroundImage"
        style={{
          backgroundImage: `url(${img_url})`,
        }}
      ></div> */}

      <div className="swiper_product mb-5 container">
        <div className="Swiper_Conent">
          <div className="container">
            <div className="row">
              <div className="Swiper left col-xl-6 col-lg-6 ">
                {img_url ? (
                  <img
                    src={img_url}
                    alt="product"
                    className="img-fluid "
                    style={{ borderRadius: "20px", maxWidth: "100%" }}
                  />
                ) : (
                  <p></p>
                )}
              </div>

              <div className="col-xl-6 col-lg-6 ">
                <div className="detailsMainProduct">
                  <div>
                    <h1
                      className="product_name text-xl font-bold  left"
                      style={{ color: productColor }}
                    >
                      {/* تخصيص عرض اسم المنتج إذا كان هو المطلوب */}
                      {(pname && pname.replace(/-/g, '').replace(/\s+/g, '').toLowerCase() === 'lcarnitine+yohimbine+clen200mg')
                        ? renderSpecialLCarnitineName()
                        : (() => {
                          const name = pname.replace(/-/g, " ");
                          const match = name.match(/^[^\d]*/);
                          return match ? match[0].trim().toUpperCase() : name.toUpperCase();
                        })()
                      }
                    </h1>
                    <p className="sec_name">{capitalizeFirstLetter(science_name.replace(/[()]/g, ""))}</p>
                    <span className="price left"><span>Price: </span>{price}$</span>
                  </div>
                  <div>
                    <span className="vial right"><span>Vial: </span> {vial}</span>
                    <p className="caliber right">{formatTextWithNumbers(caliber, true)}</p>
                  </div>
                </div>
                <div className="details_product pb-5">
                  {descriptionLines?.length > 0 && (
                    <div className="product-description">
                      <div
                        style={{ whiteSpace: "pre-wrap" }}
                        className="NunitoSemiBold"
                      >
                        <span className="how_use top">Description :</span>{" "}
                        {showFullDescription
                          ? descriptionLines.map((line, idx) => {
                            if (line.trim() === "") {
                              return <br key={idx} />;
                            }
                            const match = line.match(/^([^:]+):\s*(.*)$/);
                            if (match) {
                              return (
                                <div key={idx}>
                                  <span className="desc-label">{match[1].trim()}:</span>
                                  <span> {match[2]}</span>
                                </div>
                              );
                            } else {
                              return <div key={idx}>{line}</div>;
                            }
                          })
                          : shortDescription.map((line, idx) => {
                            const match = line.match(/^([^:]+):\s*(.*)$/);
                            if (match) {
                              return (
                                <div key={idx}>
                                  <span className="desc-label">{match[1].trim()}:</span>
                                  <span> {match[2]}</span>
                                </div>
                              );
                            } else {
                              return <div key={idx}>{line}</div>;
                            }
                          })}
                      </div>

                      {descriptionLines.length > 6 && (
                        <button
                          onClick={() =>
                            setShowFullDescription((prev) => !prev)
                          }
                          className="btn btn-link p-0 mt-2"
                          style={{
                            fontSize: "18px",
                            color: "#FFFFFF",
                            cursor: "pointer",
                          }}
                        >
                          {showFullDescription ? "Show Less" : "Show More"}
                        </button>
                      )}
                    </div>
                  )}
                  <div className="NunitoSemiBold">
                    <span className="how_to_use">Dosage: </span>
                    {how_to_use}
                  </div>
                  <div className="Warning hidden">
                    <span>Warnings: </span>
                    {warnings}
                  </div>

                  <div className="product-details-extra mt-3">
                    <ul className="list-unstyled product-attributes-list">
                      {strength && (
                        <li className="product-attribute-item">
                          <strong>Strength:</strong>
                          <CircularProgress value={parseInt(strength, 10)} showValue size={48} color="#007bff" />
                        </li>
                      )}
                      {side_effects && (
                        <li className="product-attribute-item">
                          <strong>Side Effects:</strong>
                          <CircularProgress value={parseInt(side_effects, 10)} showValue size={48} color="#dc3545" />
                        </li>
                      )}
                      {muscle_gain && (
                        <li className="product-attribute-item">
                          <strong>Muscle Gain:</strong>
                          <CircularProgress value={parseInt(muscle_gain, 10)} showValue size={48} color="#28a745" />
                        </li>
                      )}
                      {keep_gains && (
                        <li className="product-attribute-item">
                          <strong>Keep Gains:</strong>
                          <CircularProgress value={parseInt(keep_gains, 10)} showValue size={48} color="#ffc107" />
                        </li>
                      )}
                      {fat_water && (
                        <li className="product-attribute-item">
                          <strong>Fat/Water:</strong>
                          <CircularProgress value={parseInt(fat_water, 10)} showValue size={48} color="#17a2b8" />
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="product-video mt-5 mb-5">
        <div className="container">
          <div className="row">
            <div className="col d-flex justify-content-center align-items-center">
              {vid_url ? (
                <video
                  src={vid_url}
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{
                    maxWidth: "20rem",
                    maxHeight: "380px",
                    borderRadius: "10px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                  }}
                ></video>
              ) : (
                <p></p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
