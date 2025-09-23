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
  const res = await fetch(`${BASE_URL}dashboard/get_all_products.php`);
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
  const res = await fetch(`${BASE_URL}dashboard/get_product_by_name.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  return res.json();
}

export async function createProduct({
  pname,
  name,
  product_overview,
  uses,
  potential_harms,
  method_of_use,
  price,
  qr_code,
  code,
  code2,
  code3,
  code4,
  warnings,
  vial,
  caliber,
  sec_id,
  vid_url,
  img_url,
  img_url2,
  img_url3,
}) {
  const res = await fetch("https://trx-laboratory.com/CreateProduct.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      pname,
      name,
      product_overview,
      uses,
      potential_harms,
      method_of_use,
      price: price !== undefined && price !== null ? Number(price) : price,
      qr_code,
      code,
      code2,
      code3,
      code4,
      warnings,
      vial,
      caliber,
      sec_id: sec_id !== undefined && sec_id !== null ? Number(sec_id) : sec_id,
      vid_url,
      img_url,
      img_url2,
      img_url3,
    }),
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
  product_overview,
  uses,
  potential_harms,
  method_of_use,
  price,
  qr_code,
  code,
  code2,
  code3,
  code4,
  warnings,
  vial,
  caliber,
  sec_id,
  vid_url,
  img_url,
  img_url2,
  img_url3,
}) {
  const res = await fetch("https://trx-laboratory.com/UpdateProduct.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      p_id: p_id !== undefined && p_id !== null ? Number(p_id) : p_id,
      pname,
      name,
      product_overview,
      uses,
      potential_harms,
      method_of_use,
      price: price !== undefined && price !== null ? Number(price) : price,
      qr_code,
      code,
      code2,
      code3,
      code4,
      warnings,
      vial,
      caliber,
      sec_id: sec_id !== undefined && sec_id !== null ? Number(sec_id) : sec_id,
      vid_url,
      img_url,
      img_url2,
      img_url3,
    }),
  });
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  const data = await res.json();
  if (data && data.status === "success") return data;
  throw new Error(data?.message || "Failed to update product");
}

export async function deleteProduct(p_id) {
  const res = await fetch(`${BASE_URL}DeleteProduct.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ p_id }),
  });
  return res.json();
}

// Replace your current updateUserInfo function in api.js with this:

export async function updateUserInfo({ phone, email }) {
  try {
    // دائماً أرسل id: "1"
    const dataToSend = {
      id: "1",
      phone,
      email,
    };
    const res = await fetch("https://trx-laboratory.com/update_info.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
}