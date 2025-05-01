import mongoose from "mongoose";

const schema = new mongoose.Schema({

    name: {type: String, require: true},
    price: {type: Number, require: true},
    rate_limit: {type: Number, require: true},
    usage_limits: {
        air: {
            skewt_logp: Number, // Soundings per day
            storm_detector: Number // Locations
        },
        api: {
            storm_api: Number // Calls per month
        }
    }

});

const Plan = mongoose.model("Plan", schema);

export {Plan}