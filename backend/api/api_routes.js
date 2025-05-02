import express from "express";
import mongoose from "mongoose";

import {APIKey} from "../models/APIKey.js";
import {User} from "../models/User.js";

export default (() => {
    const router = express.Router();

    router.get("/storms", (req, res) => {
        res.json({status: 200, message: "OK"});
    })
    
    return router;
})();