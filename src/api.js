const BASE_URL = "https://hormogenius.com/api/";

export async function login(email, password) {
  const res = await fetch(`${BASE_URL}dashboard/UserLogin.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

export async function logout(id, token) {
  const res = await fetch(`${BASE_URL}dashboard/UserLogout.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, token }),
  });
  return res.json();
}

export async function getAllProducts() {
  const res = await fetch(`${BASE_URL}get_full_info.php`);
  const result = await res.json();
  
  // Helper to normalize a single product from the API, ensuring numbers and defaulting nulls
  const normalizeProductFromApi = (p) => {
    if (!p || typeof p !== 'object') return p;
    const copy = { ...p };
    
    const toNumberOr = (val, fallback = 0) => {
      if (val === '' || val === null || val === undefined) return fallback;
      const n = Number(val);
      return isNaN(n) ? fallback : n;
    };
    
    const toStringOrEmpty = (val) => {
      if (val === null || val === undefined || val === '') return '';
      return String(val);
    };
    
    // Coerce id and price
    if ('p_id' in copy) copy.p_id = toNumberOr(copy.p_id, copy.p_id);
    if ('id' in copy && (copy.p_id == null)) copy.p_id = toNumberOr(copy.id, copy.id);
    copy.price = toNumberOr(copy.price, 0);
    
    // Convert null metrics to empty strings for form compatibility
    copy.strength = toStringOrEmpty(copy.strength);
    copy.side_effects = toStringOrEmpty(copy.side_effects);
    copy.muscle_gain = toStringOrEmpty(copy.muscle_gain);
    copy.keep_gains = toStringOrEmpty(copy.keep_gains);
    copy.fat_water = toStringOrEmpty(copy.fat_water);

    return copy;
  };

  // إذا كان هناك مفتاح data وهو مصفوفة، قم بتطبيع العناصر وأرجعها
  if (result && Array.isArray(result.data)) {
    return result.data.map(normalizeProductFromApi);
  }
  // fallback: إذا كان data كائن واحد فقط
  if (result && typeof result.data === "object" && result.data !== null) {
    return [normalizeProductFromApi(result.data)];
  }
  return [];
}

export async function getProductByName(name) {
  const res = await fetch(`${BASE_URL}get_product_by_id.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  return res.json();
}

export async function createProduct({
  pname,
  name,
  description,
  science_name,
  how_to_use,
  price,
  qr_code,
  warnings,
  vial,
  caliber,
  sec_id,
  vid_url,
  img_url,
  images,
  videos,
  strength,
  side_effects,
  muscle_gain,
  keep_gains,
  fat_water,
}) {
  const formData = new FormData();
  const normalizeUrl = (u) => {
    const s = (u || "").trim();
    if (!s) return "";
    return /^https?:\/\//i.test(s) ? s : `https://hormogenius.com/${s.replace(/^\/+/, "")}`;
  };
  if (pname != null) formData.append("pname", String(pname));
  if (name != null) formData.append("name", String(name));
  if (description != null) formData.append("description", String(description));
  // Legacy key for backend compatibility
  if (description != null) formData.append("product_overview", String(description));
  if (science_name != null) formData.append("science_name", String(science_name));
  if (how_to_use != null) formData.append("how_to_use", String(how_to_use));
  // Legacy key for backend compatibility
  if (how_to_use != null) formData.append("method_of_use", String(how_to_use));
  if (qr_code != null) formData.append("qr_code", normalizeUrl(qr_code));
  if (warnings != null) formData.append("warnings", String(warnings));
  if (vial != null) formData.append("vial", String(vial));
  if (caliber != null) formData.append("caliber", String(caliber));
  if (sec_id != null) formData.append("sec_id", String(Number(sec_id)));

  // معالجة الحقول الرقمية - إرسالها دائماً إذا كانت موجودة وليست فارغة
  if (price !== undefined && price !== null && price !== '') {
    formData.append("price", String(price));
  }
  if (strength !== undefined && strength !== null && strength !== '') {
    formData.append("strength", String(strength));
  }
  if (side_effects !== undefined && side_effects !== null && side_effects !== '') {
    formData.append("side_effects", String(side_effects));
  }
  if (muscle_gain !== undefined && muscle_gain !== null && muscle_gain !== '') {
    formData.append("muscle_gain", String(muscle_gain));
  }
  if (keep_gains !== undefined && keep_gains !== null && keep_gains !== '') {
    formData.append("keep_gains", String(keep_gains));
  }
  if (fat_water !== undefined && fat_water !== null && fat_water !== '') {
    formData.append("fat_water", String(fat_water));
  }

  // Debug logging
  console.log('FormData metrics:', {
    strength: formData.get('strength'),
    side_effects: formData.get('side_effects'),
    muscle_gain: formData.get('muscle_gain'),
    keep_gains: formData.get('keep_gains'),
    fat_water: formData.get('fat_water')
  });

  // Files: if user selected a File, append it; if it's a string URL, also append as string for backend compatibility
  // Decide video file to send: prefer vid_url, else first of videos
  const videoFile =
    vid_url instanceof File
      ? vid_url
      : Array.isArray(videos) && videos[0] instanceof File
        ? videos[0]
        : videos instanceof File
          ? videos
          : null;
  if (videoFile) {
    // Append using both possible backend keys
    formData.append("vid_url", videoFile);
    formData.append("videos", videoFile);
  } else if (vid_url != null) {
    formData.append("vid_url", String(vid_url));
  } else if (Array.isArray(videos) && typeof videos[0] === "string") {
    formData.append("vid_url", String(videos[0]));
  }
  
  // Decide image file to send: prefer img_url, else first of images
  const imageFile =
    img_url instanceof File
      ? img_url
      : Array.isArray(images) && images[0] instanceof File
        ? images[0]
        : images instanceof File
          ? images
          : null;
  if (imageFile) {
    // Append using both possible backend keys
    formData.append("img_url", imageFile);
    formData.append("images", imageFile);
  } else if (img_url != null) {
    formData.append("img_url", String(img_url));
  } else if (Array.isArray(images) && typeof images[0] === "string") {
    formData.append("img_url", String(images[0]));
  }

  const res = await fetch("https://hormogenius.com/api/dashboard/CreateProduct.php", {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  const data = await res.json();
  
  // Debug: طباعة رد الـ API
  console.log('API Response:', data);
  
  if (data && data.status === "success") return data;
  throw new Error(data?.message || "Failed to create product");
}

export async function updateProduct({
  p_id,
  pname,
  name,
  description,
  science_name,
  how_to_use,
  price,
  qr_code,
  warnings,
  vial,
  caliber,
  sec_id,
  vid_url,
  img_url,
  images,
  videos,
  strength,
  side_effects,
  muscle_gain,
  keep_gains,
  fat_water,
}) {
  const formData = new FormData();
  const normalizeUrl = (u) => {
    const s = (u || "").trim();
    if (!s) return "";
    return /^https?:\/\//i.test(s) ? s : `https://hormogenius.com/${s.replace(/^\/+/, "")}`;
  };
  if (p_id != null) formData.append("p_id", String(Number(p_id)));
  if (pname != null) formData.append("pname", String(pname));
  if (name != null) formData.append("name", String(name));
  if (description != null) formData.append("description", String(description));
  if (science_name != null) formData.append("science_name", String(science_name));
  if (how_to_use != null) formData.append("how_to_use", String(how_to_use));
  if (qr_code != null) formData.append("qr_code", normalizeUrl(qr_code));
  if (warnings != null) formData.append("warnings", String(warnings));
  if (vial != null) formData.append("vial", String(vial));
  if (caliber != null) formData.append("caliber", String(caliber));
  if (sec_id != null) formData.append("sec_id", String(Number(sec_id)));

  // معالجة الحقول الرقمية - إرسالها دائماً إذا كانت موجودة وليست فارغة
  if (price !== undefined && price !== null && price !== '') {
    formData.append("price", String(price));
  }
  if (strength !== undefined && strength !== null && strength !== '') {
    formData.append("strength", String(strength));
  }
  if (side_effects !== undefined && side_effects !== null && side_effects !== '') {
    formData.append("side_effects", String(side_effects));
  }
  if (muscle_gain !== undefined && muscle_gain !== null && muscle_gain !== '') {
    formData.append("muscle_gain", String(muscle_gain));
  }
  if (keep_gains !== undefined && keep_gains !== null && keep_gains !== '') {
    formData.append("keep_gains", String(keep_gains));
  }
  if (fat_water !== undefined && fat_water !== null && fat_water !== '') {
    formData.append("fat_water", String(fat_water));
  }

  // videos/images can be File, array of File, or string path; prefer vid_url/img_url if File, else fallback to first of videos/images
  const updVideoFile =
    vid_url instanceof File
      ? vid_url
      : Array.isArray(videos) && videos[0] instanceof File
        ? videos[0]
        : videos instanceof File
          ? videos
          : null;
  if (updVideoFile) {
    // Append using both possible backend keys
    formData.append("vid_url", updVideoFile);
    formData.append("videos", updVideoFile);
  } else if (vid_url != null) {
    formData.append("vid_url", String(vid_url));
  } else if (Array.isArray(videos) && typeof videos[0] === "string") {
    formData.append("vid_url", String(videos[0]));
  }
  
  const updImageFile =
    img_url instanceof File
      ? img_url
      : Array.isArray(images) && images[0] instanceof File
        ? images[0]
        : images instanceof File
          ? images
          : null;
  if (updImageFile) {
    // Append using both possible backend keys
    formData.append("img_url", updImageFile);
    formData.append("images", updImageFile);
  } else if (img_url != null) {
    formData.append("img_url", String(img_url));
  } else if (Array.isArray(images) && typeof images[0] === "string") {
    formData.append("img_url", String(images[0]));
  }

  const res = await fetch("https://hormogenius.com/api/dashboard/UpdateProduct.php", {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  const data = await res.json();
  if (data && data.status === "success") return data;
  throw new Error(data?.message || "Failed to update product");
}

export async function deleteProduct(arg1, maybeSecId) {
  // arg1 can be p_id (string/number) or an object { p_id, id, product_id, sec_id }
  let p_id = null;
  let sec_id = null;
  if (arg1 && typeof arg1 === "object") {
    p_id = arg1.p_id ?? arg1.id ?? arg1.product_id ?? null;
    sec_id = arg1.sec_id ?? null;
  } else {
    p_id = arg1 ?? null;
    sec_id = maybeSecId ?? null;
  }

  const formData = new FormData();
  // Required by backend to specify delete operation
  formData.append("action", "delete");
  if (p_id != null) {
    formData.append("p_id", String(p_id));
    // Add common alternative keys for compatibility with backend variations
    formData.append("id", String(p_id));
    formData.append("product_id", String(p_id));
    formData.append("pid", String(p_id));
  }
  if (sec_id != null) {
    formData.append("sec_id", String(sec_id));
  }

  // Try dashboard endpoint first, then fallback to root endpoint
  const tryDelete = async (url) => {
    const res = await fetch(url, { method: "POST", body: formData });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    console.debug('[Delete API][POST]', url, { payload: '[FormData]', response: data });
    return data;
  };

  let data = await tryDelete(`${BASE_URL}dashboard/DeleteProduct.php`).catch(() => null);
  if (!data || data.status !== "success") {
    // Attempt root endpoint using FormData
    data = await tryDelete(`${BASE_URL}DeleteProduct.php`).catch(() => null);
  }
  if (!data || data.status !== "success") {
    // As a final fallback, attempt JSON payload version (some backends accept JSON only)
    const jsonPayload = {
      action: "delete",
      p_id: p_id != null ? Number(p_id) : undefined,
      id: p_id != null ? Number(p_id) : undefined,
      product_id: p_id != null ? Number(p_id) : undefined,
      pid: p_id != null ? Number(p_id) : undefined,
      sec_id: sec_id != null ? Number(sec_id) : undefined,
    };
    const request = async (url) => {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jsonPayload),
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const json = await res.json();
      console.debug('[Delete API][POST-JSON]', url, { payload: jsonPayload, response: json });
      return json;
    };
    data = await request(`${BASE_URL}dashboard/DeleteProduct.php`).catch(() => null);
    if (!data || data.status !== "success") {
      data = await request(`${BASE_URL}DeleteProduct.php`).catch(() => null);
    }
  }
  if (!data || data.status !== "success") {
    // As a final fallback, try GET with query string
    const qs = new URLSearchParams();
    qs.set('action', 'delete');
    if (p_id != null) {
      qs.set('p_id', String(p_id));
      qs.set('id', String(p_id));
      qs.set('product_id', String(p_id));
      qs.set('pid', String(p_id));
    }
    if (sec_id != null) qs.set('sec_id', String(sec_id));
    const getTry = async (url) => {
      const res = await fetch(`${url}?${qs.toString()}`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const json = await res.json();
      console.debug('[Delete API][GET]', `${url}?${qs.toString()}`, { response: json });
      return json;
    };
    data = await getTry(`${BASE_URL}dashboard/DeleteProduct.php`).catch(() => null);
    if (!data || data.status !== 'success') {
      data = await getTry(`${BASE_URL}DeleteProduct.php`).catch(() => null);
    }
  }
  if (data && data.status === "success") return data;
  throw new Error(data?.message || "Failed to delete product");
}