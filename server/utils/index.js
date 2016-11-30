/**
 * @file
 * @author tommyzqfeng
 * @date 2016/11/16
 */
'use strict';

module.exports = {
  respond,
  respondOrRedirect
};

/**
 *
 * @param res
 * @param tpl
 * @param obj
 * @param status
 */
function respond(res, obj, status, tpl) {
  res.format({
    html: () => res.render(tpl, obj),
    json: () => {
      if (status) return res.status(status).json(obj);
      res.json(obj);
    }
  });
}

/**
 *
 * @param req
 * @param res
 * @param url
 * @param obj
 * @param flash
 */
function respondOrRedirect({req, res}, url='/', obj={}, flash) {
  res.format({
    html: () => {
      if (req && flash) req.flash(flash.type, flash.text);
      res.redirect(url);
    },
    json: ()=> res.json(obj)
  })
}