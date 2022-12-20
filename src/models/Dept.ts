import {Schema, model, Types, PaginateModel} from 'mongoose';
import paginate from 'mongoose-paginate-v2';

interface IDept {
    name: string,
}

const deptSchema = new Schema<IDept>({
    name: {
        type: String,
        required: true,
    }
})

deptSchema.plugin(paginate);
const Dept = model<IDept, PaginateModel<IDept>>('dept', deptSchema);

export { Dept };
export type {IDept};