const checkAuth = (req, res, next) => {
    if(!req.user) return res.redirect("/acceso");
    next();
}
const checkNoAuth = (req, res, next) => {
    if(req.user) return res.redirect("/panel");
    next();
}
export {checkAuth, checkNoAuth}