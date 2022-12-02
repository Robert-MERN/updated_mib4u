import User from "../models/userModel";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import jwt from "jsonwebtoken";

passport.use(
    "google",
    new GoogleStrategy(
        {
            clientID: "877759776144-3crue5ctg52d9fneatkum7n1p1uo83s2.apps.googleusercontent.com",
            clientSecret: "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",
            callbackURL: "https://mib4u.com/api/google/callback",
        },
        async (request, accessToken, refreshToken, profile, done) => {
            try {
                const obj = await User.findOne({ email: profile.emails[0].value });
                if (!obj) {
                    // create new user
                    const newUser = new User({
                        email: profile.emails[0].value,
                        fullName: profile.displayName,
                        googleAuth: true,
                    });
                    await newUser.save();
                    const token = await jwt.sign({
                        fullName: newUser.fullName,
                        email: newUser.email,
                        _id: newUser._id,
                        googleAuth: newUser.googleAuth,
                    }, process.env.JWT_KEY);
                    done(null, newUser, { message: "Auth successful", token });
                } else {
                    // login existing user
                    const token = await jwt.sign({
                        fullName: obj.fullName,
                        email: obj.email,
                        _id: obj._id,
                        googleAuth: obj.googleAuth,
                    }, process.env.JWT_KEY);
                    done(null, obj, { message: "Auth successful", token });
                }
            } catch (err) {
                console.error(err);
                done(err, false, { message: "Internal server error" });
            }
        }
    )
);

export default passport;
