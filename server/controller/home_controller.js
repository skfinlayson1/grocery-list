const path = require("path");

module.exports = {

    home(req, res, next) {
        res.sendFile(path.join(__dirname, "../", "../", "client/public/index.html"));
    }

}