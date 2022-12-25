import { Schema, PaginateModel, model, Types, Model } from "mongoose";
import isEmail from "validator/lib/isEmail";
import bcrypt from "bcrypt";
import paginate from "mongoose-paginate-v2";

interface IUser extends Document {
  email: string;
  password: string;
  role?: string;
  reg_no: string;
  first_name?: string;
  last_name?: string;
  street_address?: string;
  date_of_birth?: Date;
  degree: string;
  courses: Array<Types.ObjectId>;
  dept_id: Types.ObjectId;
  cgpa?: Number;
  profile_pic?: string;
  sem?: Number;
}

interface UserModel extends PaginateModel<IUser> {
  login(email: string, password: string): any;
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, "Enter a Valid Email"],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
  dept_id: {
    type: Schema.Types.ObjectId,
    ref: 'dept',
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "staff", "faculty", "student"],
  },
  reg_no: {
    type: String,
    required: true,
    unique: true
  },
  first_name: {
    type: String,
    // required: true,
  },
  last_name: {
    type: String,
    // required: true,
  },
  street_address: {
    type: String,
    // required: true,
  },
  date_of_birth: {
    type: Date,
    //required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  courses: [{
    type: Schema.Types.ObjectId,
    ref: 'Course',
  }],
  cgpa: {
    type: Number,
    // required : true
  },
  profile_pic: {
    type: String,
    //required: true,
  },
  sem: {
    type: Number
  }
});

// encrypt the password before saving it to the database
userSchema.pre("save", async function (next) {
  const saltKey = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, saltKey);
  next();
});

// operation to be performed when user login
userSchema.static("login", async function login(email, password) {
  const user: any = await this.findOne({ email }).select("+password");

  if (user) {
    const comparePass = await bcrypt.compare(password, user.password);

    if (comparePass) return user;
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
});

userSchema.plugin(paginate);

const User = model<IUser, UserModel>("User", userSchema);

export default User;
