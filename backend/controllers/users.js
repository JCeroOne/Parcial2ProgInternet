import {User} from "../models/User.js";

async function userRegistrationHandler(req, res) {
            
    let u = await User.findOne({email: req.body.email});
    if(u) return res.redirect("/registro?err=1");
    
    let user = await User.register({name: req.body.name, email: req.body.email}, req.body.password);

    req.login(user, e => {
        if(e){
            logger.log("Users", `An error occurred while trying to register a new user!\n-----\n${e}`);
            return res.redirect("/registro?err=500");
        }
        res.redirect("/panel");
    })

}

export {userRegistrationHandler};