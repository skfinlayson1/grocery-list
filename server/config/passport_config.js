const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;

const User = require("./../db/models/index").User;

module.exports = {

    init(app) {
        app.use(passport.initialize());
        app.use(passport.session());

        passport.use(new LocalStrategy((username, password, done) => {
            User.findOne({where: {username}})
            .then((res) => {
                if(!res) {
                    return done(null, false);
                } else {
                    return done(null, res)
                }
            })
        }));

        passport.serializeUser(function(user, done) {
            done(null, user.id);
        });
          
        passport.deserializeUser(function(id, done) {
            User.findByPk(id)
            .then((user) => {
                if (!user) {
                    done(user);
                } else {
                    done(null, user);
                }
            })
        });

    }

}