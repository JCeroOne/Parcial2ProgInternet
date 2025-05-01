import mongoose from "mongoose";

const schema = new mongoose.Schema({

    name: {type: String, require: true},
    price: {type: Number, require: true},
    rate_limit: {type: Number, require: true},
    usage_limits: {
        air: {
            skewt_logp: 10// Soundings per day
        }
    }

});

const User = mongoose.model("User", schema);

export {User}