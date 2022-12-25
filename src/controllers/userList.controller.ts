import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import User from "../models/User";

export const searchInstructor = async(req: Request, res: Response) => {

  try {
    let regexp = new RegExp(`${req.query.name}`, 'i')
    console.log(regexp)
    const userlist = await User.paginate(
      {
        role: req.query.role || "faculty", 
        $or: [
          {first_name: regexp}, {last_name: regexp}
      ]}, 
      { page: parseInt(String(req.query.page)) || 1}
    );

    res.status(200).json(userlist);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
}

export const myInfo = async (req: Request, res: Response) => {

  try {
    const userlist = await User.findById(res.locals.user._id)
        .populate([{path: 'courses', populate: ['instrid', 'deptid']}, {path: 'dept_id'}]);

    res.status(200).json(userlist);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
}

export const updateMyInfo = async (req: Request, res: Response) => {

  const {
    first_name,
    last_name,
    email,
    street_address,
    date_of_birth,
    dept_id,
  } = req.body;

  console.log(req.body)

  try {
    const userlist = await User.findOneAndUpdate({_id: res.locals.user._id, dept_id: dept_id}, {
      first_name,
      last_name,
      email,
      street_address,
      date_of_birth,
    })

    res.status(204).json(userlist);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
}

export const listall = async (req: Request, res: Response) => {
  let query = {}
  req.query.role && (query = {role: req.query.role});

  try {
    const userlist = await User.paginate(
      query, 
      { 
        page: parseInt(String(req.query.page)) || 1, 
        populate: [{path: 'courses', populate: ['instrid', 'deptid']}, {path: 'dept_id'}]
      }
    );

    res.status(200).json(userlist);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
};

export const listone = async (req: Request, res: Response) => {
  const { _id } = req.body;

  try {
    const userDetail = await User.findById({ id: _id })
    .populate([{path: 'courses', populate: ['instrid', 'deptid']}, {path: 'dept_id'}]);

    res.status(200).json({ user: userDetail });
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
};

export const createUser = async (req: Request, res: Response) => {
  let {
    email,
    password,
    role,
    reg_no,
    first_name,
    last_name,
    street_address,
    date_of_birth,
    degree,
    sem,
    dept_id,
  } = req.body;

  sem = sem ?? 1;

  console.log(req.body)

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
      sem,
      dept_id,
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
    // role,
    // password,
    first_name,
    last_name,
    email,
    street_address,
    courses,
    // cgpa,
  } = req.body;

  try {
    const value = await User.findByIdAndUpdate(
      {
        _id: _id,
      },
      {
        // role: role,
        // password: password,
        first_name: first_name,
        last_name: last_name,
        email: email,
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

export const deleteUser = async (req: Request, res: Response) => {
  const { _id, dept_id } = req.body;

  try {
    const val = await User.findOneAndDelete({_id: req.params.id, dept_id: dept_id});

    res.status(201).json({ value: "deleted" });
  } catch (err) {
    console.log(err);
    // bad request status code
    res.status(400).json({ err });
  }
};
