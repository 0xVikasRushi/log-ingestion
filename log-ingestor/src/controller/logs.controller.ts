import { Request, Response } from "express";
import { Log } from "../types/log";
import elasticClientInstance from "../elastic-client";

const saveLogs = async (req: Request, res: Response) => {
  try {
    const log: Log = req.body;
    if (!log) {
      res.status(400).send({ message: "Invalid log" });
      return;
    }
    const result = await elasticClientInstance.index({
      // ? maybe change this to log.level might help in scale lets see
      index: "logs",
      document: log,
    });

    res.send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// ? full search replace q with query

const getLogs = async (req: Request, res: Response) => {
  try {
    const result = await elasticClientInstance.search({
      index: "logs",
    });
    res.json(result.hits.hits.map((hit) => hit._source));
  } catch (error) {
    console.error("Error fetching logs:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getfullSearch = async (req: Request, res: Response) => {
  try {
    const { query } = req.params;

    const result = await elasticClientInstance.search({
      index: "logs",
      q: query,
    });
    res.send(result.hits.hits.map((hit) => hit._source));
  } catch (error) {
    res.status(500).json({ error: "Failed to get full search" });
  }
};

export { saveLogs, getLogs, getfullSearch };
