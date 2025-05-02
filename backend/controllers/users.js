import {User} from "../models/User.js";

async function userRegistrationHandler(req, res) {
            
    let u = await User.findOne({email: req.body.email});
    if(u) return res.redirect("/usuarios/registro?err=1");
    
    let user = await User.register({name: req.body.name, email: req.body.email}, req.body.password);

    req.login(user, e => {
        if(e){
            logger.log("Users", `An error occurred while trying to register a new user!\n-----\n${e}`);
            return res.redirect("/usuarios/registro?err=500");
        }
        res.redirect("/usuarios/panel");
    })

}

async function userNameChangeHandler(req, res){
    const user = await User.findOne({email: req.user.email});
    let pwdCorrect = await user.authenticate(req.body.password);
    
    if(!pwdCorrect.user) return res.redirect("/usuarios/ajustes?denegado=1");

    await User.updateOne({email: req.user.email}, {$set: {name: req.body.name}});

    res.redirect("/usuarios/ajustes?exito=1");
}

async function userEmailChangeHandler(req, res){

    const foundOther = await User.findOne({email: req.body.email});

    if(foundOther) return res.redirect("/usuarios/ajustes?denegado=2");

    const user = await User.findOne({email: req.user.email});
    let pwdCorrect = await user.authenticate(req.body.password);
    
    if(!pwdCorrect.user) return res.redirect("/usuarios/ajustes?denegado=1");

    await User.updateOne({email: req.user.email}, {$set: {email: req.body.email}});

    res.redirect("/usuarios/acceso?correo=1");
}

async function userPwdChangeHandler(req, res){
    const user = await User.findOne({email: req.user.email});
    let pwdCorrect = await user.authenticate(req.body.currpassword);
    
    if(!pwdCorrect.user) return res.redirect("/usuarios/ajustes?denegado=1");

    await user.changePassword(req.body.currpassword, req.body.password);

    res.redirect("/usuarios/ajustes?exito=1");
}

async function userDeactivationHandler(req, res){
    const user = await User.findOne({email: req.user.email});
    let pwdCorrect = await user.authenticate(req.body.password);
    
    if(!pwdCorrect.user) return res.redirect("/usuarios/ajustes?denegado=1");

    await User.updateOne({email: req.user.email}, {$set: {account_active: false}});

    res.redirect("/sesiones/cerrar");
}

async function userDeletionHandler(req, res){
    const user = await User.findOne({email: req.user.email});
    let pwdCorrect = await user.authenticate(req.body.password);
    
    if(!pwdCorrect.user) return res.redirect("/usuarios/ajustes?denegado=1");

    let email = req.user.email;

    req.logout(async e => {
        if(e){
            logger.error("Users", `An error occurred while logging out a user!\n-----\n${e}`);
            return res.redirect("/usuarios/ajustes?err=500");
        }
        await User.deleteOne({email});
        res.redirect("/?deleted=1");
    });
}

export {userRegistrationHandler, userNameChangeHandler, userEmailChangeHandler, userPwdChangeHandler, userDeactivationHandler, userDeletionHandler};