/**
 * @file
 * @author tommyzqfeng
 * @date 2016/10/11
 */
'use strict';

/**
 *  Module dependencies
 */
const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;
const User = mongoose.model('User');

/**
 * Expose
 */
module.exports = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, function (email, password, done) {
    const options = {
        criteria: {email: email},
        select: 'name username email hashed_password salt'
    };
    User.load(options, function (err, user) {
        if (err) return done(err);

        if (!user) {
            return done(null, false, {message: '用户名错误'});
        }

        if (!user.authenticate(password)) {
            return done(null, false, {message: '密码错误'});
        }

        return done(null, user);
    });
});