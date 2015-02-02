/**
 * @description 订单
 * @namespace OrderModel
 * @author yongjin<zjut_wyj@163.com> 2014/12/29
 */
define('OrderModel', ['BaseModel'], function (require, exports, module) {
  var OrderModel, BaseModel;
  BaseModel = require('BaseModel');

  OrderModel = BaseModel.extend({
    defaults: Est.extend({
      isInvoice: false,
      invoiceAmount: 0
    }, BaseModel.prototype.defaults),
    baseUrl: CONST.API + '/order/detail',
    baseId: 'orderId',
    initialize: function () {
      this._initialize();
    }
  });

  module.exports = OrderModel;
});