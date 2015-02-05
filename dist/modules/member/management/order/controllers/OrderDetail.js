/**
 * @description OrderDetail
 * @namespace OrderDetail
 * @author yongjin<zjut_wyj@163.com> 2015/1/8
 */
define('OrderDetail', ['BaseView', 'template/order_detail', 'backbone'],
  function (require, exports, module) {
    var OrderDetail, template, BaseView, Backbone;

    BaseView = require('BaseView');
    template = require('template/order_detail');
    Backbone = require('backbone');

    OrderDetail = BaseView.extend({
      events: {
        'click .btn-pay': 'orderPay'
      },
      initialize: function () {
        this._initialize({
          template: template
        });
        this.render();
      },
      orderPay: function(){
        this.model.set('username', app.getData('user').username);
        app.addData('curOrderModel', Est.cloneDeep(this.model.attributes));
        Backbone.history.navigate('#/order/pay', true);
      },
      render: function () {
        this._render();
      }
    });


    module.exports = OrderDetail;
  });