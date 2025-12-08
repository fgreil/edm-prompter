import { runQuery } from "../database";

async function ensureTable() {
  await runQuery(`
    CREATE TABLE IF NOT EXISTS favorites (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      data TEXT
    );
  `);
}

// Return list of article objects
export async function getFavorites() {
  await ensureTable();

  const res = await runQuery(`
    SELECT * FROM favorites
    ORDER BY id DESC
  `);

  return res.rows._array.map(row => JSON.parse(row.data));
}

// Add article (not used directly here but used by Explore & ArticleRender)
export async function addFavorite(article) {
  await ensureTable();

  return runQuery(
    "INSERT INTO favorites (data) VALUES (?)",
    [JSON.stringify(article)]
  );
}

// Remove article by title
export async function removeFavorite(title) {
  await ensureTable();

  const res = await runQuery(`
    SELECT * FROM favorites
  `);

  for (let row of res.rows._array) {
    const obj = JSON.parse(row.data);
    if (obj.title === title) {
      await runQuery(`DELETE FROM favorites WHERE id = ?`, [row.id]);
      return;
    }
  }
}
