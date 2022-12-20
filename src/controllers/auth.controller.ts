import User from "../models/User";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

function handleErrors(err: any) {
  let errors = { email: "", password: "", summary: "" };

  if (err.code === 1100) {
    errors.email = errors.summary = "The email already exists";
    return errors;
  }

  if (err.message === "incorrect email") errors.email = "Email is not existing";

  if (err.message === "incorrect password")
    errors.email = "Password is incorrect";

  errors.summary = "invalid email or password wrong";
}

const maxAge = 3 * 24 * 60 * 60; // 3days

function createToken({ id }: { id: any }): string {
  return jwt.sign({ id }, process.env.JWTTOKEN || "mysecret", {
    expiresIn: maxAge,
  });
}

export const signup = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body; // TODO: Extend the inputs being taken in the body

  try {
    const user = await User.create({ name, email, password, role });
    const token = createToken({ id: user._id });

    // maxAge is in milliseconds
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
      secure: true,
    });

    // new resource created status code
    res.status(201).json({ user: user._id });
  } catch (err) {
    console.log(err);
    let errors = handleErrors(err);
    // bad request status code
    res.status(400).json({ errors });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken({ id: user._id });
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
      secure: true,
    });
    res.cookie("user", `${user.name}-${user.role}`, {
      maxAge: maxAge * 1000,
      secure: true,
    });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    // bad request status code
    console.log(req.body);
    console.log(err);
    res.status(400).json({ errors });
  }
};

export const logout = (_: Request, res: Response) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.cookie("user", "", { maxAge: 1 });
  res.status(200).json({ loggedOut: true });
};
