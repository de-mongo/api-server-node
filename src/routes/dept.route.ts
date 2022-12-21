import { Router } from "express";
import {
  listall,
  listone,
  createDept,
  updateDept,
  deleteDept,
} from "../controllers/dept.controller";
const router = Router();

router.get("/listall/", listall);
router.post("/listone/", listone);
router.post("/createDept/", createDept);
router.post("/updateDept/", updateDept);
router.post("/deleteDept/", deleteDept);

export default router;
