/**
 * @file
 * @author tommyzqfeng
 * @date 2016/12/22
 */

const express = require('express');
const dashboard = require('../controllers/dashboard.server.controller');

module.exports = function (app) {
  app.route('/app/dashboard')
    .get(dashboard.show);
}