import express from "express";
import { User } from "../../models/User.js";
import { checkAuth } from "../../util/checkauth.js";

export default (() => {
    const router = express.Router();

    router.use("/JCEMS_Storm_Detector", (req, res) => {
        res.render("products/air/JCEMS_Storm_Detector", {
            section: {
                id: "/products/air/jcems_storm_detector",
                name: "JCEMS Storm Detector"
            }, 
            user: req.user
        })
    });
    
    return router;
})();