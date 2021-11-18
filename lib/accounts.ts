import { db } from "./db";
// import { encryptWithIV, decrypt } from "./cryp";
import Iron from "@hapi/iron";

export async function addAccount({ userId, url, username, password }) {
  console.log("SQL ADDACCOUNT", userId, url, username, password);

  try {
    const userData = await db.query(
      `SELECT iv FROM main.users u WHERE u.userId = ?`,
      [userId],
    );

    const { iv } = userData[0];

    const hash = await Iron.seal(password, iv, Iron.defaults);

    const result = await db.query(
      `INSERT INTO main.accounts(userId, url, username, hash) VALUES (?,?,?,?)`,
      [userId, url, username, hash],
    );

    const ret = {
      accountId: result.insertId,
    };

    return ret;
  } catch (e) {
    console.log("SQL ERROR", e);
  }
}

export async function updateAccount({
  userId,
  accountId,
  url,
  username,
  password,
}) {
  try {
    const userData = await db.query(
      `SELECT iv FROM main.users u WHERE u.userId = ?`,
      [userId],
    );

    const { iv } = userData[0];

    const hash = await Iron.seal(password, iv, Iron.defaults);

    const result = await db.query(
      `UPDATE main.accounts
      SET url = ?, username = ?, hash = ?
      WHERE accountId = ${accountId}`,
      [url, username, hash],
    );

    return true;
  } catch (e) {
    console.log("SQL ERROR", e);
  }
}
// Here you should lookup for the user in your DB
export async function getAccounts({ userId }) {
  try {
    const accounts = await db.query(
      `SELECT * FROM main.accounts a WHERE a.userId = ?`,
      [userId],
    );

    return accounts;
  } catch (e) {
    console.log("SQL ERROR", e);
  }
}

// Compare the password of an already fetched user (using `findUser`) and compare the
// password for a potential match
export async function deleteAccount({ accountId }) {
  try {
    const ret = await db.query(
      `DELETE FROM main.accounts WHERE accountId = ${accountId}`,
    );

    return true;
  } catch (e) {
    console.log("SQL ERROR", e);
  }
}
