/**
 * @file
 * @author tommyzqfeng
 * @date 2016/10/11
 */

'use strict';

/**
 * Module dependencies
 */
const mongoose = require('mongoose');
const crypto = require('crypto');

const Scheme = mongoose.Schema;
const oAuthTypes = [
  'github'
];

/**
 * User Scheme
 */
const UserSchem = new Scheme({
  name: {type: String, default: ''},
  email: {type: String, default: ''},
  username: {type: String, default: ''},
  provider: {type: String, default: ''},
  hashed_password: {type: String, default: ''},
  salt: {type: String, default: ''},
  authToken: {type: String, default: ''},
  isActive : {type: Boolean, default: false},
  github: {}
});

const validatePresenceOf = value => value && value.length;

/**
 * Virtuals
 */
UserSchem.virtual('password')
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

/**
 * Validations
 */
UserSchem.path('name')
  .validate(function (name) {
  if (this.skipValidation()) return true;
  return name.length;
}, '用户名不能为空');

UserSchem.path('email')
  .validate(function (email) {
  if (this.skipValidation()) return true;
  return email.length;
}, '邮箱不能为空');

UserSchem.path('email')
  .validate(function (email, fn) {
  const User = mongoose.model('User');
  if (this.skipValidation()) fn(true);

  if (this.isNew || this.isModified('email')) {
    User.find({email: email}).exec(function (err, users) {
      fn(!err && users.length ===0);
    });
  } else {
    fn(true);
  }
}, '邮箱已注册');

UserSchem.path('username')
  .validate(function (username) {
  if (this.skipValidation()) return true;
  return username.length;
}, '用户名不能为空');

UserSchem.path('hashed_password')
  .validate(function (hashed_password) {
  if (this.skipValidation()) return true;
  return hashed_password.length && this._password.length;
}, '密码不能为空');

/**
 * Pre-save hook
 */
UserSchem.pre('save', function (next) {
  if (!this.isNew) return next();

  if (!validatePresenceOf(this.password) && !this.skipValidation()) {
    next(new Error('密码不正确'));
  } else {
    next();
  }
});

/**
 * Methods
 */
UserSchem.methods = {
  /**
   * Authenticate - 核实密码是否正确
   */
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  /**
   * 生成盐值
   * @returns {string}
   */
  makeSalt: function () {
    return Math.round((new Date().valueOf() * Math.random())) + '';
  },

  /**
   * 加密原始密码
   * @param password 原始密码
   * @returns {*}
   */
  encryptPassword: function (password) {
    if (!password) return '';
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
    } catch (err) {
      return '';
    }
  },

  /**
   * OAuth认证，跳过本地验证
   * @returns {number}
   */
  skipValidation: function () {
    return ~oAuthTypes.indexOf(this.provider);
  }
};

/**
 * Statics
 */
UserSchem.statics = {
  /**
   *
   * @param option
   * @param cb
   * @returns {*|Promise|Array|{index: number, input: string}}
   */
  load: function (options, cb) {
    options.select = options.select || 'username email isActive';
    return this.findOne(options.criteria)
      .select(options.select)
      .exec(cb);
  }
};

mongoose.model('User', UserSchem);



