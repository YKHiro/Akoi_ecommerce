import config from "../config";




export async function fetchProducts(destino, params = {}) {
  params = Object.fromEntries(
    Object.entries(params).filter(([_, v]) => v !== "" && v != null)
  );
  let queryString = new URLSearchParams()
  
  Object.entries(params).forEach(([key, value]) => {
  if (Array.isArray(value)) {
    value.forEach(v => {
      if (v !== '') queryString.append(key, v);
    });
  } else if (value !== '') {
    queryString.append(key, value);
  }
});

  queryString = queryString.toString();
  const url = `${config.API_URL}${destino}${queryString ? '?' + queryString : ''}`;
  console.log(url)
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    return data; // The parsed JSON data from Django
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
}



