import mongoose, { Schema, connection } from "mongoose"

const userSchema = new Schema({
    fullName: {
        type: String,
        required: [true, "Please Enter Your Name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name should have more than 4 characters"],
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
    },
    password: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    googleAuth: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Db = connection.useDb("MIB4u")
const Users = Db.models.Users || Db.model('Users', userSchema);
export default Users