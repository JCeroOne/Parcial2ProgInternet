import express from "express";
import { User } from "../models/User.js";
import { APIKey } from "../models/APIKey.js";
import { checkAuth } from "../util/checkauth.js";

import { apiKeyCreationHandler, apiKeyEditionHandler, apiKeyDeletionHandler } from "../controllers/apikey.js";

export default (() => {
    const router = express.Router();

    router.post("/nueva", checkAuth, apiKeyCreationHandler);

    router.post("/:key/editar", checkAuth, apiKeyEditionHandler);

    router.post("/:key/eliminar", checkAuth, apiKeyDeletionHandler);
    
    return router;
})();