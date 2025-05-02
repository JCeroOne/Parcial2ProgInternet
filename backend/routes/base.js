import logger from "../util/logger.js";
import { checkAuth, checkNoAuth } from "../util/checkauth.js";
import { User } from "../models/User.js";

import sessionRouter from "./session.js";
import userRouter from "./user.js";

const PORT = process.env.PORT || 80;
export default (express, app, passport, Models) => {
    app.get("/", (req, res) => res.render("index", {
        section: {
            id: "landing",
            name: "Inicio"
        },
        user: req.user
    }));

    app.get("/planes", (req, res) => res.render("planes", {
        section: {
            id: "plans",
            name: "Planes"
        },
        user: req.user
    }));

    app.get("/contacto", (req, res) => res.render("contacto", {
        section: {
            id: "contact",
            name: "Contacto"
        },
        user: req.user
    }));

    app.use("/usuarios", userRouter)

    app.use("/sesiones", sessionRouter);

    app.listen(PORT, logger.log("Application", `Listening on port ${PORT}.`));
}