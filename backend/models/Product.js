import mongoose from "mongoose";

const schema = new mongoose.Schema({

    id: {type: String, require: true},
    category: {type: String, require: true},
    name: {type: String, require: true},
    page_url: {type: String, require: true}

});

const Product = mongoose.model("Product", schema);

export {Product}