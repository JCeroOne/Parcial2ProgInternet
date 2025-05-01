import mongoose from "mongoose";

const schema = new mongoose.Schema({
    
    username: {type: String, require: true},
    email: {type: String, require: true},

});