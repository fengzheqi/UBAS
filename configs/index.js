/**
 * @file
 * @author tommyzqfeng
 * @date 2016/10/14
 */
'use strict';

/* Module dependencies */
const path = require('path');

const development = require('./env/devlopment');
const production = require('./env/production');
const test = require('./env/test');

const defaults = {
    root: path.join(__dirname, '../')
};

/* Expose */
module.exports = {
    development: Object.assign(development, defaults),
    production: Object.assign(production, defaults),
    test: Object.assign(test, defaults)
}[process.env.NODE_ENV || 'development'];

