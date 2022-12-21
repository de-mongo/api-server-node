import {Schema, model, Types, PaginateModel} from 'mongoose';
import paginate from 'mongoose-paginate-v2';

interface TakenBy {
    course: string,
    sem: number
}

interface ICourse {
    deptid: Types.ObjectId,
    instrid: Types.ObjectId,
    name: string,
    taken_by: Array<TakenBy>
}

const courseSchema = new Schema<ICourse>({
    deptid: {
        type: Schema.Types.ObjectId,
        ref: 'dept',
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
        unique: true,
    },
    taken_by: {
        type: [Object]
    }
})

courseSchema.plugin(paginate);
const Course = model<ICourse, PaginateModel<ICourse>>('Course', courseSchema);

export { Course };
export type {ICourse};