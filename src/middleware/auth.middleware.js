const Account = require('../model/account.model');


module.exports.requireAuth = async (req, res, next) => {
    if (!req.cookies.token) {
        res.clearCookie('token');
        res.redirect('/auth/login');
        return;
    }

    const account = await Account.findOne({ token: req.cookies.token });

    if(!account) {
        res.clearCookie('token');
        res.redirect('/auth/login');
        return;
    }

    res.locals.user = account;
    next();
}


module.exports.checkUser = async (req, res, next) => {
    if (!req.cookies.token) {
        res.locals.user = null;
        next();
        return;
    }

    const account = await Account.findOne({ token: req.cookies.token });

    if(!account) {
        res.locals.user = null;
        next();
        return;
    }

    res.locals.user = account;
    next();
}