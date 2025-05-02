export default (app, passport, User) => {
    app.use(passport.initialize());
    passport.use(User.createStrategy());
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
    app.use(passport.session());
}