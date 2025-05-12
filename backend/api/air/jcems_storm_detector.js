import express from "express";
import mongoose from "mongoose";

import {APIKey} from "../../models/APIKey.js";
import {User} from "../../models/User.js";
import {Plan} from "../../models/Plan.js";
import {Storm} from "../../models/Storm.js";

const {Types: {ObjectId}} = mongoose;

function Distance(p1, p2){
    return Math.sqrt(Math.pow(p2[0] - p1[0], 2) + Math.pow(p2[1] - p1[1], 2))
}

/* 
    ERROR CODES:
        1 = Rate limit exceeded
        2 = Monthly quota exceeded
*/

async function checkKey(req){

        const key = await APIKey.findOne({key: req.query.api_key});
        if(!key) return [null, null];

        const user = await User.findById(key.user_id);
        if(!user.account_active) return [null, null];

        const plan = await Plan.findOne({name: user.plan});

        const last_use = new Date(key.last_use), now = new Date();

        if(last_use.getUTCMonth() != now.getUTCMonth() || last_use.getUTCFullYear() != now.getUTCFullYear()){
            await APIKey.updateOne({key: req.query.api_key}, {$set: {monthly_uses: 0}});
        }
        await APIKey.updateOne({key: req.query.api_key}, {$inc: {monthly_uses: 1}, $set: {last_use: now.getTime()}});

        const last_call = new Date(user.product_usage.api.last_call);
        if(last_call.getUTCMonth() == now.getUTCMonth() && last_call.getUTCFullYear() == now.getUTCFullYear()){

            if(user.product_usage.api.metrics.storm_api.monthly_calls >= plan.usage_limits.api.storm_api) return [key, 2];
            user.product_usage.api.metrics.storm_api.monthly_calls += 1;
            
            if(last_call.getUTCMinutes() == now.getUTCMinutes() && last_call.getUTCDate() == now.getUTCDate()){
                if(user.product_usage.api.minute_calls >= plan.rate_limit) return [key, 1];
                user.product_usage.api.minute_calls += 1;
            } else user.product_usage.api.minute_calls = 1;

        } else {
            user.product_usage.api.metrics.storm_api.monthly_calls = 1;
            user.product_usage.api.minute_calls = 1;
        }
        user.product_usage.api.last_call = now.getTime();
        user.product_usage.api.metrics.storm_api.last_call = now.getTime();

        user.save();

        return [key, null];

}

async function authorizeUsage(req, res){
    const [key, err] = await checkKey(req);
    if(!key) return res.status(401).json({message: "Valid API key required"});
    if(err) {
        if(err == 1) return res.status(401).json({message: "Rate limit exceeded"});
        if(err == 2) return res.status(401).json({message: "Monthly limit exceeded"});
    }
}

export default (() => {
    const router = express.Router();

    router.get("/", async (req, res) => {
        await authorizeUsage(req, res);
        res.status(200).json({api_status: "OK"});
    });

    router.get("/cercanas", async (req, res) => {
        await authorizeUsage(req, res);
        if(!req.query.lat || !req.query.lon) return res.status(400).json({message: "Latitude and longitude required!"})

        const s = await Storm.find({});
        const nearby = [];
        s.forEach(st => {
            if(Distance([st.lat, st.lon], [req.query.lat, req.query.lon]) <= 0.5) nearby.push(st);
        });
        return res.status(200).json(nearby);
    });

    router.get("/tormentas", async (req, res) => {
        await authorizeUsage(req, res);
        const s = await Storm.find({});
        return res.status(200).json(s);
    });

    router.get("/tormentas/:id", async (req, res) => {
        await authorizeUsage(req, res);
        if(!ObjectId.isValid(req.params.id)) return res.status(404).json({message: "Not Found"});

        const s = await Storm.findById(req.params.id);
        if(!s) return res.status(404).json({message: "Not Found"});
        return res.status(200).json(s);
    });

    // Rutas temporales

    router.post("/tormentas/nueva", async (req, res) => {
        await authorizeUsage(req, res);

        const params = req.body.storm;
        const storm = await Storm.create(params);
        return res.status(201).json(storm);
    });

    router.post("/tormentas/:id", async (req, res) => {
        await authorizeUsage(req, res);
        
        if(!ObjectId.isValid(req.params.id)) return res.status(404).json({message: "Not Found"});

        const s = await Storm.findById(req.params.id);
        if(!s) return res.status(404).json({message: "Not Found"});

        const params = req.body.storm;
        const storm = await Storm.findByIdAndUpdate(req.params.id, params);
        return res.status(200).json(storm);
    });

    router.post("/tormentas/:id/eliminar", async (req, res) => {
        await authorizeUsage(req, res);

        if(!ObjectId.isValid(req.params.id)) return res.status(404).json({message: "Not Found"});

        const s = await Storm.findById(req.params.id);
        if(!s) return res.status(404).json({message: "Not Found"});

        await Storm.findByIdAndDelete(req.params.id);
        res.status(200).json(s);
    });
    
    return router;
})();