import app from "./app";
import dotenv from "dotenv";
import { MongoClientHelper } from "./helper/mongoClient.helper";

dotenv.config();

const mongoURL = `mongodb+srv://${process.env.REST_DB_USER}:${process.env.REST_DB_PASS}@${process.env.REST_HOST}/${process.env.REST_DB_NAME}?${process.env.REST_HOST_ACCESS}`;
new MongoClientHelper(process.env.PORT, mongoURL, app).mongoClient();