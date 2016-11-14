/**
 * @file
 * @author tommyzqfeng
 * @date 2016/11/14
 */
'use strict';

/**
 * Module dependencies
 */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * reportData scheme
 */
const ReportDataScheme = new Schema({
  guId: {
    type:String, default: '', trim: true
  },
  link: {
    type:String, default: '', trim: true
  },
  oldLink: {
    type:String, default: '', trim: true
  },
  title: {
    type:String, default: '', trim: true
  },
  sys: {
    type:String, default: '', trim: true
  },
  screen: {
    type:String, default: '', trim: true
  },
  browser: {
    type:String, default: '', trim: true
  },
  country: {
    type:String, default: '', trim: true
  },
  province: {
    type:String, default: '', trim: true
  },
  city: {
    type:String, default: '', trim: true
  },
  keyword: {
    type:String, default: '', trim: true
  },
  timestamp: {
    type:String, default: '', trim: true
  },
  ip: {
    type:String, default: '', trim: true
  }
});

/**
 * Methods
 */
ReportDataScheme.methods = {
  saveData: function () {
    return this.save();
  }
}

mongoose.model('ReportData', ReportDataScheme);