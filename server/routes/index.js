/**
 * @file
 * @author tommyzqfeng
 * @date 2016/10/10
 */

var express = require('express');

module.exports = function (app) {
    app.route('/')
        .get(function (req, res, next) {
            res.render('index', {title: 'UBAS'});
        });
};