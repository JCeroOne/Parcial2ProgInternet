import logger from "../util/logger.js";

function logoutHandler(req, res){
    req.logout(e => {
        if(e){
            logger.error("Users", `An error occurred while logging out a user!\n-----\n${e}`);
        }
        res.redirect("/");
    });
}

export {logoutHandler};