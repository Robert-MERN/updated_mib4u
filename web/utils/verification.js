import jwt from "jsonwebtoken";


export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_KEY, (err, credentials) => {
            if (!err) {
                req.credentials = credentials
                next();
            } else {
                res.status(401).json({ success: false, message: "Your token is expired!" })
            }
        })
    } else {
        res.status(501).json({ success: false, message: "You aren't authenticated!" })
    }
}
export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.credentials.isAdmin) {
            next();
        } else {
            res.status(501).json({ success: false, message: "Only Admin is allowed!" })
        }
    });
};


// module.exports = { verifyAgent, verifySuperAdmin }