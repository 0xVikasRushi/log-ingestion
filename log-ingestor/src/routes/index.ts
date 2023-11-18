import { Router } from "express";
import {
  getLogs,
  getfullSearch,
  saveLogs,
} from "../controller/logs.controller";
const router = Router();

/* ---------------------------------- POST ---------------------------------- */
router.post("/logs", saveLogs);

/* ---------------------------------- GET ----------------------------------- */
router.get("/logs", getLogs);
router.get("/logs/:query", getfullSearch);

const apiRoutes = router;
export default apiRoutes;
