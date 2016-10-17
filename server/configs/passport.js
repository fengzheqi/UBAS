/**
 * @file
 * @author tommyzqfeng
 * @date 2016/10/13
 */
'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('User');

const local = require('./passport/local');

module.exports = function (passport) {

    // 序列化sessions
    passport.serializeUser((user, cb) => cb(null, user.id));
    passport.deserializeUser((id, cb) => User.load({
        criteria:{_id: id}
    }, cb));

    // use strategies
    passport.use(local);
}