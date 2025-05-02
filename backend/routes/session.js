import {logoutHandler} from "../controllers/sessions.js";
import express from "express";
import passport from "passport";

export default (() => {
    const router = express.Router();

    router.post("/acceso", passport.authenticate("local", {failureRedirect: "/usuarios/acceso?denegado=1"}), (req, res) => res.redirect("/usuarios/panel"));
    router.get("/cerrar", logoutHandler);
    
    return router;
})();