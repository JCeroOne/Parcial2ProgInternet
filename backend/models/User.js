import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const schema = new mongoose.Schema({
    
    name: {type: String, require: true},
    email: {type: String, require: true},
    account_active: {type: Boolean, default: true},
    role: {type: String, require: true}, // "user" or "admin"
    register_date: {type: Date, default: Date.now},
    plan: {type: String, default: "basic", require: true},
    product_usage: {
        api: {
            minute_calls: {type: Number, default: 0},
            last_call: {type: Number, default: 0},
            metrics: {
                storm_api: {
                    monthly_calls: {type: Number, default: 0},
                    last_call: {type: Number, default: 0}
                }
            }
        },
        air: {
            skewt_logp: {
                daily_soundings: {type: Number, default: 0},
                last_sounding: {type: Date, default: null}
            },
            storm_detector: {
                locations: {type: Number, default: 0}
            }
        }
    }

});

schema.plugin(passportLocalMongoose, {usernameField: "email"});

const User = mongoose.model("User", schema);

export {User}