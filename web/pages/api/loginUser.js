import connectMongo from "../../utils/connectMongo";
import UserModel from "../../models/userModel";
import cryptojs from "crypto-js";

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
        const user = await UserModel.findOne({ email: req.body.email });
        if (user) {
            const bytes = cryptojs.AES.decrypt(user.password, process.env.CJS_KEY);
            const decrypted = bytes.toString(cryptojs.enc.Utf8);
            if (decrypted === req.body.password) {
                const { password, ...other } = user._doc;
                res.status(200).json({ ...other });
            } else {
                res.status(401).json({ success: false, message: "You entered a wrong Password!" });
            }
        } else {
            res.status(401).json({ success: false, message: "You entered a wrong Email!" });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: "Internal Server Error!", error: err });
    }

}

