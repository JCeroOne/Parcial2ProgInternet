// External dependiencies
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Initializations
const app = express();
dotenv.config();

// Local dependencies
import db_connect from "./config/db_connect.js";
import logger from "./util/logger.js";
import app_config from "./config/app_config.js";
import Routes from "./routes/base.js";

const PATH = import.meta.dirname;
logger.log("Application", "Starting backend...");
app_config(express, app, PATH);
await db_connect(mongoose);

Routes(express, app);