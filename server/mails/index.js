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
// 本地测试邮件时打开
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV;

module.exports = function (obj, baseUrl) {
  const mailSmatOption = 'smtps://' + encodeURIComponent(process.env.MAIL_USER) + ':' + encodeURIComponent(process.env.MAIL_PASSWORD) + '@' + process.env.MAIL_SMAT_SERVER;
  // const mailSmatOption = 'smtps://fengzheqiyx@163.com:163@2045635683@smtp.163.com';
  const transporter = nodemailer.createTransport(mailSmatOption);
  const activeLink = ((env!=='development')?baseUrl:baseUrl+':'+port) + '/register/' + obj.id + '?isActive=1';


  const mailOptions = {
    from: '"UBAS"<' + process.env.MAIL_USER + '>',
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