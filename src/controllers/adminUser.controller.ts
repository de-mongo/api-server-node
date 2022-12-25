import { Request, Response } from "express";
import User from "../models/User";

export const updateUserByAdmin = async (req: Request, res: Response) => {
  const {
    dept_id,
    role,
    password,
    first_name,
    last_name,
    street_address,
    courses,
    // cgpa,
  } = req.body;

  try {
    const value = await User.findByIdAndUpdate(
      {
        _id: req.params.id,
        dept_id: dept_id,
      },
      {
        role: role,
        password: password,
        first_name: first_name,
        last_name: last_name,
        street_address: street_address,
        courses: courses,
        // cgpa: cgpa,
      }
    );

    res.status(201).json({ value: "updated" });
  } catch (err) {
    console.log(err);
    // bad request status code
    res.status(400).json({ err });
  }
};

export const listOneUser = async (req: Request, res: Response) => {

  try {
    const userDetail = await User.findById(req.params.id).populate([{path: 'courses', populate: ['instrid', 'deptid']}, {path: 'dept_id'}]);

    res.status(201).json(userDetail);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
};
