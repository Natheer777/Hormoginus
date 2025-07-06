import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Details_Product.css";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const productColors = {
  DECA250mg: "#3bb9eb",
  NPP100mg: "#3bb9eb",
  "	primo100mg": "#3bb9eb",
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

function capitalizeFirstLetter(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function Details_product() {
  const { productName } = useParams();
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.post(
          "https://hormogenius.com/api/get_product_by_name.php",
          {
            name: productName,
          }
        );
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
  }, [productName]);

  if (loading) return <p></p>;
  if (error) return <p>{error}</p>;
  if (!productData) return <p></p>;

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
    sec_name,
    keep_gains,
    fat_water,
    vid_url,
    img_url,
  } = productData;

  const productColor = productColors[pname] || "#ffffff";
  const descriptionLines = description
    ?.split("\r\n")
    .filter((line) => line.trim() !== "");
  const shortDescription = descriptionLines?.slice(0, 2);
  const fullDescription = descriptionLines;


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
                      {(() => {
                        const name = pname.replace(/-/g, " ");
                        const match = name.match(/^[^\d]*/);
                        return match ? match[0].trim() : name;
                      })()}
                    </h1>
                    <p className="sec_name">{capitalizeFirstLetter(sec_name)}</p>
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
                              const match = line.match(/^(.*?):(.*)$/);
                              if (match) {
                                return (
                                  <div key={idx}>
                                    <span className="desc-label">{match[1]}:</span>
                                    <span> {match[2]}</span>
                                  </div>
                                );
                              } else {
                                return <div key={idx}>{line}</div>;
                              }
                            })
                          : shortDescription.map((line, idx) => {
                              const match = line.match(/^(.*?):(.*)$/);
                              if (match) {
                                return (
                                  <div key={idx}>
                                    <span className="desc-label">{match}:</span>
                                  
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
                    <ul className="list-unstyled">
                      {strength && (
                        <li>
                          <strong>Strength:</strong> {strength}
                        </li>
                      )}
                      {side_effects && (
                        <li>
                          <strong>Side Effects:</strong> {side_effects}
                        </li>
                      )}
                      {muscle_gain && (
                        <li>
                          <strong>Muscle Gain:</strong> {muscle_gain}
                        </li>
                      )}
                      {keep_gains && (
                        <li>
                          <strong>Keep Gains:</strong> {keep_gains}
                        </li>
                      )}
                      {fat_water && (
                        <li>
                          <strong>Fat/Water:</strong> {fat_water}
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
