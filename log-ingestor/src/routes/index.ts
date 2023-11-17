import { Router, Request, Response } from "express";
const router = Router();

function debug(req: Request, res: Response) {
  switch (req.method) {
    case "GET":
      console.log(req.query);
      res.send(req.params);
      break;
    case "POST":
      res.send(req.body);
      break;
    default:
      res.send();
      break;
  }
}
/* ---------------------------------- POST ---------------------------------- */
router.post("/login", debug);

/* ---------------------------------- GET ----------------------------------- */
router.get("/login", debug);

const apiRoutes = router;
export default apiRoutes;
