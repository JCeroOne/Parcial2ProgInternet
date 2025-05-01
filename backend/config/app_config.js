import logger from "../util/logger.js";
import bodyParser from "body-parser";
export default (express, app, basePath, session) => {
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(express.static(`${basePath}/../frontend/public`));
    app.set("views", `${basePath}/../frontend/views`);
    app.set("view engine", "ejs");
    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true
    }))
}