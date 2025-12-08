import { runQuery } from "../database";

// Ensure the table exists (safe on all platforms)
async function ensureTable() {
  await runQuery(`
    CREATE TABLE IF NOT EXISTS searches (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      data TEXT
    );
  `);
}

// Load the keyword history — returns an array of strings
export async function getSearchHistory() {
  await ensureTable();

  const res = await runQuery(`
    SELECT * FROM searches
    ORDER BY id DESC
    LIMIT 1
  `);

  if (!res.rows.length) return [];

  try {
    const parsed = JSON.parse(res.rows.item(0).data);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.warn("Failed to parse search history", e);
    return [];
  }
}

// Save the updated keyword list back into the database
async function saveSearchHistory(keywords) {
  const json = JSON.stringify(keywords);

  await ensureTable();

  // Only keep one row always
  await runQuery("DELETE FROM searches");
  await runQuery("INSERT INTO searches (data) VALUES (?)", [json]);
}

// Add a keyword → dedupe, move to top, limit to 20 items
export async function addKeyword(keyword) {
  const trimmed = (keyword || "").trim();
  if (!trimmed) return [];

  let list = await getSearchHistory();

  // Remove if exists
  list = list.filter(item => item !== trimmed);

  // Add to front
  list.unshift(trimmed);

  // Limit to 20 stored entries
  list = list.slice(0, 20);

  await saveSearchHistory(list);

  return list;
}
