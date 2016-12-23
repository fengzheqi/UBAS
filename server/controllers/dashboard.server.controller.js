/**
 * @file
 * @author tommyzqfeng
 * @date 2016/12/20
 */

const mongoose = require('mongoose');
const {wrap: async} = require('co');
const {respond, respondOrRedirect} = require('../utils');
const StaticData = mongoose.model('StaticData');

exports.show = async(function *(req, res) {
  const staticData = new StaticData();
  let data = {};
  const pv = yield StaticData.count();
  const uvs = yield StaticData.distinct('gu_id');
  const ips = yield StaticData.distinct('ip');
  const visitors = yield StaticData.find().limit(10).sort({'timestamp': -1});
  data.pv = pv;
  data.uv = uvs.length;
  data.ip = ips.length;
  data.visitors = visitors;
  respond(res, data, 200);
});