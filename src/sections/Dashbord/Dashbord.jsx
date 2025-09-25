import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  logout,
} from "../../api";
import ShinyText from "../../components/ShinyText/ShinyText";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Dashbord.css";

function ProductForm({ initial, onSave, onClose, isLoading }) {
  const [form, setForm] = useState(initial);
  const [formError, setFormError] = useState("");

  function handleChange(e) {
    const { name, files } = e.target;
    let { value } = e.target;
    
    // Handle multi-file inputs for images/videos
    if (name === "images" || name === "videos") {
      const list = files ? Array.from(files) : [];
      setForm((f) => ({ ...f, [name]: list }));
      return;
    }
    
    // معالجة الحقول الرقمية - إبقاء القيمة كـ string بدلاً من تحويلها فوراً
    const numericFields = [
      "price",
      "strength", 
      "side_effects",
      "muscle_gain",
      "keep_gains",
      "fat_water",
    ];
    
    if (numericFields.includes(name)) {
      // إبقاء القيمة كما هي (string) بدلاً من تحويلها لـ Number
      setForm((f) => ({ ...f, [name]: value }));
      return;
    }
    
    setForm((f) => ({ ...f, [name]: value }));
  }

  return (
    <div className="dashboard-modal-bg">
      <form
        className="dashboard-modal"
        onSubmit={(e) => {
          e.preventDefault();
          setFormError("");
          onSave(form);
        }}
      >
        <h3 className="dashboard-title mb-4">
          {initial.p_id ? "Edit" : "Add"} Product
        </h3>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="pname" className="form-label">Product Name Qr</label>
            <input
              id="pname"
              name="pname"
              placeholder="Enter product name in English"
              className="w-full mb-2 p-2 border rounded"
              value={form.pname || ""}
              onChange={handleChange}
              required
            />
          </div>
          {/* Removed 'name' field per requested payload */}
          <div className="form-group span-2">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter general product description..."
              className="w-full mb-2 p-2 border rounded"
              value={form.description || ""}
              onChange={handleChange}
              required
            />
          </div>
          {/* Scientific Name removed per request */}
          <div className="form-group span-2">
            <label htmlFor="how_to_use" className="form-label">How To Use</label>
            <textarea
              id="how_to_use"
              name="how_to_use"
              placeholder="Explain how to use the product..."
              className="w-full mb-2 p-2 border rounded"
              value={form.how_to_use || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="price" className="form-label">Price</label>
            <input
              id="price"
              name="price"
              type="number"
              step="0.01"
              placeholder="0.00"
              className="w-full mb-2 p-2 border rounded"
              value={form.price ?? ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="qr_code" className="form-label">QR Code Link</label>
            <input
              id="qr_code"
              name="qr_code"
              placeholder="Enter QR code URL"
              className="w-full mb-2 p-2 border rounded"
              value={form.qr_code || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group span-2">
            <label htmlFor="warnings" className="form-label">Important Warnings</label>
            <textarea
              id="warnings"
              name="warnings"
              placeholder="Enter important warnings..."
              className="w-full mb-2 p-2 border rounded"
              value={form.warnings || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="vial" className="form-label">Vial</label>
            <input
              id="vial"
              name="vial"
              placeholder="Enter vial information"
              className="w-full mb-2 p-2 border rounded"
              value={form.vial || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="caliber" className="form-label">Caliber</label>
            <input
              id="caliber"
              name="caliber"
              placeholder="Enter caliber information"
              className="w-full mb-2 p-2 border rounded"
              value={form.caliber || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="videos" className="form-label">Product Videos</label>
            <input
              id="videos"
              name="videos"
              type="file"
              accept="video/*"
              multiple
              className="w-full mb-2 p-2 border rounded"
              onChange={handleChange}
              required={!initial?.p_id}
            />
          </div>
          <div className="form-group">
            <label htmlFor="images" className="form-label">Product Images</label>
            <input
              id="images"
              name="images"
              type="file"
              accept="image/*"
              multiple
              className="w-full mb-2 p-2 border rounded"
              onChange={handleChange}
              required={!initial?.p_id}
            />
          </div>

          <div className="form-group">
            <label htmlFor="strength" className="form-label">Strength (0-100)</label>
            <input
              id="strength"
              name="strength"
              type="text"
              min="0"
              max="100"
              placeholder="0-100"
              className="w-full mb-2 p-2 border rounded"
              value={form.strength ?? ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="side_effects" className="form-label">Side Effects (0-100)</label>
            <input
              id="side_effects"
              name="side_effects"
              type="text"
              min="0"
              max="100"
              placeholder="0-100"
              className="w-full mb-2 p-2 border rounded"
              value={form.side_effects ?? ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="muscle_gain" className="form-label">Muscle Gain (0-100)</label>
            <input
              id="muscle_gain"
              name="muscle_gain"
              type="text"
              min="0"
              max="100"
              placeholder="0-100"
              className="w-full mb-2 p-2 border rounded"
              value={form.muscle_gain ?? ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="keep_gains" className="form-label">Keep Gains (0-100)</label>
            <input
              id="keep_gains"
              name="keep_gains"
              type="text"
              min="0"
              max="100"
              placeholder="0-100"
              className="w-full mb-2 p-2 border rounded"
              value={form.keep_gains ?? ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="fat_water" className="form-label">Fat/Water (0-100)</label>
            <input
              id="fat_water"
              name="fat_water"
              type="text"
              min="0"
              max="100"
              placeholder="0-100"
              className="w-full mb-2 p-2 border rounded"
              value={form.fat_water ?? ""}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        {formError && (
          <div className="text-red-500 mb-2" role="alert">
            {formError}
          </div>
        )}
        <div className="flex gap-2 mt-4">
          <button type="submit" className="dashboard-btn" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            className="dashboard-btn"
            style={{ backgroundColor: "#e5e7eb", color: "#2563eb" }}
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default function Dashboard() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteError, setDeleteError] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [search, setSearch] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSection = (
    searchParams.get("section") || "injectables"
  ).toLowerCase();
  const [activeSection, setActiveSection] = useState(initialSection);

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      setShowForm(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      setEditProduct(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      setDeleteId(null);
      setDeleteError(null);
    },
    onError: (err) => {
      const msg = err?.message || "Failed to delete product";
      setDeleteError(msg);
    },
  });

  function handleLogout() {
    const token = localStorage.getItem("token");
    // You may need to store user id somewhere, here assumed as "1"
    logout(1, token).then(() => {
      localStorage.removeItem("token");
      navigate("/login");
    });
  }

  const filteredProducts = Array.isArray(products)
    ? products
      .filter((p) => {
        // Section filter using sec_name, normalize "injections" -> "injectables"
        const raw = String(p.sec_name || "").toLowerCase();
        const sec = raw === "injections" ? "injectables" : raw;
        return sec === String(activeSection).toLowerCase();
      })
      .filter((p) => {
        // Text search filter
        const q = search.trim().toLowerCase();
        if (!q) return true;
        return (
          String(p.pname || "")
            .toLowerCase()
            .includes(q) ||
          String(p.name || "")
            .toLowerCase()
            .includes(q) ||
          String(p.p_id || "")
            .toLowerCase()
            .includes(q)
        );
      })
    : [];

  const countFor = (sec) =>
    Array.isArray(products)
      ? products.filter((p) => {
        const raw = String(p.sec_name || "").toLowerCase();
        const norm = raw === "injections" ? "injectables" : raw;
        return norm === String(sec);
      }).length
      : 0;

  function setSection(sec) {
    const norm = (sec || "injectables").toLowerCase();
    setActiveSection(norm);
    setSearchParams({ section: norm });
  }

  // Fixed mapping per request: Injectables -> 1, Tablets -> 2
  const secIdForActiveTab = activeSection === "injectables" ? 1 : 2;

  return (
    <div className="dash">
      <div className="dashboard-bg min-h-screen p-8">
        <div className="catego">
          <h1>
            <ShinyText text="Dashboard" speed={3} className="shiny-heading" />
          </h1>
        </div>
        <div className="container">
          <div className="toolbar mt-5 mb-5">
            <div className="toolbar-left">
              <input
                className="toolbar-search"
                placeholder="Search by name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="toolbar-right">
              <button
                className="dashboard-btn"
                onClick={() => setShowForm(true)}
              >
                + Add Product
              </button>
              <button className="dashboard-btn logout" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
          <div className="section-tabs">
            <button
              className={`tab ${activeSection === "injectables" ? "active" : ""
                }`}
              onClick={() => setSection("injectables")}
            >
              Injectables ({countFor("injectables")})
            </button>
            <button
              className={`tab ${activeSection === "tablets" ? "active" : ""}`}
              onClick={() => setSection("tablets")}
            >
              Tablets ({countFor("tablets")})
            </button>
          </div>
          {isLoading ? (
            <div>Loading products...</div>
          ) : error ? (
            <div className="text-red-500">Error loading products.</div>
          ) : Array.isArray(products) ? (
            <div>
              {filteredProducts.length === 0 ? (
                <div className="text-center text-gray-500">
                  No matching products.
                </div>
              ) : (
                <div className="product-swiper-wrap">
                  <Swiper
                    className="product-swiper"
                    modules={[Navigation, Pagination, Keyboard]}
                    navigation
                    pagination={{ clickable: true }}
                    keyboard={{ enabled: true, onlyInViewport: true }}
                    watchOverflow={true}
                    centeredSlides={true}
                    centeredSlidesBounds={true}
                    spaceBetween={12}
                    slidesPerView={1}
                    breakpoints={{
                      640: {
                        slidesPerView: 2,
                        spaceBetween: 12,
                        centeredSlides: false,
                      },
                      900: {
                        slidesPerView: 3,
                        spaceBetween: 12,
                        centeredSlides: false,
                      },
                      1280: {
                        slidesPerView: 4,
                        spaceBetween: 12,
                        centeredSlides: false,
                      },
                    }}
                  >
                    {filteredProducts.map((prod) => {
                      const img =
                        prod.img_url || prod.img_url2 || prod.img_url3;
                      return (
                        <SwiperSlide key={prod.p_id}>
                          <div className="product-card">
                            <div className="product-card-image">
                              {img ? (
                                <img
                                  src={img}
                                  alt={prod.name || prod.pname || "product"}
                                  loading="lazy"
                                />
                              ) : (
                                <div className="product-card-image placeholder">
                                  No Image
                                </div>
                              )}
                            </div>
                            <div className="product-card-body">
                              <div className="product-card-title">
                                {prod.name}
                              </div>
                              {prod.pname && (
                                <div className="product-card-subtitle">
                                  {prod.pname}
                                </div>
                              )}
                              <div className="product-card-price">
                                Price: {prod.price}$
                              </div>
                            </div>
                            <div className="product-card-actions">
                              {prod.qr_code ? (
                                <a
                                  className="dashboard-btn"
                                  href={`${prod.qr_code}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  title="Go to product QR route"
                                >
                                  Show More
                                </a>
                              ) : (
                                <span
                                  className="dashboard-btn"
                                  style={{
                                    opacity: 0.6,
                                    pointerEvents: "none",
                                  }}
                                >
                                  Show More
                                </span>
                              )}
                              <button
                                className="dashboard-btn edit"
                                onClick={() => setEditProduct(prod)}
                              >
                                Edit
                              </button>
                              <button
                                className="dashboard-btn delete"
                                onClick={() => {
                                  setDeleteError(null);
                                  setDeleteTarget(prod);
                                  const raw = prod.p_id ?? prod.id ?? prod.product_id ?? prod.pid;
                                  const cleaned = typeof raw === 'string' ? raw.trim() : raw;
                                  const numeric = cleaned != null && !isNaN(Number(cleaned)) ? Number(cleaned) : cleaned;
                                  setDeleteId(numeric);
                                }}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </div>
              )}
            </div>
          ) : (
            <div className="text-red-500">No products found or API error.</div>
          )}

          {showForm && (
            <ProductForm
              initial={{
                pname: "",
                description: "",
                how_to_use: "",
                price: "",
                qr_code: "",
                warnings: "",
                vial: "",
                caliber: "",
                images: [],
                videos: [],
                strength: "",
                side_effects: "",
                muscle_gain: "",
                keep_gains: "",
                fat_water: "",
              }}
              onSave={(data) => {
                const sec_id = secIdForActiveTab;
                const payload = { ...data, sec_id };
                createMutation.mutate(payload);
              }}
              onClose={() => setShowForm(false)}
              isLoading={createMutation.isLoading}
            />
          )}

          {editProduct && (
            <ProductForm
              initial={{
                ...editProduct,
                // ضمان أن القيم الرقمية ليست null
                strength: editProduct.strength || "",
                side_effects: editProduct.side_effects || "",
                muscle_gain: editProduct.muscle_gain || "",
                keep_gains: editProduct.keep_gains || "",
                fat_water: editProduct.fat_water || "",
                price: editProduct.price || "",
              }}
              onSave={(data) => {
                const sec_id = secIdForActiveTab;
                const payload = { ...data, sec_id, p_id: editProduct.p_id };
                updateMutation.mutate(payload);
              }}
              onClose={() => setEditProduct(null)}
              isLoading={updateMutation.isLoading}
            />
          )}

          {deleteId && (
            <div className="dashboard-modal-bg">
              <div className="dashboard-modal">
                <p className="mb-4">
                  Are you sure you want to delete this product?
                </p>
                
                {deleteError && (
                  <div className="text-red-500 mb-3" role="alert">
                    {String(deleteError)}
                  </div>
                )}
                <div className="flex gap-2">
                  <button
                    className="dashboard-btn delete"
                    onClick={() => {
                      const pid = (deleteTarget?.p_id ?? deleteId);
                      const p_id = pid != null && !isNaN(Number(pid)) ? Number(pid) : pid;
                      const payload = {
                        p_id,
                        sec_id: deleteTarget?.sec_id ?? secIdForActiveTab,
                      };
                      console.debug('[Delete] payload', payload);
                      deleteMutation.mutate(payload);
                    }}
                    disabled={deleteMutation.isLoading}
                  >
                    {deleteMutation.isLoading ? "Deleting..." : "Delete"}
                  </button>
                  <button
                    className="dashboard-btn"
                    style={{ backgroundColor: "#e5e7eb", color: "#2563eb" }}
                    onClick={() => { setDeleteId(null); setDeleteTarget(null); setDeleteError(null); }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}