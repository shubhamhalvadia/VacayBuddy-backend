exports.isUserAuth = (req,res,next) => {
    if(!req.session.userIsLoggedIn) {
        if(req.session.authorIsLoggedIn) {
            return res.redirect('/');
        }
        return res.redirect('/login');
    }
    next();
}