import express from "express";
import mongoose from "mongoose";

import {APIKey} from "../../models/APIKey.js";
import {User} from "../../models/User.js";

export default (() => {
    const router = express.Router();

    router.get("/", async (req, res) => {
        const key = await APIKey.findOne({key: req.query.api_key});
        if(!key) return res.status(401).json({message: "API key required"});
        await APIKey.updateOne({key: req.query.api_key}, {$inc: {monthly_uses: 1}});
        res.status(200).json({api_status: "OK"});
    })
    
    return router;
})();