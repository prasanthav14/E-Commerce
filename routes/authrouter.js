import express from "express";
const router = express.Router();
import passport from 'passport';

import success, { authorize, allUsers, addAdmin, checkUser } from "../controllers/authgetcontroller.js"

router.get("/success", success);
router.get("/authorize", authorize);

router.get("/allusers", allUsers);
router.post("/admin", checkUser);
router.patch("/admin", addAdmin);

router.get("/google", passport.authenticate('google'));

router.get("/google/callback", passport.authenticate('google', {
    failureRedirect: `${process.env.CLIENT_URL}/login`,
    successRedirect: `${process.env.CLIENT_URL}`
}));

router.post("/logout", (req, res, next) => {
    req.logOut({ keepSessionInfo: false }, err => {
        if (err) { return next(err); }
        else {
            console.log("loggedout");
            req.sessionStore.clear();
            req.session.destroy(function (err) {
                if (err) { return next(err); }
                else
                    res.status(200).json("loggedout");
            })
        }
        // console.log(req.isAuthenticated());
    })
});


export default router;
