import { Schema, model, Types, PaginateModel } from "mongoose";
import paginate from "mongoose-paginate-v2";
import bcrypt from "bcrypt";

interface IAdminUser {
  first_name: string;
  last_name?: string;
  email: string;
  password: string;
  date_of_birth: Date;
  role: string;
}

interface AdminUserModel extends PaginateModel<IAdminUser> {
  login(email: string, password: string): any;
}
const adminUserSchema = new Schema<IAdminUser, AdminUserModel>({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  date_of_birth: {
    type: Date,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin"],
    required: true,
  },
});

adminUserSchema.pre("save", async function (next) {
  const saltKey = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, saltKey);
  next();
});

// operation to be performed when user login
adminUserSchema.static("login", async function login(email, password) {
  const user = await this.findOne({ email }).select("+password");

  if (user) {
    const comparePass = await bcrypt.compare(password, user.password);

    if (comparePass) return user;
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
});

adminUserSchema.plugin(paginate);
const AdminUser = model<IAdminUser, AdminUserModel>("AdminUser", adminUserSchema);

export { AdminUser };
export type { IAdminUser };