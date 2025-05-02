import {randomBytes} from "node:crypto";
import {User} from "../models/User.js";
import {APIKey} from "../models/APIKey.js";

function generateBytes(){
    return Buffer.from(randomBytes(20)).toString("hex");
}

async function generateKey(){
    return new Promise(async (resolve, reject) => {
        let key = generateBytes();
        let existing = await APIKey.findOne({key});
        while(existing){
            key = generateBytes();
            existing = await APIKey.findOne({key});
        }
        resolve(key);
    });
}

async function apiKeyCreationHandler(req, res){
    const user = await User.findOne({email: req.user.email});
    let pwdCorrect = await user.authenticate(req.body.password);
    
    if(!pwdCorrect.user) return res.redirect("/usuarios/claves-api?denegado=1");

    const key = await generateKey();

    await APIKey.create({name: req.body.name ?? null, key, user_id: req.user._id});

    res.redirect("/usuarios/claves-api?exito=1");
}

async function apiKeyEditionHandler(req, res){
    const key = await APIKey.findOne({key: req.params.key});

    if(!key) return res.redirect("/usuarios/claves-api?err=404");
    if(key.user_id != req.user._id.toString()) return res.redirect("/usuarios/claves-api?err=401");

    const user = await User.findOne({email: req.user.email});
    let pwdCorrect = await user.authenticate(req.body.password);
    
    if(!pwdCorrect.user) return res.redirect("/usuarios/claves-api?denegado=1");

    await APIKey.updateOne({key: req.params.key}, {$set: {name: req.body.name}});

    return res.redirect("/usuarios/claves-api?exito=1");
}

async function apiKeyDeletionHandler(req, res){
    const key = await APIKey.findOne({key: req.params.key});

    if(!key) return res.redirect("/usuarios/claves-api?err=404");
    if(key.user_id != req.user._id.toString()) return res.redirect("/usuarios/claves-api?err=401");

    const user = await User.findOne({email: req.user.email});
    let pwdCorrect = await user.authenticate(req.body.password);
    
    if(!pwdCorrect.user) return res.redirect("/usuarios/claves-api?denegado=1");

    await APIKey.deleteOne({key: req.params.key});

    return res.redirect("/usuarios/claves-api?exito=1");
}

export {apiKeyCreationHandler, apiKeyEditionHandler, apiKeyDeletionHandler}