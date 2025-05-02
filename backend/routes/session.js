import {logoutHandler} from "../controllers/sessions.js";
import express from "express";
import passport from "passport";
import { User } from "../models/User.js";

export default (() => {
    const router = express.Router();

    router.post("/acceso", passport.authenticate("local", {failureRedirect: "/usuarios/acceso?denegado=1"}), async (req, res) => {
        if(!req.user.account_active) {
            await User.updateOne({email: req.user.email}, {$set: {account_active: true}});
        }
        res.redirect("/usuarios/panel")
    });
    router.get("/cerrar", logoutHandler);
    
    return router;
})();