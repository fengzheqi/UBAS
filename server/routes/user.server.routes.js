/**
 * @file
 * @author tommyzqfeng
 * @date 2016/10/10
 */
'use strict';

const user = require('../controllers/user.server.controllers');

const fail = {
    failureRedirect: '/'
};

/* Expose */
module.exports = function (app) {
    app.route('/user/me').get(user.requireLogin, user.me);
    app.route('/user')
        .get(user.requireLogin, user.list)
        .put(user.requireLogin, user.update);

    //用户认证
    // app.route('/auth/signup').post(user.signup());
    // app.route('/auth/signin').post(user.signin());
    // app.route('/auth/signout').get(user.signout());
    //
    // //用户密码相关API
    // app.route('/user/changePassword').post(user.requireLogin, user.changePassword);
    // app.route('/user/forgot').post(user.forgot);
    // app.route('/user/reset/:token').get(user.validateResetToken);
    // app.route('/user/reset/?token').post(user.reset);

    //绑定中间件
    // app.param('userId', user.userByID);
}