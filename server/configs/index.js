/**
 * @file
 * @author tommyzqfeng
 * @date 2016/10/14
 */
'use strict';

/* Module dependencies */
const path = require('path');
const extend = require('util')._extend;

const development = require('./env/devlopment');
const production = require('./env/production');
const test = require('./env/test');

const notifier = {
    service: 'postmark',
    APN: false,
    email: true, // true
    actions: ['comment'],
    tplPath: path.join(__dirname, '..', 'app/mailer/templates'),
    key: 'POSTMARK_KEY'
};

const defaults = {
    root: path.join(__dirname, '../..'),
    notifier : notifier
};

/* Expose */
module.exports = {
    development: extend(development, defaults),
    production: extend(production, defaults),
    test: extend(test, defaults)
}[process.env.NODE_ENV || 'development'];

