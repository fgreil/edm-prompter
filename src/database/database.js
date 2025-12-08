import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("edm.db");

export function initDatabase() {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS favorites (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        data TEXT
      );`
    );
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        data TEXT
      );`
    );
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS searches (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        data TEXT
      );`
    );
  });
}

export function runQuery(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        sql,
        params,
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
}

export default db;
