/**
 * @description DespositModel
 * @namespace DespositModel
 * @author yongjin<zjut_wyj@163.com> 2015/1/7
 */

define('DepositModel', ['BaseModel'], function (require, exports, module) {
  var DepositModel, BaseModel;

  BaseModel = require('BaseModel');

  DepositModel = BaseModel.extend({
    defaults: Est.extend({
    }, BaseModel.prototype.defaults),
    baseUrl: CONST.API + '/shop/deposit',
    BaseId: 'depositId',
    initialize: function () {
      this._initialize();
    }
  });

  module.exports = DepositModel;
});