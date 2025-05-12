import mongoose from "mongoose";

const schema = new mongoose.Schema({
    
    key: {type: String, require: true},
    name: String,
    user_id: {type: String, require: true},
    monthly_uses: {type: Number, default: 0},
    minute_uses: {type: Number, default: 0},
    last_use: {type: Number, default: 0}

});

const APIKey = mongoose.model("APIKey", schema);

export {APIKey}