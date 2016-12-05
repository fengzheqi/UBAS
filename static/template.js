/**
 * @file
 * @author tommyzqfeng
 * @date 2016/11/17
 */
'use strict';

;(function () {
  var s = document.createElement('script');
  s.id = 'feDataReport';
  s.type= 'text/javascript';
  s.src= 'https://ubas.herokuapp.com/static/reportData.js?appId=811756202';
  document.body.appendChild(s);
  s = null;
})();