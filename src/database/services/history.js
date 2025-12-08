import { runQuery } from "../database";

export async function addToHistory(article) {
  const entry = {
    ...article,
    date: new Date().toISOString().slice(0, 10)
  };

  return runQuery(
    "INSERT INTO history (data) VALUES (?)",
    [JSON.stringify(entry)]
  );
}

export async function getHistory() {
  const res = await runQuery("SELECT * FROM history ORDER BY id DESC");
  return res.rows._array.map(row => JSON.parse(row.data));
}
