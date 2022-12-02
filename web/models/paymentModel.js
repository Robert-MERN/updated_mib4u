import mongoose, { Schema, connection } from "mongoose"


const PaymentSchema = new Schema({
    phoneNo: {
        type: String,
        required: [true, "Please enter the phoneNo"],
    },

    zipCode: {
        type: String,
        required: [true, "Please enter the zipCode"],
    },
    houseNo: {
        type: String,
        required: [true, "Please enter the houseNo"],
    },
    street: {
        type: String,
        required: [true, "Please enter the street"],
    },
    city: {
        type: String,
        required: [true, "Please enter the city"],
    },
    country: {
        type: String,
        required: [true, "Please enter the country"],
    },
    workId: {
        type: String,
        required: [true, "Please enter the workId"],
    },
    userId: {
        type: String,
        required: [true, "Please enter the productId"],
    },
    price: {
        type: Number,
        required: [true, "Please enter the price"],
    },

},
    { timestamps: true }
);

const Db = connection.useDb("MIB4u")
const PaymentModel = Db.models.Payments || Db.model("Payments", PaymentSchema);
export default PaymentModel;