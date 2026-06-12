/**
 * Admin şifresi için bcrypt hash üretir.
 * Kullanım: npx tsx scripts/hash-password.ts "sifreniz"
 * Çıktıyı .env dosyasına ADMIN_PASSWORD_HASH='...' olarak ekleyin.
 */
import bcrypt from "bcryptjs";

const password = process.argv[2];

if (!password) {
  console.error('Kullanım: npx tsx scripts/hash-password.ts "sifreniz"');
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 12);
// Next.js'in env yükleyicisi $ işaretlerini değişken olarak genişlettiği için escape edilmeli
const escaped = hash.replace(/\$/g, "\\$");
console.log(`ADMIN_PASSWORD_HASH="${escaped}"`);
