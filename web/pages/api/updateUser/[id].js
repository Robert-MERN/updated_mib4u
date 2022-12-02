import connectMongo from "../../../utils/connectMongo";
import UserModel from "../../../models/userModel";
import CryptoJS from "crypto-js";

/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */

export default async function registerUser(req, res) {
    console.log("Connecting with DB")
    try {
        await connectMongo();
        console.log("Successfuly conneted with DB");
        var objForUpdate = {};
        if (req.body.fullName) objForUpdate.fullName = req.body.fullName;
        if (req.body.email) objForUpdate.email = req.body.email;
        if (req.body.password) objForUpdate.password = req.body.password;

        if (objForUpdate.password) {
            objForUpdate.password = CryptoJS.AES.encrypt(objForUpdate.password, process.env.CJS_KEY).toString();
            await UserModel.findByIdAndUpdate(req.query.id, { $set: objForUpdate });
        } else {
            await UserModel.findByIdAndUpdate(req.query.id, { $set: objForUpdate });
        }

        res.status(200).json({ success: true, message: "The user has been updated." });

    } catch (err) {
        res.status(500).json({ success: false, message: "Internal Server Error!", error: err });
    }

}

