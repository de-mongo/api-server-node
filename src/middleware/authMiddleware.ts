import jwt from "jsonwebtoken";
import User from "../models/User";

export const requireAuth = (req: any, res: any, next: any) => {
  const token = req.cookies.jwt;
  console.log(req);
  if (token) {
    jwt.verify(
      token,
      process.env.JWTTOKEN || "mysecret",
      (err: any, tokenDecoded: any) => {
        if (err) {
          console.log(err.message);
          res.status(403).json({ loggedIn: false });
        } else {
          console.log(tokenDecoded);
          next();
        }
      }
    );
  } else {
    console.log("asdfasd");
    res.status(403).json({ loggedIn: false });
  }
};

export const checkUser = (req: any, res: any, next: any) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, "mysecret", async (err: any, tokenDecoded: any) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(tokenDecoded.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};
