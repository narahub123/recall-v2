import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in environment variables");
}

const options = {};

let client: MongoClient;

let clientPromise: Promise<MongoClient>;

const globalForMongo = global as typeof globalThis & {
  mongoClientPromise?: Promise<MongoClient>;
};

if (process.env.NODE_ENV === "development") {
  if (!globalForMongo.mongoClientPromise) {
    client = new MongoClient(MONGODB_URI, options);

    globalForMongo.mongoClientPromise = client.connect();
  }

  clientPromise = globalForMongo.mongoClientPromise;
} else {
  client = new MongoClient(MONGODB_URI, options);

  clientPromise = client.connect();
}

export default clientPromise;
