// External dependiencies
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";

// Initializations
const app = express();
dotenv.config();

// Local dependencies
import db_connect from "./config/db_connect.js";
import logger from "./util/logger.js";
import app_config from "./config/app_config.js";
import passport_config from "./config/passport_config.js";
import Routes from "./routes/base.js";

// Mongoose models
import {User} from "./models/User.js";
import {APIKey} from "./models/APIKey.js";
import {Product} from "./models/Product.js";
import {Plan} from "./models/Plan.js";

const PATH = import.meta.dirname;
logger.log("Application", "Starting backend...");
app_config(express, app, PATH, session);
passport_config(passport, User, session);
await db_connect(mongoose);

Routes(express, app, passport, {User, APIKey, Product, Plan});