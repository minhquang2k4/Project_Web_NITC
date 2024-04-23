const Account = require('../model/account.model');
const md5 = require('md5');
const crypto = require('crypto');
module.exports.login = (req, res) => {
    res.render('login');
}

module.exports.register = (req, res) => {
    res.render('register');
}

module.exports.postLogin = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const account = await Account.findOne
    ({
        email: email,
        password: md5(password)
    });
    if (!account) {
        res.redirect('/auth/login');
        return;
    }
    res.cookie('token', account.token);
    res.redirect('/');
}

module.exports.postRegister = async (req, res) => {
    const name = req.body.fullName;
    const email = req.body.email;
    const password = req.body.password;

    const account = new Account({
        email: email,
        fullName: name,
        password: md5(password),
        library: [],
        token: crypto.randomBytes(64).toString('hex')
    });
    await account.save();
    res.redirect('/auth/login');
}

module.exports.logout = (req, res) => {
    res.clearCookie('token');
    res.redirect('/auth/login');
}
