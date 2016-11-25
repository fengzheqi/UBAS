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

  //user routes
  app.get('/signup', users.signup);
  app.get('/signout', users.signout);
  app.get('/register/:userId', users.activeAccount);
  app.post('/users', users.create);
  app.post('/users/signin',
      pauth('local', {
          failureRedirect: '/',
          failureFlash: true,
      }), users.signin);

  app.get('/users/:username', users.show);


  app.get('/auth/github', pauth('github', fail), users.signin);
  app.get('/auth/github/callback', pauth('github', fail), users.authCallback);


  app.param('username', users.load);
  app.param('userId', users.load);

};