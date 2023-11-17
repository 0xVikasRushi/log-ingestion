import cors from "cors";
import express from "express";
import apiRoutes from "./routes";

const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello from Log ingestor");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.use("/api/", apiRoutes);
