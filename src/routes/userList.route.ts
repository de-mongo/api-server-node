import { Router } from "express";
import {
  listall,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userList.controller";
const router = Router();

router.get("/listall/", listall);
router.post("/createUser/", createUser);
router.post("/updateUser/", updateUser);
router.post("/deleteUser/", deleteUser);

export default router;
