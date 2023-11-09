const fs = require("fs");
const key = fs.readFileSync("private_key.pem", "utf8");
const base64Key = Buffer.from(key).toString("base64");
const urlSafeKey = base64Key
  .replace(/\+/g, "-")
  .replace(/\//g, "_")
  .replace(/=+$/, "");
console.log(urlSafeKey);

/**
 *
 * A public-private key pair is identified by the fact that they are mathematically linked - what one key encrypts, only the other can decrypt.
 * When you generate a key pair using OpenSSL or a similar tool, the private key is generated first, and then the public key is derived from it.
 * This ensures that they form a valid pair.
 *
 * How to generate key pair?
 * 1. Generate a private key. Run below command in git bash
 *    openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048
 * 2. Generate a public key from the private key. Run below command in git bash
 *    openssl rsa -pubout -in private_key.pem -out public_key.pem
 *
 * How to make your key pair base64-encoded and URL-encoded? --> run above code
 *
 */
