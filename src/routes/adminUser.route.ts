import {Router} from 'express';
import { listOneUser, updateUserByAdmin } from '../controllers/adminUser.controller';
import { createUser, deleteUser, listall } from '../controllers/userList.controller';
import { adminLogin } from '../controllers/auth.controller';
import { checkUser, requireAuth } from '../middleware/authMiddleware';
import { isAdmin } from '../middleware/accessMiddleware';
// import {signup, login, logout} from '../controllers/auth.controller';
const router = Router();

// Users
router.post("/auth/login", adminLogin);
router.post("/user/new", requireAuth, checkUser, isAdmin, createUser);
router.get("/users/", requireAuth, checkUser, isAdmin, listall);
router.get("/user/:id", requireAuth, checkUser, isAdmin, listOneUser);
router.put("/user/:id", requireAuth, checkUser, isAdmin, updateUserByAdmin);
router.delete("/user/:id", requireAuth, checkUser, isAdmin, deleteUser);

// router.post("/login/", login);
// router.get("/logout/", logout);

export default router;

