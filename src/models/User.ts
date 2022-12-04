import {Schema, Model, model} from 'mongoose';
import isEmail from 'validator/lib/isEmail';
import bcrypt from 'bcrypt';
import mongoosePaginate from 'mongoose-paginate-v2';

interface IUser {
    name?: string,
    email: string,
    password: string,
    role?: string,
}

interface UserModel extends Model<IUser> {
    login(email:string, password:string): any;
}

const userSchema = new Schema<IUser, UserModel>({
    name: {
        type: String,
        // required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [isEmail, 'Enter a Valid Email']
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    role: {
        type: String,
        enum: [
            'admin',
            'staff',
            'faculty',
            'student',
        ]
    },
})

// encrypt the password before saving it to the database
userSchema.pre('save', async function(next) {
    const saltKey = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, saltKey);
    next();
})

// operation to be performed when user login
userSchema.static('login', async function login(email, password) {
    const user = await this.findOne({email});

    if (user) {
        const comparePass = await bcrypt.compare(password, user.password);

        if (comparePass) return user;
            throw Error('incorrect password');
    }
    throw Error('incorrect email');
})

userSchema.plugin(mongoosePaginate);
const User = model<IUser, UserModel>('user', userSchema);

export default User;
