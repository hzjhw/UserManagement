/**
 * @description UserModel
 * @namespace UserModel
 * @author jihui-wxw on 2014/11/12
 */
define('LoginModel', ['jquery', 'BaseModel'], function (require, exports, module) {
  var LoginModel, BaseModel;

  BaseModel = require('BaseModel');
  LoginModel = BaseModel.extend({
    defaults: Est.extend({
      username: '',
      password: '',
      randCode: ''
    }, BaseModel.prototype.defaults),
    baseId: 'loginId',
    baseUrl: CONST.API + '/user/login',
    initialize: function () {
      this._initialize();
    }
  });
  module.exports = LoginModel;
});