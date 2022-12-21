import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import User from "../models/User";

export const listall = async (req: Request, res: Response) => {
  try {
    const userlist = await User.find();

    res.status(201).json({ user: userlist });
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
};

export const listone = async (req: Request, res: Response) => {
  const { _id } = req.body;

  try {
    const userDetail = await User.findById({ id: _id });

    res.status(201).json({ user: userDetail });
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const {
    name,
    email,
    password,
    role,
    reg_no,
    first_name,
    last_name,
    street_address,
    date_of_birth,
    degree,
    courses,
    cgpa,
    profile_pic,
  } = req.body;

  try {
    const user = await User.create({
      name,
      email,
      password,
      role,
      reg_no,
      first_name,
      last_name,
      street_address,
      date_of_birth,
      degree,
      courses,
      cgpa,
      profile_pic,
    });

    // new resource created status code
    res.status(201).json({ user: user._id });
  } catch (err) {
    console.log(err);
    // bad request status code
    res.status(400).json({ err });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const {
    _id,
    name,
    role,
    password,
    first_name,
    last_name,
    street_address,
    courses,
    cgpa,
  } = req.body;

  try {
    const value = await User.findByIdAndUpdate(
      {
        _id: _id,
      },
      {
        name: name,
        role: role,
        password: password,
        first_name: first_name,
        last_name: last_name,
        street_address: street_address,
        courses: courses,
        cgpa: cgpa,
      }
    );

    res.status(201).json({ value: "updated" });
  } catch (err) {
    console.log(err);
    // bad request status code
    res.status(400).json({ err });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { _id } = req.body;

  try {
    const val = await User.findByIdAndDelete({ _id: _id });

    res.status(201).json({ value: "deleted" });
  } catch (err) {
    console.log(err);
    // bad request status code
    res.status(400).json({ err });
  }
};
