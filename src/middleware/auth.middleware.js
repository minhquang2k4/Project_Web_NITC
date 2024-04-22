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

    next();
}