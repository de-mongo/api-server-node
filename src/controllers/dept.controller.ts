import { Request, Response } from "express";
import { Dept } from "../models/Dept";

export const searchDept = async(req: Request, res: Response) => {

  try {
    let regexp = new RegExp(`${req.query.name}`, 'i')
    console.log(regexp)
    const deptList = await Dept.paginate(
      {
        name: regexp
      }, 
      { page: parseInt(String(req.query.page)) || 1}
    );

    res.status(200).json(deptList);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
}
export const listall = async (req: Request, res: Response) => {
  try {
    const deptList = await Dept.paginate(
      {}, 
      { page: parseInt(String(req.query.page)) || 1}
    );

    res.status(201).json(deptList);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
};

export const listone = async (req: Request, res: Response) => {
  const { _id } = req.body;

  try {
    const deptDetail = await Dept.findById({ _id: _id });

    res.status(201).json(deptDetail);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
};

export const createDept = async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    const dept = await Dept.create({
      name: name,
    });

    // new resource created status code
    res.status(201).json({ id: dept._id, dept: dept.name });
  } catch (err) {
    console.log(err);
    // bad request status code
    res.status(400).json({ err });
  }
};

export const updateDept = async (req: Request, res: Response) => {
  const { _id, name } = req.body;

  try {
    const value = await Dept.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      {
        name: name,
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
    const val = await Dept.findByIdAndDelete(req.params.id);

    res.status(201).json({ value: "deleted" });
  } catch (err) {
    console.log(err);
    // bad request status code
    res.status(400).json({ err });
  }
};
