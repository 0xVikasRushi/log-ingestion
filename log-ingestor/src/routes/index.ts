import { Router, Request, Response } from "express";
import { saveLogs, getLogs } from "../controller/logs.controller";
const router = Router();

/* ---------------------------------- POST ---------------------------------- */
router.post("/logs", saveLogs);

/* ---------------------------------- GET ----------------------------------- */
router.get("/logs", getLogs);

const apiRoutes = router;
export default apiRoutes;
