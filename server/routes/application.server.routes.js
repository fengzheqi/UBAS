/**
 * @file
 * @author tommyzqfeng
 * @date 2016/11/29
 */

const express = require('express');
const application = require('../controllers/application.server.controller');

module.exports = function (app) {
  app.route('/app')
    .put(application.create)
    .delete(application.delete)
    .post(application.update)
    .get(application.show);

  app.route('/app/static')
    .get(application.showStatic);

  app.route('/app/custom')
    .get(application.showCustom);
};