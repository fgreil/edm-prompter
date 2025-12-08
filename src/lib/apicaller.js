// src/lib/apicaller.js
const BASE_URL = "https://edm.f418.eu/";

export default async function callApi(endpoint, method = "GET") {
  try {
    const response = await fetch(BASE_URL + endpoint, {
      method,
      headers: { "Content-Type": "application/json" }
    });

    if (!response.ok) {
      throw new Error("API error");
    }

    return await response.json();
  } catch (err) {
    console.warn("API call failed:", err);
    throw err;
  }
}
