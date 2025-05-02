import express from "express";
import mongoose from "mongoose";

import {APIKey} from "../../models/APIKey.js";
import {User} from "../../models/User.js";
import { Storm } from "../../models/Storm.js";

function Distance(p1, p2){
    return Math.sqrt(Math.pow(p2[0] - p1[0], 2) + Math.pow(p2[1] - p1[1], 2))
}

export default (() => {
    const router = express.Router();

    router.get("/", async (req, res) => {
        const key = await APIKey.findOne({key: req.query.api_key});
        if(!key) return res.status(401).json({message: "API key required"});
        await APIKey.updateOne({key: req.query.api_key}, {$inc: {monthly_uses: 1}});
        res.status(200).json({api_status: "OK"});
    });

    router.get("/cercanas", async (req, res) => {
        const key = await APIKey.findOne({key: req.query.api_key});
        if(!key) return res.status(401).json({message: "API key required"});
        await APIKey.updateOne({key: req.query.api_key}, {$inc: {monthly_uses: 1}});

        if(!req.query.lat || !req.query.lon) return res.status(400).json({message: "Latitude and longitude required!"})

        const s = await Storm.find({});
        const nearby = [];
        s.forEach(st => {
            if(Distance([st.lat, st.lon], [req.query.lat, req.query.lon]) <= 0.5) nearby.push(st);
        });
        return res.status(200).json(nearby);
    });

    router.get("/tormentas", async (req, res) => {
        const key = await APIKey.findOne({key: req.query.api_key});
        if(!key) return res.status(401).json({message: "API key required"});
        await APIKey.updateOne({key: req.query.api_key}, {$inc: {monthly_uses: 1}});

        const s = await Storm.find({});
        return res.status(200).json(s);
    });

    router.get("/tormentas/:id", async (req, res) => {
        const key = await APIKey.findOne({key: req.query.api_key});
        if(!key) return res.status(401).json({message: "API key required"});
        await APIKey.updateOne({key: req.query.api_key}, {$inc: {monthly_uses: 1}});

        const s = await Storm.findById(req.params.id);
        if(!s) return res.status(404).json({message: "Not Found"});
        return res.status(200).json(s);
    });

    // Rutas temporales

    router.post("/tormentas/nueva", async (req, res) => {
        const key = await APIKey.findOne({key: req.query.api_key});
        if(!key) return res.status(401).json({message: "API key required"});
        await APIKey.updateOne({key: req.query.api_key}, {$inc: {monthly_uses: 1}});
        
        console.log(req.body);

        const params = req.body.storm;
        const storm = await Storm.create(params);
        return res.status(201).json(storm);
    });

    router.post("/tormentas/:id", async (req, res) => {
        const key = await APIKey.findOne({key: req.query.api_key});
        if(!key) return res.status(401).json({message: "API key required"});
        await APIKey.updateOne({key: req.query.api_key}, {$inc: {monthly_uses: 1}});
        
        const s = await Storm.findById(req.params.id);
        if(!s) return res.status(404).json({message: "Not Found"});

        const params = req.body.storm;
        const storm = await Storm.findByIdAndUpdate(req.params.id, params);
        return res.status(200).json(storm);
    });

    router.post("/tormentas/:id/eliminar", async (req, res) => {
        const key = await APIKey.findOne({key: req.query.api_key});
        if(!key) return res.status(401).json({message: "API key required"});
        await APIKey.updateOne({key: req.query.api_key}, {$inc: {monthly_uses: 1}});

        const s = await Storm.findById(req.params.id);
        if(!s) return res.status(404).json({message: "Not Found"});

        await Storm.findByIdAndDelete(req.params.id);
        res.status(200).json(s);
    });
    
    return router;
})();