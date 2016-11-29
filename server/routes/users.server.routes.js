/**
 * @file
 * @author tommyzqfeng
 * @date 2016/10/10
 */
'use strict';

const users = require('../controllers/users.server.controllers');
const passport = require('passport');

const fail = {
    failureRedirect: '/'
};

/* Expose */
module.exports = function (app) {
  const pauth = passport.authenticate.bind(passport);

  app.get('/signup', users.signup);  //注册
  app.post('/signup', users.create);
  app.get('/register/:userId', users.activeAccount); //激活
  app.post('/signin',  //登录
      pauth('local', {
          failureRedirect: '/',
          failureFlash: true,
      }), users.signin);
  app.get('/signout', users.signout); //登出
  app.get('/users/:username', users.show);

  app.get('/auth/github', pauth('github', fail), users.signin); //Github登入
  app.get('/auth/github/callback', pauth('github', fail), users.authCallback);

  // Params
  app.param('username', users.load);
  app.param('userId', users.load);
};