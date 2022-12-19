import {Schema, model, Types, PaginateModel} from 'mongoose';
import paginate from 'mongoose-paginate-v2';

interface ICourse {
    deptid: Types.ObjectId,
    instrid: Types.ObjectId,
    name: string,
}

const courseSchema = new Schema<ICourse>({
    deptid: {
        type: Schema.Types.ObjectId,
        ref: 'Dept',
        required: true,
    },
    instrid: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
})

courseSchema.plugin(paginate);
const Course = model<ICourse, PaginateModel<ICourse>>('course', courseSchema);

export default Course;