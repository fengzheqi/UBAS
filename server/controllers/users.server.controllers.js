/**
 * @file
 * @author tommyzqfeng
 * @date 2016/10/11
 */

'use strict';

const mongoose = require('mongoose');
const {wrap: async} = require('co');
const {respond,respondOrRedirect} = require('../utils');
const User = mongoose.model('User');
const mailer = require('../mails');

/**
 * Load
 */
exports.load = async(function *(req, res, next, param){
  let criteria;
  if ( 'userId' in req.params) {
    criteria = {_id: param};
  }
  else {
    criteria = {username:param};
  }

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
    mailer(user);
    yield user.save();
    req.logIn(user, err => {
      if (err) req.flash('info', '对不起，您无法登录系统！');
      return res.redirect('/');
    });
  } catch (err) {
    const errors = Object.keys(err.errors)
      .map(field => err.errors[field].message);
  }
});

/**
 * 激活账号
 *
 */
exports.activeAccount = async(function *(req, res) {
  if(req.query.isActive==1) {
    const user = req.profile;
    user.isActive = true;
    try {
      yield user.save();
      req.flash('info', '您的账号已激活成功！');
      res.redirect('/');
      // respondOrRedirect({req, res}, url, obj, {type: 'info',text: '您的账号已激活成功！'});
    } catch (err) {

    }
  } else {
    res.redirect('/');
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
  respond(res, {
    title: 'Dashboard',
    user: user
  }, 200, 'tpl/main');
};