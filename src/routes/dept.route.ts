import { Router } from "express";
import {
  listall,
  listone,
  createDept,
  updateDept,
  deleteDept,
  searchDept,
} from "../controllers/dept.controller";
import { checkUser } from "../middleware/authMiddleware";
import { isAdmin } from "../middleware/accessMiddleware";
const router = Router();

router.get("/listall/", listall);
router.get("/search/", searchDept);
router.post("/listone/", listone);
router.post("/createDept/", checkUser, isAdmin, createDept);
router.put("/:id", checkUser, isAdmin, updateDept);
router.delete("/:id", checkUser, isAdmin, deleteDept);

export default router;
