/**
 * @description OrderPay
 * @namespace OrderPay
 * @author yongjin<zjut_wyj@163.com> 2015/1/9
 */
define('OrderPay', ['BaseView', 'template/order_pay'], function (require, exports, module) {
  var OrderPay, BaseView, template;

  BaseView = require('BaseView');
  template = require('template/order_pay');

  OrderPay = BaseView.extend({
    initialize: function () {
      this._initialize({
        template: template
      });
      this.render();
    },
    render: function () {
      this._render();
    }
  });

  module.exports = OrderPay;
});