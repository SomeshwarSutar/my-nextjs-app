import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

async function main() {
  const passwordHash = await bcrypt.hash("Admin@123", 10);

  await prisma.user.upsert({
    where: { email: "admin@someshwarsutar.com" },
    update: {},
    create: {
      name: "Super Admin",
      email: "admin@someshwarsutar.com",
      passwordHash,
      role: "ADMIN",
    },
  });

  console.log("Seeded admin user");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });