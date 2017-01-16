/**
 * @file
 * @author tommyzqfeng
 * @date 2016/10/12
 */
'use strict';

module.exports = {
  db: 'mongodb://'+ process.env.DB_USER+':'+ process.env.DB_PWD + '@'+(process.env.DB_SERVER || 'localhost')+ '/ubas_dev'
}