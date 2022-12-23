import {Router} from 'express';

import {
    getMyCourse,
    getAllCourses,
    createCourse,
    deleteCourse,
    updateCourse,
    enrollCourse,
    getCourse,
} from '../controllers/course.controller';
import { checkAdmin, checkUser } from '../middleware/authMiddleware';
import { hasUserAccessToCourse, isFaculty, isStudentOnly, isStudentOrFaculty } from '../middleware/accessMiddleware';

const router = Router()

router.get('/courses/me', checkUser, isStudentOrFaculty, getMyCourse)
router.get('/courses', checkUser, isStudentOrFaculty, getAllCourses)
router.get('/course/:id', checkUser, isFaculty, getCourse)
router.post('/courses/new', checkUser, isFaculty, createCourse)
router.put('/courses/:id', checkUser, isFaculty, hasUserAccessToCourse, updateCourse)
router.delete('/courses/:id', checkUser, isFaculty, hasUserAccessToCourse, deleteCourse)

router.post('/courses/enroll', checkUser, isStudentOnly, enrollCourse)

export default router;