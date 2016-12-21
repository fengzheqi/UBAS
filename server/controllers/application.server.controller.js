/**
 * @file
 * @author tommyzqfeng
 * @date 2016/11/29
 */

const mongoose = require('mongoose');
const User = mongoose.model('User');
const {wrap: async} = require('co');
const {respond, respondOrRedirect} = require('../utils');
const crypto = require('crypto');

/**
 * 添加项目
 */
exports.create = async(function *(req, res) {
  let appId = crypto.createHash('sha1').update((+new Date())+'').digest('hex');
  let user = yield User.load({select: 'follows', criteria:{_id: req.user.id}});

  user.follows[appId] = {name: req.body.appName, timestamp: +new Date(), desc: req.body.appDesc};
  user.markModified('follows');
  user.updateAndSave();
  respond(res, {status:1}, 200);
});

/**
 * 删除项目
 */
exports.delete = async(function *(req, res) {
  let user = yield User.load({select: 'follows', criteria:{_id: req.user.id}});
  delete user.follows[req.body.appId];
  user.markModified('follows');
  user.updateAndSave();
  respond(res, {status:1}, 200);
});

/**
 * 修改项目
 */
exports.update = async(function *(req, res) {
  let user = yield User.load({select: 'follows', criteria:{_id: req.user.id}});
  user.follows[req.body.appId].name = req.body.appName;
  user.follows[req.body.appId].desc = req.body.appDesc;
  user.markModified('follows');
  user.updateAndSave();
  respond(res, {status:1}, 200);
});

/**
 * 查询项目列表
 */
exports.show = async(function *(req, res) {
  let user = yield User.load({select: 'follows', criteria:{_id: req.user.id}});
  let appList = Object.keys(user.follows);

  let app = [];
  for(let v of appList) {
    let item = {
      appId: v,
      appName: user.follows[v].name,
      timestamp:user.follows[v].timestamp,
      appDesc: user.follows[v].desc
    };
    item.text = ';(function () {var s = document.createElement("script");s.id = "feDataReport";s.type= "text/javascript";s.src= "' +
      req.protocol + '://' +req.hostname + '/static/reportData.js?appId=' + v + ';document.body.appendChild(s);s = null;})();';
    app.push(item);
  }
  respond(res, app, 200);
});


exports.showStatic  = async(function *(req, res) {

});

exports.showCustom  = function (req, res) {

};