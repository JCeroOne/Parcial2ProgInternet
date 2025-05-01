import mongoose from "mongoose";

const schema = new mongoose.Schema({
    
    key: {type: String, require: true},
    user_id: {type: String, require: true}

});

const APIKey = mongoose.model("APIKey", schema);

export {APIKey}