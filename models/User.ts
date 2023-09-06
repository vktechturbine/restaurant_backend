
import mongoose, { Document, Schema ,Model} from "mongoose";


interface IUser extends Document {
    email: string;
    password: string;
    name: string;
    lastName?: string; // lastName is optional
  }
const userSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        default: "lastname"
    },
})

const UserModel = mongoose.model<IUser>("User", userSchema);
// export const UserModel: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export  {IUser,UserModel};