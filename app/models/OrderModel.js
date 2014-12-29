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

    }, BaseModel.prototype.defaults),
    initialize: function () {
      this._initialize();
    }
  });

  module.exports = OrderModel;
});