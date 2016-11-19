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
      var error = req.flash('info');
      var message = req.flash('message');
      res.render('index', {
        title: 'UBAS',
        error: error
      });
    });

  app.route('/_fe.gif')
    .get(reportData.create);

};