const checkAuth = (req, res, next) => {
    if(!req.user) return res.redirect("/usuarios/acceso");
    next();
}
const checkNoAuth = (req, res, next) => {
    if(req.user) return res.redirect("/usuarios/panel");
    next();
}
export {checkAuth, checkNoAuth}