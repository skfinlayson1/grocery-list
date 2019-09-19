

module.exports = {

    init(app) {
        const homeRoutes = require("../routes/home_routes");

        app.use(homeRoutes);
    }

}