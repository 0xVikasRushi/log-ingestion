import dotenv from "dotenv";
dotenv.config();
import { Client } from "@elastic/elasticsearch";

// ? create a client instance
const client = new Client({
  cloud: {
    id: process.env.ELASTIC_CLOUD_ID,
  },
  auth: {
    username: process.env.ELASTIC_USERNAME,
    password: process.env.ELASTIC_PASSWORD,
  },
});

export default client;
