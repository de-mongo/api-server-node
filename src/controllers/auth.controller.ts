import User from "../models/User";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { AdminUser } from "../models/Admin";

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
  let {
      email,
      password,
      role,
      reg_no,
      first_name,
      sem,
      last_name,
      street_address,
      date_of_birth,
      degree,
  } = req.body; // TODO: Extend the inputs being taken in the body

  sem = sem ?? 1;
  try {
    const user = await User.create({
      email,
      password,
      role,
      reg_no,
      first_name,
      last_name,
      street_address,
      date_of_birth,
      degree,
    });
    const token = createToken({ id: user._id });

    // maxAge is in milliseconds
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
      // secure: true,
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

export const adminLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await AdminUser.login(email, password);
    const token = createToken({ id: user._id });
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
      // secure: true,
    });
    res.cookie("user", `${user.first_name}-${user.role}`, {
      maxAge: maxAge * 1000,
      // secure: true,
    });
    res.status(200).json({ user: user._id, jwt: token });
  } catch (err) {
    const errors = handleErrors(err);
    // bad request status code
    console.log(req.body);
    console.log(err);
    res.status(400).json({ errors });
  }
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    console.log("test")
    const user = await User.login(email, password);
    const token = createToken({ id: user._id });
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
      // secure: true,
    });
    res.cookie("user", `${user.first_name}-${user.role}`, {
      maxAge: maxAge * 1000,
      // secure: true,
    });
    res.status(200).json({ user: user._id, jwt: token });
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
