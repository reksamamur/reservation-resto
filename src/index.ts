import app from "./app";
import dotenv from "dotenv";
import { MongoClientHelper } from "./helper/mongoClient.helper";

dotenv.config();

let mongoURL = `mongodb+srv://${process.env.REST_DB_USER}:${process.env.REST_DB_PASS}@${process.env.REST_HOST}/${process.env.REST_HOST_ACCESS}?${process.env.REST_HOST_ACCESS}`;

let mongoClientHelper = new MongoClientHelper(process.env.PORT, mongoURL, app);

mongoClientHelper.mongoClient()