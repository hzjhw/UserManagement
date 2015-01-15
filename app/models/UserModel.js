/**
 * @description UserModel
 * @namespace UserModel
 * @author yongjin on 2014/11/12
 */
define('UserModel', ['jquery', 'BaseModel'], function (require, exports, module) {
  var UserModel, BaseModel;

  BaseModel = require('BaseModel');

  UserModel = BaseModel.extend({
    defaults: Est.extend({
      name: '未登录',
      sex: '00'
    }, BaseModel.prototype.defaults),
    baseId: 'userId',
    baseUrl: CONST.API + '/user/detail',
    initialize: function () {
      this._initialize();
    }
  });

  module.exports = UserModel;
});