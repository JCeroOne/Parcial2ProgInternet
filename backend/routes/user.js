import {userRegistrationHandler} from "../controllers/users.js";
import express from "express";
import { checkAuth, checkNoAuth } from "../util/checkauth.js";
import {User} from "../models/User.js";

export default (() => {
    const router = express.Router();

    router.get("/acceso", checkNoAuth, (req, res) => res.render("users/acceso", {
        section: {
            id: "login",
            name: "Acceso",
        }, error: (e => {
            if(e == 1) return `El nombre de usuario y/o la contraseña son incorrectos`;
            return null;
        })(req.query.denegado)
    }));

    router.get("/registro", checkNoAuth, (req, res) => res.render("users/registro", {
        section: {
            id: "register",
            name: "Registro",
        }, error: (e => {
            if(e == 1) return `Ya existe un usuario con ese correo electrónico`;
            if(e == 500) return `Ocurrió un error interno. Inténtalo de nuevo más tarde.`
            return null;
        })(req.query.err)
    }));

    router.get("/panel", checkAuth, (req, res) => {
        res.render("users/dashboard", {
            section: {
                id: "dashboard",
                name: "Panel de usuario"
            }, 
            user: req.user
        })
    });

    router.post("/registro", checkNoAuth, userRegistrationHandler);

    return router;
})();