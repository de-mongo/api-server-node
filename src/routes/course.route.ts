import {Router} from 'express';

import {
    getMyCourse,
    getAllCourses,
    createCourse,
    deleteCourse,
    updateCourse,
    enrollCourse,
} from '../controllers/course.controller';
import { checkUser } from '../middleware/authMiddleware';
import { isFaculty, isStudentOnly, isStudentOrFaculty } from '../middleware/accessMiddleware';

const router = Router()

router.get('/courses/me', checkUser, isStudentOrFaculty, getMyCourse)
router.get('/courses', checkUser, isStudentOrFaculty, getAllCourses)
router.post('/courses/new', checkUser, isFaculty, createCourse)
router.put('/courses/:id', checkUser, isFaculty, updateCourse)
router.delete('/courses/:id', checkUser, isFaculty, deleteCourse)

router.post('/courses/enroll', checkUser, isStudentOnly, enrollCourse)

export default router;