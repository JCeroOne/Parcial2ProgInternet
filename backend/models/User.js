import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const schema = new mongoose.Schema({
    
    name: {type: String, require: true},
    email: {type: String, require: true},
    role: {type: String, require: true}, // "user" or "admin"
    register_date: {type: Date, default: Date.now},
    plan: {type: String, default: "basic", require: true},
    api_keys: [{type: String}],
    rate_limit: {type: Number, default: 120},
    product_usage: {
        air: {
            skewt_logp: {
                daily_soundings: {type: Number, default: 0},
                last_sounding: {type: Date, default: null}
            }
        }
    }

});

schema.plugin(passportLocalMongoose, {usernameField: "email"});

const User = mongoose.model("User", schema);

export {User}