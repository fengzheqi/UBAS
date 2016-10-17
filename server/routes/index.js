/**
 * @file
 * @author tommyzqfeng
 * @date 2016/10/10
 */

var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('index', {title: 'UBAS'});
})

module.exports = router;