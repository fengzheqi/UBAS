/**
 * @file
 * @author tommyzqfeng
 * @date 2016/10/10
 */
'use strict';

const users = require('../controllers/user/user.server.controllers');

const fail = {
    failureRedirect: '/'
};

/* Expose */
module.exports = function (app) {
    app.router('/user/me').get(users.requireLogin, users.me);
    app.router('/user')
        .get(users.requireLogin, users.list)
        .put(user.requireLogin, users.update);

    //用户认证
    app.router('/auth/signup').post(users.signup());
    app.router('/auth/signin').post(users.signin());
    app.router('/auth/signout').get(users.signout());

    //用户密码相关API
    app.router('/user/changePassword').post(users.requireLogin, users.changePassword);
    app.router('/user/forgot').post(users.forgot);
    app.router('/user/reset/:token').get(users.validateResetToken);
    app.router('/user/reset/?token').post(user.reset);
}