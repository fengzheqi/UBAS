/**
 * @file
 * @author tommyzqfeng
 * @date 2016/11/21
 */
'use strict';

/**
 * Module dependencies
 */
const nodemailer = require('nodemailer');
const markdown = require('nodemailer-markdown').markdown;
const ejs = require('ejs');

module.exports = function (obj) {
  const mailSmatOption = 'smtps://' + process.env.MAIL_USER + ':' + process.env.MAIL_PASSWORD + '@' + process.env.MAIL_SMAT_SERVER;
  const transporter = nodemailer.createTransport(mailSmatOption);
  const activeLink = process.env.SERVER_URL + '/register/' + obj.userId + '?isActive=1';

  // setup e-mail data with unicode symbols
  const mailOptions = {
    from: process.env.MAIL_FROM,
    to: obj.email,
    subject: '注册成功（UBAS）', // Subject line
    markdown: '# 注册成功 \n\n 恭喜您成功注册UBAS(User Behavior Analysis System)，请点击[此处]('+ activeLink +')完成账号激活'
  };

  transporter.use('compile', markdown());
  transporter.sendMail(mailOptions, function(error, info){
    if(error) return console.log(error);
    console.log('Message sent: ' + info.response);
  });
};