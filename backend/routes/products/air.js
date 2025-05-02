import express from "express";
import { User } from "../../models/User.js";
import { checkAuth } from "../../util/checkauth.js";

import JCEMS_Storm_Detector_Router from "./air/JCEMS_Storm_Detector.js";

export default (() => {
    const router = express.Router();

    router.use("/JCEMS_Storm_Detector", JCEMS_Storm_Detector_Router);
    
    return router;
})();