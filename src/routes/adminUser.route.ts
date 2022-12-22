import {Router} from 'express';
import { listOneUser, updateUserByAdmin } from '../controllers/adminUser.controller';
import { createUser, deleteUser, listall } from '../controllers/userList.controller';
import { adminLogin } from '../controllers/auth.controller';
// import {signup, login, logout} from '../controllers/auth.controller';
const router = Router();

// Users
router.post("/auth/login", adminLogin);

router.post("/user/new", createUser);
router.get("/users/", listall);
router.get("/user/:id", listOneUser);
router.put("/user/:id", updateUserByAdmin);
router.delete("/user/:id", deleteUser);

// router.post("/login/", login);
// router.get("/logout/", logout);

export default router;

