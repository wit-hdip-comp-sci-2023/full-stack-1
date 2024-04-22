import * as dotenv from "dotenv";
import Mongoose from "mongoose";
// @ts-ignore
import * as mongooseSeeder from "mais-mongoose-seeder";
import { userStore } from "./user-store.js";
import { seedData } from "./seed-data.js";
import { donationStore } from "./donation-store.js";
import { candidateStore } from "./candidate-store.js";
import { Db } from "../../types/donation-types.js";

const seedLib = mongooseSeeder.default;

async function seed() {
  const seeder = seedLib(Mongoose);
  const dbData = await seeder.seed(seedData, { dropDatabase: false, dropCollections: true });
  console.log(dbData);
}

export function connectMongo(db: Db) {
  dotenv.config();

  Mongoose.set("strictQuery", true);
  Mongoose.connect(process.env.db as string);
  const mongoDb = Mongoose.connection;

  db.userStore = userStore;
  db.candidateStore = candidateStore;
  db.donationStore = donationStore;

  mongoDb.on("error", (err) => {
    console.log(`database connection error: ${err}`);
  });

  mongoDb.on("disconnected", () => {
    console.log("database disconnected");
  });

  mongoDb.once("open", function () {
    console.log(`database connected to ${mongoDb.name} on ${mongoDb.host}`);
    seed();
  });
}
