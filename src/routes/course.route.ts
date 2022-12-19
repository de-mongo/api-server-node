import {Router} from 'express';

import {
    getMyCourse
} from '../controllers/course.controller';

const router = Router()

router.get('/course/me', getMyCourse)