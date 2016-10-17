/**
 * @file
 * @author tommyzqfeng
 * @date 2016/10/11
 */

'use strict';

var mongoose = require('mongoose');
var passport = require('passport');
var _ = require('lodash');
var User = mongoose.model('User');
const async = require('async');

/**
 * 查找用户
 * @param req
 * @param res
 * @param next
 * @param id
 */
exports.userByID = function (req, res, next, id) {
    User.findOne({
        _id: id
    }).exec(function (err, user) {
        if (err) return next(err);
        if (!user) return next(new Error('载入用户信息失败'));
        req.profile = user;
        next();
    });
};

/**
 * 验证用户是否登陆
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
exports.requireLogin = function (req, res, next) {
    if (!req.isAuthenticated() || !req.user.isActive) {
        return res.status(401).send({
            '提示信息': '用户未登陆'
        });
    }
    next();
};

/**
 * 用户是否通过验证
 * @param roles
 * @returns {Function}
 */
exports.hasAuthorization = function (roles) {
    var _this = this;

    return function (req, res, next) {
        _this.requireLogin(req, res, function () {
            if(_.intersection(req.user.roles, roles).length) {
                return next();
            } else {
                return res.status(403).send({
                    '提示信息': '用户没有通过验证'
                });
            }
        })
    }
};

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
};

/**
 * 登出
 * @param req
 * @param res
 */
exports.signout = function (req, res) {
    req.logout();
    res.redirect('/');
};

/**
 * 忘记密码
 * @param req
 * @param res
 * @param next
 */
exports.forgot = function (req, res, next) {

};

/**
 * 验证重置密码Token
 * @param req
 * @param res
 */
exports.validateResetToken = function (req, res) {

};

/**
 * 重置密码
 * @param req
 * @param res
 * @param next
 */
exports.reset = function (req, res, next) {

};

/**
 * 修改密码
 * @param req
 * @param res
 */
exports.changePassword = function (req, res) {

}

/**
 * 用户添加和更新
 * @param req
 * @param res
 */
exports.update = function (req, res) {

}

/**
 * 查询用户个人信息
 * @param req
 * @param res
 */
exports.me  =function (req, res) {

};

/**
 * 查询所有用户信息
 * @param req
 * @param res
 */
exports.list = function (req, res) {

}