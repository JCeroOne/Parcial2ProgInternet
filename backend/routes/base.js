import logger from "../util/logger.js";
import { checkAuth, checkNoAuth } from "../util/checkauth.js";
const PORT = process.env.PORT || 80;
export default (express, app, passport, Models) => {
    app.get("/", (req, res) => res.render("index", {
        section: {
            id: "landing",
            name: "Inicio"
        }
    }));

    app.get("/planes", (req, res) => res.render("planes", {
        section: {
            id: "plans",
            name: "Planes"
        }
    }));

    app.get("/contacto", (req, res) => res.render("contacto", {
        section: {
            id: "contact",
            name: "Contacto"
        }
    }));

    app.get("/acceso", checkNoAuth, (req, res) => res.render("users/acceso", {
        section: {
            id: "login",
            name: "Acceso",
        }, error: (e => {
            if(e == 1) return `El nombre de usuario y/o la contraseña son incorrectos`;
            return null;
        })(req.query.denegado)
    }));

    app.post("/acceso", passport.authenticate("local", {failureRedirect: "/acceso?denegado=1"}), (req, res) => res.redirect("/panel"));

    app.listen(PORT, logger.log("Application", `Listening on port ${PORT}.`));
}