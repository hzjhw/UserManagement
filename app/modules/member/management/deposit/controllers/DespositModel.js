/**
 * @description DespositModel
 * @namespace DespositModel
 * @author yongjin<zjut_wyj@163.com> 2015/1/7
 */

define('depositModel', ['BaseModel'], function (require, exports, module) {
  var depositModel, BaseModel;

  BaseModel = require('BaseModel');

  depositModel = BaseModel.extend({
    defaults: Est.extend({
    }, BaseModel.prototype.defaults),
    baseUrl: CONST.API + '/shop/deposit',
    BaseId: 'depositId',
    initialize: function () {
      this._initialize();
    }
  });

  module.exports = depositModel;
});