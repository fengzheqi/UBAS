/**
 * @file
 * @author tommyzqfeng
 * @date 2016/10/11
 */

'use strict';

const mongoose = require('mongoose');
const {wrap: async} = require('co');
const {respond} = require('../utils');
const User = mongoose.model('User');

/**
 * Load
 */
exports.load = async(function *(req, res, next, _username){
  const criteria = {username:_username};
  try {
    req.profile = yield  User.load({criteria});
    if (!req.profile) return next(new Error('用户未找到！'));
  } catch (err) {
    return next(err);
  }
  next();
});

/**
 * 注册跳转
 */
exports.signup = function (req, res) {
  res.render('tpl/users/signup', {
    title: 'Sign up',
    user: new User()
  })
};
/**
 * 注册提交
 */
exports.create = async(function *(req, res) {
  const user = new User(req.body);
  user.provider = 'local';
  try {
    yield user.save();
    req.logIn(user, err => {
      if (err) req.flash('info', '对不起，您无法登录系统！');
      return res.redirect('/');
    });
  } catch (err) {
    const errors = Object.keys(err.errors)
      .map(field => err.errors[field].message);

    res.render('user/signup', {
      title: 'Sign up',
      errors,
      user
    })
  }
});

/**
 * 登录
 * @param req
 * @param res
 */
exports.signin = function (req, res) {
  res.redirect('/users/' + req.user.username);
};
exports.authCallback = function (req, res) {
  res.redirect('/users/' + req.user.username);
};

/**
 * 退出系统
 * @param req
 * @param res
 */
exports.signout = function (req, res) {
  req.logout();
  res.redirect('/');
};

/**
 * 进入主界面
 * @param req
 * @param res
 */
exports.show = function (req, res) {
  const user = req.profile;
  respond(res, 'tpl/main', {
    title: 'Dashboard',
    user: user
  });
};