/**
 * @file
 * @author tommyzqfeng
 * @date 2016/10/10
 */

var express = require('express');
const reportData = require('../controllers/reportData.server.controller')

module.exports = function (app) {
  app.route('/')
    .get(function (req, res) {
      let errorInfo = res.locals.errors;
      let info = res.locals.info;
      res.render('index', {
        title: 'UBAS',
        errorInfo: errorInfo
      });
    });

  app.route('/_fe.gif')
    .get(reportData.create);

};