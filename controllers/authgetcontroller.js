import passport from 'passport';
import mysql from 'mysql2';

import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { userDetails } from '../models/db.js'

passport.use(new GoogleStrategy({
    clientID: `${process.env.GOOGLE_CLIENT_ID}`,
    clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
    callbackURL: `${process.env.SERVER_URL}/auth/google/callback`,
    scope: ['profile', 'email']
}, async function (accessToken, refreshToken, profile, cb) {

    // console.log(profile)
    const userObj = {
        // gId: profile._json.sub,
        fName: profile._json.given_name,
        lName: profile._json.family_name,
        imgUrl: profile._json.picture,
        email: profile._json.email,
        isAdmin: false
    }

    userDetails.findOne({ "email": userObj.email }, function (err, user) {
        // console.log(user)
        if (err)
            throw err;
        else {
            if (user) {
                console.log("existing user: ")
                // console.log(result[0])
                return cb(null, user);
            }
            else {
                userDetails.create(userObj, function (err, newuser) {
                    // console.log(newuser)
                    if (err) {
                        console.log("error at create new user: ");
                        console.log(err);
                    }
                    else {
                        console.log("new user created")
                        return cb(null, newuser);
                    }
                });
            }
        }
    });
})
)

passport.serializeUser((user, cb) => {
    // console.log(user);
    process.nextTick(() => {
        cb(null, user._id);
    });
    console.log("---------------------serialised")
});

passport.deserializeUser((_id, cb) => {
    // console.log(_id);
    process.nextTick(() => {
        userDetails.findById(_id, function (err, user) {
            if (err) {
                console.log("user not foud for deserialisation")
                throw err;
            }
            else {
                console.log("---------------------deserialised")
                return cb(null, user);
            }
        })
    });
});


const success = (req, res) => {
    // console.log("auth success")
    if (req.isAuthenticated()) {
        // if (req.user) {
        console.log("auth success")
        // console.log(req.user);
        // console.log({ ...req.user, sessionId: req.sessionID })

        res.status(200).json(req.user);
    }
    else {
        console.log("req.user not found")
        res.status(403).json({
            status: false,
            message: "req.user not found"
        })
    }
}

const authorize = (req, res) => {
    // console.log(req.isAuthenticated());
    if (req.isAuthenticated()) {
        if (req.user) {
            res.status(200).json(req.user)
        }
        else {
            console.log("req.user not found")
            res.status(403).json({
                status: false,
                message: "req.user not found"
            })
        }
    }
    else {
        console.log("unautherised")
        res.status(401).json({ status: false, message: "unautherised" })
    }
}

const allUsers = (req, res) => {
    userDetails.find({}, function (err, user) {
        if (err) {
            console.log("error fetching all users")
            console.log(err);
            res.status(403).json({ "status": false, "message": err });
        }
        else {
            console.log("---------------------deserialised")
            console.log("fetched all users")
            // console.log(result);
            res.status(200).json(user);
        }
    })
}

const checkUser = (req, res) => {
    // console.log(req.body.emailId)
    userDetails.findOne({ "email": req.body.emailId }, function (err, user) {
        // console.log(user)
        if (err) {
            console.log("error @ fetch user")
            console.log(err);
            res.status(403).json({ "status": false, "message": err });
        }
        else {
            // console.log(result);
            if (user) {
                console.log("fetched user")
                res.status(200).json({ "status": true, "user": user });
            }
            else {
                console.log("no user found")
                res.status(200).json({ "status": false, "user": null });
            }
        }
    });
}

const addAdmin = async (req, res) => {
    // console.log(req.body)
    const entrySelect = req.body.entrySelect;
    const entry = req.body.entry;
    const email = req.body.email;

    // console.log(entrySelect);
    // console.log(entry);
    userDetails.findOneAndUpdate({ "email": email }, { [entrySelect]: entry }, (err, user) => {
        if (err) {
            console.log("error updating user: ")
            console.log(err);
            res.status(403).json({ "status": false, "msg": "error updating user" });
        }
        else {
            console.log("user updated")
            res.status(200).json({ "status": true, "user": user });
        }
    })
}

export default success;
export { authorize, allUsers, checkUser, addAdmin };
