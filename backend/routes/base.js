import logger from "../util/logger.js";
import { checkAuth, checkNoAuth } from "../util/checkauth.js";
import { User } from "../models/User.js";
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

    app.get("/acceso", checkNoAuth, (req, res) => res.render("users/acceso", {
        section: {
            id: "login",
            name: "Acceso",
        }, error: (e => {
            if(e == 1) return `El nombre de usuario y/o la contraseña son incorrectos`;
            return null;
        })(req.query.denegado)
    }));

    app.get("/registro", checkNoAuth, (req, res) => res.render("users/registro", {
        section: {
            id: "register",
            name: "Registro",
        }, error: (e => {
            if(e == 1) return `Ya existe un usuario con ese correo electrónico`;
            if(e == 500) return `Ocurrió un error interno. Inténtalo de nuevo más tarde.`
            return null;
        })(req.query.err)
    }));

    app.post("/acceso", passport.authenticate("local", {failureRedirect: "/acceso?denegado=1"}), (req, res) => res.redirect("/panel"));

    app.post("/registro", checkNoAuth, async (req, res) => {
        
        let u = await User.findOne({email: req.body.email});
        if(u) return res.redirect("/registro?err=1");
        
        let user = await User.register({name: req.body.name, email: req.body.email}, req.body.password);

        req.login(user, e => {
            if(e){
                logger.log("Users", `An error occurred while trying to register a new user!\n-----\n${e}`);
                return res.redirect("/registro?err=500");
            }
            res.redirect("/panel");
        })

    });

    app.listen(PORT, logger.log("Application", `Listening on port ${PORT}.`));
}