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
  const res = await fetch(`${BASE_URL}/get_full_info.php`);
  const result = await res.json();
  // إذا كان هناك مفتاح data وهو مصفوفة، أرجعه مباشرة
  if (result && Array.isArray(result.data)) {
    return result.data;
  }
  // fallback: إذا كان data كائن واحد فقط
  if (result && typeof result.data === "object" && result.data !== null) {
    return [result.data];
  }
  return [];
}

export async function getProductByName(name) {
  const res = await fetch(`${BASE_URL}/get_product_by_id.php`, {
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
  if (pname != null) formData.append("pname", String(pname));
  if (name != null) formData.append("name", String(name));
  if (description != null) formData.append("description", String(description));
  // Legacy key for backend compatibility
  if (description != null) formData.append("product_overview", String(description));
  if (science_name != null) formData.append("science_name", String(science_name));
  if (how_to_use != null) formData.append("how_to_use", String(how_to_use));
  // Legacy key for backend compatibility
  if (how_to_use != null) formData.append("method_of_use", String(how_to_use));
  if (price !== "" && price != null) formData.append("price", String(price));
  if (qr_code != null) formData.append("qr_code", String(qr_code));
  if (warnings != null) formData.append("warnings", String(warnings));
  if (vial != null) formData.append("vial", String(vial));
  if (caliber != null) formData.append("caliber", String(caliber));
  if (sec_id != null) formData.append("sec_id", String(Number(sec_id)));
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
    formData.append("vid_url", videoFile);
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
    formData.append("img_url", imageFile);
  } else if (img_url != null) {
    formData.append("img_url", String(img_url));
  } else if (Array.isArray(images) && typeof images[0] === "string") {
    formData.append("img_url", String(images[0]));
  }
  if (strength !== "" && strength != null) formData.append("strength", String(strength));
  if (side_effects !== "" && side_effects != null) formData.append("side_effects", String(side_effects));
  if (muscle_gain !== "" && muscle_gain != null) formData.append("muscle_gain", String(muscle_gain));
  if (keep_gains !== "" && keep_gains != null) formData.append("keep_gains", String(keep_gains));
  if (fat_water !== "" && fat_water != null) formData.append("fat_water", String(fat_water));

  const res = await fetch("https://hormogenius.com/api/dashboard/CreateProduct.php", {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  const data = await res.json();
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
  if (p_id != null) formData.append("p_id", String(Number(p_id)));
  if (pname != null) formData.append("pname", String(pname));
  if (name != null) formData.append("name", String(name));
  if (description != null) formData.append("description", String(description));
  if (science_name != null) formData.append("science_name", String(science_name));
  if (how_to_use != null) formData.append("how_to_use", String(how_to_use));
  if (price !== "" && price != null) formData.append("price", String(price));
  if (qr_code != null) formData.append("qr_code", String(qr_code));
  if (warnings != null) formData.append("warnings", String(warnings));
  if (vial != null) formData.append("vial", String(vial));
  if (caliber != null) formData.append("caliber", String(caliber));
  if (sec_id != null) formData.append("sec_id", String(Number(sec_id)));
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
    formData.append("vid_url", updVideoFile);
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
    formData.append("img_url", updImageFile);
  } else if (img_url != null) {
    formData.append("img_url", String(img_url));
  } else if (Array.isArray(images) && typeof images[0] === "string") {
    formData.append("img_url", String(images[0]));
  }
  if (strength !== "" && strength != null) formData.append("strength", String(strength));
  if (side_effects !== "" && side_effects != null) formData.append("side_effects", String(side_effects));
  if (muscle_gain !== "" && muscle_gain != null) formData.append("muscle_gain", String(muscle_gain));
  if (keep_gains !== "" && keep_gains != null) formData.append("keep_gains", String(keep_gains));
  if (fat_water !== "" && fat_water != null) formData.append("fat_water", String(fat_water));

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
    data = await getTry(`${BASE_URL}DeleteProduct.php`).catch(() => null);
    if (!data || data.status !== 'success') {
      data = await getTry(`${BASE_URL}DeleteProduct.php`).catch(() => null);
    }
  }
  if (data && data.status === "success") return data;
  throw new Error(data?.message || "Failed to delete product");
}
