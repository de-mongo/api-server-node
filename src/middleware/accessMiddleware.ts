import jwt from "jsonwebtoken";
import User from "../models/User";

const verifyUserRoleAccess = (
  req: any,
  res: any,
  next: any,
  role: any,
  errorMsg: any
) => {
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
          let user = await User.findById(tokenDecoded.id);
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
  verifyUserRoleAccess(req, res, next, ["admin", "faculty"], {
    error: "Access Denied. User not Admin or Librarian",
  });
};

export const isStudentOnly = (req: any, res: any, next: any) => {
  verifyUserRoleAccess(req, res, next, ["student"], {
    error: "Access Denied. User not Student",
  });
};

export const isStudentOrFaculty = (req: any, res: any, next: any) => {
  verifyUserRoleAccess(req, res, next, ["student", "faculty"], {
    error: "Access Denied. User not Student",
  });
};
