/**
 * @description LoginModel
 * @namespace LoginModel
 * @author yongjin<zjut_wyj@163.com> 2015/1/7
 */
define('LoginModel', ['BaseModel'], function (require, exports, module) {
  var LoginModel, BaseModel;

  BaseModel = require('BaseModel');

  LoginModel = BaseModel.extend({
    defaults: Est.extend({

    }, BaseModel.prototype.defaults),
    baseUrl: CONST.API + '/shop/member/login2',
    BaseId: 'memberId',
    initialize: function () {
      this._initialize();
    }
  });

  module.exports = LoginModel;
});