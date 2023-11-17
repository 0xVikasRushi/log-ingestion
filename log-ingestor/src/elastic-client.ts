import dotenv from "dotenv";
import { Client } from "@elastic/elasticsearch";

dotenv.config();

let elasticClientInstance: Client | null = null;

export function getElasticClient(): Client {
  if (!elasticClientInstance) {
    elasticClientInstance = new Client({
      cloud: {
        id: process.env.ELASTIC_CLOUD_ID,
      },
      auth: {
        username: process.env.ELASTIC_USERNAME,
        password: process.env.ELASTIC_PASSWORD,
      },
    });
  }

  return elasticClientInstance;
}

// ? using singleton pattern to create a single instance of elastic client
getElasticClient();

export default elasticClientInstance;
