import logger from "../util/logger.js";
const PORT = process.env.PORT || 80;
export default (express, app) => {
    app.get("/", (req, res) => res.render("index", {
        section: {
            id: "landing",
            name: "Inicio"
        }
    }));

    app.listen(PORT, logger.log("Application", `Listening on port ${PORT}.`));
}