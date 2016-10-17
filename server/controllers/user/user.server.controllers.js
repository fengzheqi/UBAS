/**
 * @file
 * @author tommyzqfeng
 * @date 2016/10/11
 */

'use strict';

var mongoose = require('mongoose');
var passport = require('passport');
var User = mongoose.model('User');

/**
 * 注册
 * @param req
 * @param res
 */
exports.signup = function (req, res) {
    delete req.body.roles;
    delete req.body.isActive;

    var user = new User(req.body);
    var message = null;

    user.provider = 'local';

    user.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: err
            })
        } else {
            res.json(user);
        }
    });
};

/**
 * 登入
 * @param req
 * @param res
 * @param next
 */
exports.signin = function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err || !user) {
            res.status(400).send(info);
        } else {
            user.password = undefined;
            user.salt = undefined;

            req.login(user, function (err) {
                if (err) res.status(400).send(err);
                else res.json(user);
            })
        }
    })(req, res, next);
}

/**
 * 登出
 * @param req
 * @param res
 */
exports.signout = function (req, res) {
    req.logout();
    res.redirect('/');
}