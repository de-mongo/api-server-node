import { Schema, model, Types, PaginateModel } from "mongoose";
import paginate from "mongoose-paginate-v2";
import { type } from "os";

interface IFace {
  image: string;
}

const faceSchema = new Schema<IFace>({
  image: {
    type: String,
    required: true,
  },
});

faceSchema.plugin(paginate);
const Face = model<IFace, PaginateModel<IFace>>("images", faceSchema);

export { Face };
export type { IFace };
