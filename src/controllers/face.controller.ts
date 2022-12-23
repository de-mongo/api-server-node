import axios from "axios";
import { Request, Response } from "express";
import { Face } from "../models/Faces";

export const listone = async (req: Request, res: Response) => {
  const { _id } = req.body;

  try {
    const imageDetail = await Face.findById({ _id: _id });

    res.status(201).json({ imageDetail: imageDetail });
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
};

export const createFace = async (req: Request, res: Response) => {
  const { image } = req.body;

  try {
    const face = await Face.create({
      image: image,
    });

    // new resource created status code
    res.status(201).json({ id: face._id });
  } catch (err) {
    console.log(err);
    // bad request status code
    res.status(400).json({ err });
  }
};

export const deleteFace = async (req: Request, res: Response) => {
  const { _id } = req.body;

  try {
    const val = await Face.findByIdAndDelete({ _id: _id });

    res.status(201).json({ value: "deleted" });
  } catch (err) {
    console.log(err);
    // bad request status code
    res.status(400).json({ err });
  }
};

export const matchOne = async (req: Request, res: Response) => {
  const { _id, image } = req.body;

  try {
    const old_image = await Face.findById({ _id: _id });

    var body = { image: image, image_db: old_image?.image };

    var response = await axios.post(
      "http://65.0.199.223:31112/function/face-recog",
      body
    );

    console.log(response.data);
    //res.status(200).json(body);
    res.status(200).json(response.data);
  } catch (err) {
    console.log(err);
    // bad request status code
    res.status(400).json({ err });
  }
};
