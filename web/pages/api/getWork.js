
import WorkModel from "../../models/WorkModel";
import connectMongo from "../../utils/connectMongo";
import queryOperator from "../../utils/priceFilter";

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

        let Work, numberOfCollection;

        if (req.query.category) {
            Work = await WorkModel.find(queryOperator(req, { category: req.query.category })).sort({ createdAt: -1 }).limit(Number(req.query.limit));

            numberOfCollection = await WorkModel.find(queryOperator(req, { category: req.query.category })).count();

        } else if (req.query.keywords) {
            Work = await WorkModel.find(queryOperator(req, { title: { $regex: `(?i)${req.query.keywords}` } })).sort({ createdAt: -1 }).limit(Number(req.query.limit));

            numberOfCollection = await WorkModel.find(queryOperator(req, { title: { $regex: `(?i)${req.query.keywords}` } })).count();

        } else {
            Work = await WorkModel.find(queryOperator(req, {})).sort({ createdAt: -1 }).limit(Number(req.query.limit));

            numberOfCollection = await WorkModel.find(queryOperator(req, {})).count();
        }

        res.status(200).json({ Work, count: numberOfCollection });
    } catch (err) {
        res.status(500).json({ success: false, message: "Internal Server Error!", error: err });
    }

}