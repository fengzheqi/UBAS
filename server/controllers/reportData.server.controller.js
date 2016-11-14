/**
 * @file
 * @author tommyzqfeng
 * @date 2016/11/14
 */
'use strict';

const mongoose = require('mongoose');
const {wrap: async} = require('co');
const only = require('only');
const ReportData = mongoose.model('ReportData');

/**
 * 新增监控数据
 */
exports.create = async(function *(req, res) {
  const data = new ReportData(req.query);
  data.timestamp = req.query.wwh;

  const regex = /^\:\:ffff\:/;
  if(regex.test(req.connection.remoteAddress.trim())) {
    data.ip = 'IPv6/' + req.connection.remoteAddress.split('::ffff:')[1];
  } else {
    data.ip = 'IPv4/' + req.connection.remoteAddress;
  }

  data.saveData();
  res.sendStatus(200);
});