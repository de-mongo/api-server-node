import { Router } from "express";
import {
  createFace,
  deleteFace,
  listone,
  matchOne,
} from "../controllers/face.controller";

const router = Router();

router.post("/findOne/", listone);
router.post("/createOne/", createFace);
router.post("/matchOne/", matchOne);
router.get("/deleteOne/", deleteFace);

export default router;
