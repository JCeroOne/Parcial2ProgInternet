import logger from "../util/logger.js";
import { checkAuth, checkNoAuth } from "../util/checkauth.js";
import { User } from "../models/User.js";

import airRouter from "./products/air.js";
import sessionRouter from "./session.js";
import userRouter from "./user.js";
import apiKeyRouter from "./apikey.js";
import apiRouter from "../api/api_routes.js";

import { Plan } from "../models/Plan.js";

const PORT = process.env.PORT || 80;
export default (express, app, passport, Models) => {
    app.get("/", (req, res) => res.render("index", {
        section: {
            id: "landing",
            name: "Inicio"
        },
        user: req.user
    }));

    app.get("/planes", async (req, res) => {
        const plans = await Plan.find({});
        res.render("planes", {
            section: {
                id: "plans",
                name: "Planes"
            },
            user: req.user,
            plans: {
                basic: plans.find(p => p.name == "basic"),
                plus: plans.find(p => p.name == "plus"),
                pro: plans.find(p => p.name == "pro")
            }
        });
    });

    app.get("/contacto", (req, res) => res.render("contacto", {
        section: {
            id: "contact",
            name: "Contacto"
        },
        user: req.user
    }));

    app.use("/aire", airRouter);

    app.use("/usuarios", userRouter);

    app.use("/sesiones", sessionRouter);

    app.use("/claves-api", apiKeyRouter);

    app.use("/api", apiRouter);

    app.listen(PORT, logger.log("Application", `Listening on port ${PORT}.`));
}