import "dotenv/config";
import { PrismaClient } from "./src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

console.log(
  "Runtime models:",
  Object.keys((prisma as any)._runtimeDataModel.models)
);
console.log("Team delegate:", typeof (prisma as any).team);
console.log("User delegate:", typeof (prisma as any).user);

prisma.$disconnect();