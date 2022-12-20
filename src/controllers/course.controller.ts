import {Request, Response} from 'express';
import {Course, ICourse} from '../models/Course';
import User from '../models/User';
import { Types } from 'mongoose';

export const getAllCourses = async (req: Request, res: Response) => {
    switch (res.locals.user.role) {
        case "student":
        case "faculty":
            const courses = await Course.paginate({}, {page: parseInt(String(req.query.page)) })
            res.json(courses)
            break;
        default:
            res.sendStatus(400).json({errors: "Access Denied"})
            break;
    }
    // res.json(res.locals.user.role)
}

export const getMyCourse = async (req: Request, res: Response) => {
    switch (res.locals.user.role) {
        case "student":
            const courses = await User.findById(res.locals.user._id).populate('courses');
            console.log(courses);
            break;
        case "faculty":
            console.log("test")
            try {
                const courses = await Course.paginate({instrid: res.locals.user._id})
                res.json(courses);
            } catch (err) {
                res.status(400).json({error: "Failed to retrieve your courses"})
            }
            break;
        default:
            res.sendStatus(400).json({errors: "Access Denied"})
            break;
    }
    // console.log(res.locals)
    // res.json(res.locals)
}

export const createCourse = async (req: Request, res: Response) => {
    const {deptid, instrid, name, taken_by} = req.body;
    let course: ICourse = {
        deptid: new Types.ObjectId,
        instrid: new Types.ObjectId,
        name: '',
        taken_by: [],
    };

    course.deptid = deptid;
    course.name = name;
    course.taken_by = taken_by;

    if (instrid) {
        course.instrid = instrid
    } else {
        course.instrid = res.locals.user._id
    }

    try {
        const newCourse = await Course.create(course);
        res.status(201).json({status: "new course created", newCourse})

    } catch (err) {
        res.status(400).json({error: "Unable to create new course"})
    }
}

export const updateCourse = (req: Request, res: Response) => {
    try {

    } catch (err) {

    }
}

export const deleteCourse = async (req: Request, res: Response) => {
    try {
        let course = await Course.findByIdAndDelete(req.params.id)
        res.status(201).json(course)
    } catch (err) {
        res.status(400).json({error: "Unable to delete course"})
    }
}

export const enrollCourse = async(req: Request, res:Response) => {
    const {courseId} = req.body;

    try {
        await User.findByIdAndUpdate(res.locals.user._id, { $push: {courses: courseId}})
    } catch (err) {
        res.status(400).json({error: "Unable to delete course"})
    }
}