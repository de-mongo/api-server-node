import { Request, Response } from "express";
import { Dept } from "../models/Dept";

export const listall = async (req: Request, res: Response) => {
  try {
    const deptlist = await Dept.find();

    res.status(201).json({ deptlist: deptlist });
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
};

export const listone = async (req: Request, res: Response) => {
  const { _id } = req.body;

  try {
    const deptDetail = await Dept.findById({ _id: _id });

    res.status(201).json({ dept: deptDetail });
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
};

export const createDept = async (req: Request, res: Response) => {
  const { dept_name } = req.body;

  try {
    const dept = await Dept.create({
      dept_name: dept_name,
    });

    // new resource created status code
    res.status(201).json({ id: dept._id, dept: dept.dept_name });
  } catch (err) {
    console.log(err);
    // bad request status code
    res.status(400).json({ err });
  }
};

export const updateDept = async (req: Request, res: Response) => {
  const { _id, dept_name } = req.body;

  try {
    const value = await Dept.findByIdAndUpdate(
      {
        _id: _id,
      },
      {
        dept_name: dept_name,
      }
    );

    res.status(201).json({ value: "updated" });
  } catch (err) {
    console.log(err);
    // bad request status code
    res.status(400).json({ err });
  }
};

export const deleteDept = async (req: Request, res: Response) => {
  const { _id } = req.body;

  try {
    const val = await Dept.findByIdAndDelete({ _id: _id });

    res.status(201).json({ value: "deleted" });
  } catch (err) {
    console.log(err);
    // bad request status code
    res.status(400).json({ err });
  }
};
