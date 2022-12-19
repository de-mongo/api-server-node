let _jwt = require("jsonwebtoken");
let _User = require("../models/User");

const verifyUserRoleAccess = (
  req: any,
  res: any,
  next: any,
  role: any,
  errorMsg: any
) => {
  const token = req.cookies.jwt;
  if (token) {
    _jwt.verify(token, "mysecret", async (err: any, tokenDecoded: any) => {
      if (err) {
        console.log(err.message);
        res.status(403).json({ loggedIn: false });
      } else {
        let user = await _User.findById(tokenDecoded.id);
        if (!role.includes(user.role)) {
          res.status(403).json(errorMsg);
        } else {
          console.log(tokenDecoded);
          next();
        }
      }
    });
  } else {
    console.log("stes");
    res.status(403).json({ loggedIn: false });
  }
};

module.exports.isAdmin = (req: any, res: any, next: any) => {
  verifyUserRoleAccess(req, res, next, ["admin"], {
    error: "Access Denied. User not Admin",
  });
};

module.exports.isLibrarian = (req: any, res: any, next: any) => {
  verifyUserRoleAccess(req, res, next, ["admin", "librarian"], {
    error: "Access Denied. User not Admin or Librarian",
  });
};

module.exports.isFaculty = (req: any, res: any, next: any) => {
  verifyUserRoleAccess(req, res, next, ["admin", "faculty"], {
    error: "Access Denied. User not Admin or Librarian",
  });
};

module.exports.isStudentOnly = (req: any, res: any, next: any) => {
  verifyUserRoleAccess(req, res, next, ["student"], {
    error: "Access Denied. User not Student",
  });
};
