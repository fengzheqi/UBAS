/**
 * @file
 * @author tommyzqfeng
 * @date 2016/10/10
 */

var express = require('express');
const reportData = require('../controllers/reportData.server.controller')

module.exports = function (app) {
  app.route('/')
    .get(function (req, res, next) {
     res.render('index',{title: 'UBAS'});
    });

  app.route('/_fe.gif')
    .get(reportData.create);
};