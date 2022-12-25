import { Router } from "express";
import {
  listall,
  listone,
  createUser,
  updateUser,
  deleteUser,
  searchInstructor,
  myInfo,
  updateMyInfo,
} from "../controllers/userList.controller";
import { checkUser } from "../middleware/authMiddleware";
import { isAdmin } from "../middleware/accessMiddleware";
const router = Router();

router.get("/listall/", checkUser, isAdmin, listall);
router.get("/me/", checkUser, myInfo);
router.put("/me/", checkUser, updateMyInfo);
router.get("/search-instructor/", checkUser, isAdmin, searchInstructor);
router.post("/listone/", checkUser, listone);
router.post("/createUser/", checkUser, isAdmin, createUser);
router.post("/updateUser/", checkUser, isAdmin, updateUser);
router.post("/deleteUser/", checkUser, isAdmin, deleteUser);

export default router;
