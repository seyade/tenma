import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";
import path from "path";

const prisma = new PrismaClient();

createDataSeed();

async function main() {
  await clearDatabase();
  await createUsers();
  await createClients();
  await createProjects();
  await createCrafts();

  console.log("Seed database successful");
}

async function clearDatabase() {
  await prisma.user.deleteMany();
  await prisma.client.deleteMany();
  await prisma.project.deleteMany();
  await prisma.craft.deleteMany();
}

async function createDataSeed() {
  const userJsonFile = path
    .join(__dirname + "/seedData/user.json")
    .match(/[^\\/]+$/)?.[0];
  const projectJsonFile = path
    .join(__dirname + "/seedData/project.json")
    .match(/[^\\/]+$/)?.[0];
  const clientJsonFile = path
    .join(__dirname + "/seedData/client.json")
    .match(/[^\\/]+$/)?.[0];
  const craftJsonFile = path
    .join(__dirname + "/seedData/craft.json")
    .match(/[^\\/]+$/)?.[0];

  const jsonDataFiles = [
    userJsonFile,
    projectJsonFile,
    clientJsonFile,
    craftJsonFile,
  ] as string[];

  for (const jsonFile of jsonDataFiles) {
    const filePath = path.join(`${__dirname}/seedData/${jsonFile}`);
    const data = JSON.parse(readFileSync(filePath, "utf-8"));

    const fileName = path.basename(jsonFile, path.extname(jsonFile));

    console.log("DATA:A::", fileName);

    const dbModel: any = prisma[fileName as keyof typeof prisma];

    // await prisma.user.create({ data });
    for (const d of data) {
      await dbModel.create({ data: d });
    }
  }

  console.log("Data created and seeded");
}

async function createUsers() {
  const filePath = path.join(__dirname + "/seedData/user.json");
  const jsonData = JSON.parse(readFileSync(filePath, "utf-8"));

  const createdUser = await prisma.user.create({
    data: jsonData,
  });

  console.log("Users data created");
}

async function createClients() {}

async function createProjects() {}

async function createCrafts() {}
