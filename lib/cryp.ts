import crypto from "crypto";

const algorithm = "aes-256-ctr";
const secretKey = process.env.CRYPTO_SECRET;
const iv = crypto.randomBytes(16).toString("hex");

export const encryptWithIV = (text) => {
  const ivBuffer = Buffer.from(iv, "hex");
  console.log(ivBuffer);
  console.log(secretKey);
  const cipher = crypto.createCipheriv(algorithm, secretKey, ivBuffer);

  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  return {
    iv: iv,
    content: encrypted.toString("hex"),
  };
};

export const decrypt = (hash) => {
  const decipher = crypto.createDecipheriv(
    algorithm,
    secretKey,
    Buffer.from(hash.iv, "hex"),
  );

  const decrpyted = Buffer.concat([
    decipher.update(Buffer.from(hash.content, "hex")),
    decipher.final(),
  ]);

  return decrpyted.toString();
};
