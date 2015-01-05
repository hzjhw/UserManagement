/**
 * @description PaymentModel
 * @namespace PaymentModel
 * @author yongjin<zjut_wyj@163.com> 2015/1/5
 */
define('PaymentModel', ['BaseModel'], function (require, exports, module) {
  var PaymentModel, BaseModel;

  BaseModel = require('BaseModel');

  PaymentModel = BaseModel.extend({
    initialize: function () {
      this._initialize();
    },
    defaults: Est.extend({}, BaseModel.prototype.defaults),
    baseUrl: CONST.API + '/orderPayment/detail',
    baseId: 'orderId'
  });

  module.exports = PaymentModel;
});