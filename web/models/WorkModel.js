import mongoose, { Schema, connection } from "mongoose"

const userSchema = new Schema({
    title: {
        type: String,
        required: [true, "Please enter the title"],
        trim: true,
    },
    about: {
        type: String,
        required: [true, "Please enter your work detail"],
    },
    status: {
        type: String,
        default: "forSale",
    },
    price: {
        type: Number,
        required: [true, "Please enter product Price"],
        maxLength: [8, "Price cannot exceed 8 characters"],
    },
    deletedPrice: {
        type: Number,
        maxLength: [8, "Price cannot exceed 8 characters"],
    },
    image: {
        type: String,
        required: [true, "Image URL is neccessarily important"]
    },
    size: {
        type: String,
        required: [true, "Plese enter the image size"]
    },
    category: {
        type: String,
        required: [true, "Please enter work category"],
    },
    favorite: {
        type: Array
    }

}, { timestamps: true });

const Db = connection.useDb("MIB4u");
const Works = Db.models.Works || Db.model('Works', userSchema);
export default Works;