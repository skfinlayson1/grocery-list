const path = require("path");
const cors = require("cors");
const session = require("express-session");
const bodyParser = require("body-parser");
const passportConfig = require("./passport_config");

module.exports = {
    init(app, express) {
        app.set("trust proxy", 1)
        app.use(cors());
        app.use(express.static(path.join(__dirname, "../", "../", "client", "build")));
        app.use(bodyParser.urlencoded({extended:true}));
        app.use(bodyParser.json());
        app.use(session({
            secret: "helloWorld",
            resave: false,
            saveUninitialized: false,
            cookie: { maxAge: 1.21e+9 }
        }));
        passportConfig.init(app);
    }
}