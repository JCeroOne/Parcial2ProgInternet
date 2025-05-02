import mongoose from "mongoose";

const schema = new mongoose.Schema({
    
    lat: Number,
    lon: Number,
    spd: Number,
    dir: Number,
    ctt: Number,
    int: Number,
    ltr: Number

});

const Storm = mongoose.model("Storm", schema);

export {Storm}