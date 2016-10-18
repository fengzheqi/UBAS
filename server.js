/**
 * @file
 * @author tommyzqfeng
 * @date 2016/10/14
 */
'use strict';

/* Module dependencies */
require('dotenv').config();

const fs = require('fs');
const join = require('path').join;
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const config = require('./server/configs');

const models = join(__dirname, 'server/models');
const routes = join(__dirname, 'server/routes');

const port = process.env.PORT || 3000;
const app = express();

/* Expose */
module.exports = app;

/* 配置启动model */
fs.readdirSync(models)
    .filter(file => ~file.search(/^[^\.].*\.js$/))
    .forEach(file => require(join(models, file)));

/* 配置启动路径 */
require('./server/configs/passport')(passport);
require('./server/configs/express')(app, passport);
fs.readdirSync(routes)
    .filter(file => ~file.search(/^[^\.].*\.js$/))
    .forEach(file => require(join(routes, file))(app));

/* 启动系统 */
connect()
    .on('error', console.log)
    .on('disconnected', connect)
    .once('open', listen);



/**
 * 监听Http服务器启动
 */
function listen () {
    if (app.get('env') === 'test') return;
    app.listen(port);
    console.log('系统启动成功，访问地址：127.0.0.1：' + port);
}

/**
 * 连接Mongodb
 */
function connect () {
    var options = { server: { socketOptions: { keepAlive: 1 } } };
    console.log('数据库连接中...');
    return mongoose.connect(config.db, options).connection;
}
