import jwt from "jsonwebtoken";
import User from "../models/User";
import { AdminUser } from "../models/Admin";
import { Course } from "../models/Course";

const verifyUserRoleAccess = (
  req: any,
  res: any,
  next: any,
  role: any,
  errorMsg: any
) => {
  if (role.includes(res.locals.user.role)) {
    next();
    return;
  }
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(
      token,
      process.env.JWTTOKEN || "mysecret",
      async (err: any, tokenDecoded: any) => {
        if (err) {
          console.log(err.message);
          res.status(403).json({ loggedIn: false });
        } else {
          let user, userAdmin;
          if (role.includes("admin")) {
            userAdmin = await AdminUser.findById(tokenDecoded.id);
          } else {
            user = await User.findById(tokenDecoded.id);
          }
          if (!role.includes(user?.role)) {
            res.status(403).json(errorMsg);
          } else {
            console.log(tokenDecoded);
            next();
          }
        }
      }
    );
  } else {
    res.status(403).json({ loggedIn: false });
  }
};

export const isAdmin = (req: any, res: any, next: any) => {
  verifyUserRoleAccess(req, res, next, ["admin"], {
    error: "Access Denied. User not Admin",
  });
};

export const isFaculty = (req: any, res: any, next: any) => {
  console.log(res.locals.user)
  verifyUserRoleAccess(req, res, next, ["admin", "faculty"], {
    error: "Access Denied. User not Admin or Librarian",
  });
};

export const isStudentOnly = (req: any, res: any, next: any) => {
  verifyUserRoleAccess(req, res, next, ["student", "admin"], {
    error: "Access Denied. User not Student",
  });
};

export const isStudentOrFaculty = (req: any, res: any, next: any) => {
  verifyUserRoleAccess(req, res, next, ["student", "faculty", "admin"], {
    error: "Access Denied. User not Student",
  });
};

export const hasUserAccessToCourse = async (req: any, res: any, next: any) => {
  let course = await Course.findById(req.params.id);
  if (res.locals.user.role == "admin") {
    next();
  } else if (res.locals.user.role == "faculty") {
    if (res.locals.user._id == course?.instrid) {
      next();
    }
  }
}