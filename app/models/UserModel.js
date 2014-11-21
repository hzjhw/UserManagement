/**
 * @description UserModel
 * @namespace UserModel
 * @author yongjin on 2014/11/12
 */
define('UserModel', ['jquery', 'BaseModel'], function (require, exports, module) {
  var UserModel, BaseModel;

  BaseModel = require('BaseModel');

  UserModel = BaseModel.extend({
    baseId: 'userId',
    baseUrl: global.API + '/user/info',
    defaults: {
      name: '未登录'
    }
  });

  module.exports = UserModel;
});