/**
 * @file
 * @author tommyzqfeng
 * @date 2016/10/17
 */
'use strict';

const _ = require('lodash');
const glob = require('glob');

/**
 * 取目录下文件
 * @param globPatterns
 * @param removeRoot
 * @returns {Array}
 */
module.exports.getGlobbedFiles = function (globPatterns, removeRoot) {
    var _this  = this;
    var urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');
    var output =[];

    if (_.isArray(globPatterns)) {
        globPatterns.forEach(function (globPattern) {
            output = _.union(output, _this.getGlobbedFiles(globPattern,removeRoot));
        });
    } else if (_.isString(globPatterns)) {
        if (urlRegex.test(globPatterns)) {
            output.push(globPatterns);
        } else {
            glob.sync(globPatterns).forEach(function (files) {
                if (removeRoot) {
                    files = files.map(function (file) {
                        return file.replace(removeRoot, '');
                    });
                }

                output = _.union(output, files);
            })
        }
    }

    return output;
}

/**
 *  取JavaScript脚本资源
 * @param includeTests
 * @returns {Array}
 */
module.exports.getJavaScriptAssets = function(includeTests) {
    var output = this.getGlobbedFiles(this.assets.lib.js.concat(this.assets.js), 'public/');

    // To include tests
    if (includeTests) {
        output = _.union(output, this.getGlobbedFiles(this.assets.tests));
    }

    return output;
};

/**
 * 取CSS资源
 * @returns {Array}
 */
module.exports.getCSSAssets = function() {
    var output = this.getGlobbedFiles(this.assets.lib.css.concat(this.assets.css), 'public/');
    return output;
};