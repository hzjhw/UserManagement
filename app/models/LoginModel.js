/**
 * @description UserModel
 * @namespace UserModel
 * @author yongjin on 2014/11/12
 */
define('LoginModel', ['jquery', 'BaseModel'], function (require, exports, module) {
  var LoginModel, BaseModel;

  BaseModel = require('BaseModel');

    LoginModel = BaseModel.extend({
    baseId: 'userId',
    baseUrl: 'http://jihui88.com/rest/api/user/login',
    defaults: {
      name: '未登录'
    }
  });

  module.exports = LoginModel;
});