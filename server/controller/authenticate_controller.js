const User = require("../db/models/index").User;
const passport = require("passport");


module.exports = {

// SIGN UP ---------------------------------------------------------------------------
    signUp(req, res, next) {
        const values = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        }

        User.create(values)
        .then((user) => {
            if (user) {
                passport.authenticate("local")(req, res, () => {
                    res.json({username: req.user.username});
                })
            } else {
                res.json("error: " + user)
            }
        })
        .catch((err) => {
            res.json("Error: " + err);
        })
    },

// SIGN IN -------------------------------------------------------------------------------
    signIn(req, res) {
        passport.authenticate("local")(req, res, () => {
            res.json({username: req.user.username});
        })
    },

// CHECK STATUS --------------------------------------------------------------------------
    checkStatus(req, res) {
        if (req.user) {
            res.json({username: req.user.username});
        } else {
            res.json("Fail")
        }
    },

// SIGN OUT ------------------------------------------------------------------------------
    signOut(req, res, next) {
        req.logout();
        res.json("signed out");
    },
}