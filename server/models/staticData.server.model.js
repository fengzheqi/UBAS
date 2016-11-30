/**
 * @file
 * @author tommyzqfeng
 * @date 2016/11/29
 */

/**
 * Module dependencies
 */
const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const StaticDataScheme = new Scheme({
  following: {
    type: String,
    default: '',
  }, // 隶属项目
  ip: {
    type: String,
    default: '',
  }, // ip地址
  keyword: {
    type: String,
    default: '',
  }, // 搜索关键字
  timestamp: {
    type: Number,
  }, // 时间戳
  address: {
    type: Object,
    default: null,
  }, // 地理信息
  browser: {
    type: String,
    default: '',
  }, // 浏览器类别
  screen: {
    type: String,
    default: '',
  }, // 屏幕分辨率
  system: {
    type: String,
    default: '',
  }, // 系统
  title: {
    type: String,
    default: '',
  }, // html中title
  referer: {
    type: String,
    default: '',
  }, // 上一页跳转链接
  url: {
    type: String,
    default: '',
  }, // 当前页链接
  gu_id: {
    "type": String,
    default: '',
  } // 用户ID
});

/**
 * Methods
 */
StaticDataScheme.methods = {
  saveData: function (data) {
    this.keyword = data.keyword;
    this.system = data.system;
    this.browser = data.browser;
    this.ip = data.ip;
    this.address = this.location;
    return this.save();
  },
};

mongoose.model('StaticData', StaticDataScheme);

