/**
 * @file
 * @author tommyzqfeng
 * @date 2016/11/14
 */

const mongoose = require('mongoose');
const {wrap: async} = require('co');
const only = require('only');
const rqt = require('request');
const StaticData = mongoose.model('StaticData');


/**
 * 新增监控数据
 */
exports.create = async(function *(req, res) {
  const data = req.query;
  const staticData = new StaticData(only(data, 'url referer title screen gu_id timestamp following'));
  const regex = /^\:\:ffff\:/;

  let keyword = getKeyword(data.referer);
  let system = getSysInfo(data.userAgent);
  let browser = getBrowserType(data.userAgent);
  let ip='', address = {};

  if (req.headers['x-real-ip']) {
    ip = req.headers['x-real-ip'];
  } else {
    if(regex.test(req.connection.remoteAddress.trim())) {
      ip = req.connection.remoteAddress.split('::ffff:')[1];
    } else {
      ip = req.connection.remoteAddress;
    }
  }

  let checkIpURL = 'http://ip.taobao.com/service/getIpInfo.php?ip=' + ip;
  rqt(checkIpURL, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      body = JSON.parse(body);
      address = body.data;
    }
    staticData.saveData({
      keyword: keyword,
      system: system,
      browser: browser,
      ip: ip,
      address: address
    });
  });

  res.sendStatus(200);
});

/**
 * 获取来自搜索引擎的关键词
 * @param url
 * @returns {*}
 * @constructor
 */
function getKeyword(url) {
  if (url.toString().indexOf("baidu") > 0) {
    return request(url, "wd");
  }
  else if (url.toString().indexOf("google") > 0) {
    return request(url, "q");
  }
  else if (url.toString().indexOf("sogou") > 0) {
    return request(url, "query");
  }
  else if (url.toString().indexOf("soso") > 0) {
    return request(url, "w");
  }
  else {
    return "";
  }
}

/**
 * 获取链接地址中某个参数的值
 * @param url
 * @param paras
 * @returns {*}
 */
function request(url, paras) {
  var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
  var paraObj = {};
  var i,j;
  for (i = 0;j = paraString[i]; i++) {
    paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
  }
  var returnValue = paraObj[paras.toLowerCase()];
  if (typeof (returnValue) == "undefined") {
    return "";
  } else {
    return returnValue;
  }
}

/**
 * 获取系统信息
 * @returns {string|string|string|string|string|string|*}
 */
function getSysInfo(ua) {
  var isWin10 = ua.indexOf('nt 10.0') > -1;
  var isWin8 = ua.indexOf('nt 6.2') >-1;
  var isWin7 = ua.indexOf("nt 6.1") > -1;
  var isVista = ua.indexOf("nt 6.0") > -1;
  var isWin2003 = ua.indexOf("nt 5.2") > -1;
  var isWinXp = ua.indexOf("nt 5.1") > -1;
  var isWin2000 = ua.indexOf("nt 5.0") > -1;
  var isWindows = (ua.indexOf("windows") != -1 || ua.indexOf("win32") != -1);
  var isMac = (ua.indexOf("macintosh") != -1 || ua.indexOf("mac os x") != -1);
  var isAir = (ua.indexOf("adobeair") != -1);
  var isLinux = (ua.indexOf("linux") != -1);
  var broser = "",sys;
  if (isWin10) {
    sys = "Windows 10";
  } else if (isWin8) {
    sys = "Windows 8";
  } else if (isWin7) {
    sys = "Windows 7";
  } else if (isVista) {
    sys = "Vista";
  } else if (isWinXp) {
    sys = "Windows xp";
  } else if (isWin2003) {
    sys = "Windows 2003";
  } else if (isWin2000) {
    sys = "Windows 2000";
  } else if (isWindows) {
    sys = "Windows";
  } else if (isMac) {
    sys = "Macintosh";
  } else if (isAir) {
    sys = "Adobeair";
  } else if (isLinux) {
    sys = "Linux";
  } else {
    sys = "Unknow";
  }
  return sys;
}

/**
 * 获取浏览器类型
 * @returns {*}
 * @constructor
 */
function getBrowserType(ua) {
  if (ua == null) return "ie";
  else if (ua.indexOf('chrome') != -1) return "chrome";
  else if (ua.indexOf('opera') != -1) return "opera";
  else if (ua.indexOf('msie') != -1) return "ie";
  else if (ua.indexOf('safari') != -1) return "safari";
  else if (ua.indexOf('firefox') != -1) return "firefox";
  else if (ua.indexOf('gecko') != -1) return "gecko";
  else return "ie";
}