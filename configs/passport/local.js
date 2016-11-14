/**
 * @file
 * @author tommyzqfeng
 * @date 2016/10/11
 */
'use strict';

const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;
const User = mongoose.model('User');

module.exports = new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, function (username, password, done) {
    const options = {
        criteria: {username: username},
        select: 'username email hashed_password salt'
    };
    User.load(options, function (err, user) {
        if (err) return done(err);

        if (!user) {
            return done(null, false, {message: '用户不存在'});
        }

        if (!user.authenticate(password)) {
            return done(null, false, {message: '密码错误'});
        }

        if (!user.isActive) {
            return done(null, false, {message: '账号未激活'});
        }

        return done(null, user);
    });
});