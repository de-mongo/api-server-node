import {Router} from 'express';

import {
    getMyCourse,
    getAllCourses,
    createCourse,
    deleteCourse,
    updateCourse,
} from '../controllers/course.controller';
import { checkUser } from '../middleware/authMiddleware';

const router = Router()

router.get('/courses/me', checkUser, getMyCourse)
router.get('/courses', checkUser, getAllCourses)
router.post('/courses/new', checkUser, createCourse)
router.put('/courses/:id', checkUser, updateCourse)
router.delete('/courses/:id', checkUser, deleteCourse)

export default router;