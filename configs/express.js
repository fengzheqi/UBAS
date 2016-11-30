/**
 * @file
 * @author tommyzqfeng
 * @date 2016/10/14
 */
'use strict';

/* Module dependencies */
const express = require('express');
const session = require('express-session');
const compression = require('compression');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const csrf = require('csurf');
const cors = require('cors');
const upload = require('multer')();

const mongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const winston = require('winston');
const helpers = require('view-helpers');
const config = require('./');

const pkg = require('../package.json');
const path = require('path');

const fs = require('fs');
const routes = path.join(__dirname, '../server/routes');

const env = process.env.NODE_ENV || 'development';

/* Expose */
module.exports = function (app, passport) {
    /* 压缩服务端静态文件 */
    app.use(compression({
        threshold: 512
    }));

    /* 配置CORS */
    app.use(cors());

    /* 配置静态资源路径 */
    app.use(express.static(config.root + '/public'));

    /* 在生产环境下用winston */
    let log = 'dev';
    if (env !== 'development') {
        log = {
            stream: {
                write: message => winston.info(message)
            }
        };
    }

    /* 非测试环境下打印http log */
    if (env !== 'test') app.use(morgan(log));

    app.set('views', config.root + '/public'); //设置views模板路径
    app.set('view engine', 'ejs'); //设置view模板解析器


    app.use(function (req, res, next) {
        res.locals.pkg = pkg;
        res.locals.env = env;
        next();
    });

    // bodyParser should be above methodOverride
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(upload.single('image'));
    app.use(methodOverride(function (req) {
        if (req.body && typeof req.body === 'object' && '_method' in req.body) {
            // look in urlencoded POST bodies and delete it
            var method = req.body._method;
            delete req.body._method;
            return method;
        }
    }));

    // CookieParser should be above session
    app.use(cookieParser());
    app.use(cookieSession({ secret: 'secret' }));
    app.use(session({
        resave: false,
        saveUninitialized: true,
        secret: pkg.name,
        store: new mongoStore({
            url: config.db,
            collection : 'sessions'
        })
    }));

    // use passport session
    app.use(passport.initialize());
    app.use(passport.session());

    // connect flash for flash messages - should be declared after sessions
    app.use(flash());

    // should be declared after session and flash
    app.use(helpers(pkg.name));

  //TODO
  //   if (env !== 'test') {
  //       app.use(csrf());
  //
  //       // This could be moved to view-helpers :-)
  //       app.use(function (req, res, next) {
  //           res.locals.csrf_token = req.csrfToken();
  //           next();
  //       });
  //   }

    // 配置路由
    fs.readdirSync(routes)
      .filter(file => ~file.search(/^[^\.].*\.js$/))
      .forEach(file => require(path.join(routes, file))(app));

    /* 错误相应 */
    app.use(function(err, req, res, next){
        if (err.message
            && (~err.message.indexOf('not found'))
            && (~err.message.indexOf('Cast to ObjectId failed'))) {
            return next();
        }

        console.error(err.stack);

        if(err.stack.includes('ValidationError')) {
            res.status(422).render('422', {error: err.stack});
            return;
        }

        res.status(500).render('500', {error: err.stack})
    });

    /* 404响应 */
    app.use(function (req, res) {
        const payload ={
            url: req.originalUrl,
            error: 'Not found'
        };
        if (req.accepts('html')) return res.status(404).render('404', payload);
        res.status(404).render('404', payload);
    });

    if (env === 'development') {
        app.locals.pretty = true;
    }
}





