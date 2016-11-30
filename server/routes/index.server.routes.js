/**
 * @file
 * @author tommyzqfeng
 * @date 2016/10/10
 */

const express = require('express');
const staticData = require('../controllers/staticData.server.controller');

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
    .get(staticData.create);

};