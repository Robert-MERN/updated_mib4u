import connectMongo from "../../utils/connectMongo";
import Payment from "../../models/paymentModel";

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
        const payment = new Payment(req.body);
        await payment.save()
        res.status(200).json({success: true, message: "Choose the payment method."});
    } catch (err) {
        res.status(500).json({ message: "internal server error", success: false, error: err.stack })
    }

}

