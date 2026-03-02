const bcrypt = require("bcryptjs");

async function main() {
  const plain = "Admin@123";
  const hash = await bcrypt.hash(plain, 10);
  console.log("Hash for Admin@123:", hash);
}

main();