import express from "express";
import mongoose from "mongoose";

import {APIKey} from "../models/APIKey.js";
import {User} from "../models/User.js";

import jcems_storm_detector_api from "./air/jcems_storm_detector.js";

export default (() => {
    const router = express.Router();

    router.use("/aire/jcems_storm_detector", jcems_storm_detector_api);
    
    return router;
})();