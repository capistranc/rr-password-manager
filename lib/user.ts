import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
import { db } from "./db";

export async function createUser({ email, password }) {
  // Here you should create the user and save the salt and hashed password (some dbs may have
  // authentication methods that will do it for you so you don't have to worry about it):
  const salt = crypto.randomBytes(32).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  const iv = crypto.randomBytes(32).toString("hex");

  try {
    const ret = await db.query(
      `INSERT INTO main.users ( email, hash, salt, iv) VALUES ('${email}', '${hash}', '${salt}', '${iv}')`,
    );

    const user = {
      userId: ret.insertId,
      email,
      hash,
      salt,
      iv,
    };
    return user;
  } catch (e) {
    console.log("SQL ERROR", e);
    if (e.code === "ER_DUP_ENTRY") {
      throw { msg: "Email Already Exists", field: "email" };
    }
  }
}

export async function getUserById({ userId }) {
  try {
    const ret = await db.query(
      `SELECT * FROM main.users u WHERE u.userId = ?`,
      [userId],
    );

    if (!ret || ret?.length === 0) throw Error("User Does not exist");

    const user = ret[0];

    return user;
  } catch (e) {
    console.log(e);
  }
}

// Here you should lookup for the user in your DB
export async function findUser({ email }) {
  try {
    const ret = await db.query(`SELECT * FROM main.users u WHERE u.email = ?`, [
      email,
    ]);

    if (!ret || ret?.length === 0)
      throw Error("Email/Password Combo not found");

    const user = ret[0];
    console.log(user);

    return user;
  } catch (e) {
    console.log(e);
  }
}

// Compare the password of an already fetched user (using `findUser`) and compare the
// password for a potential match
export async function validatePassword(user, inputPassword) {
  const inputHash = crypto
    .pbkdf2Sync(inputPassword, user.salt, 1000, 64, "sha512")
    .toString("hex");
  const passwordsMatch = user.hash === inputHash;

  return passwordsMatch;
}
