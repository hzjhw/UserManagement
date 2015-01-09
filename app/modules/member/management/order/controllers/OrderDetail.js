/**
 * @description OrderDetail
 * @namespace OrderDetail
 * @author yongjin<zjut_wyj@163.com> 2015/1/8
 */
define('OrderDetail', ['BaseView', 'template/order_detail'],
  function (require, exports, module) {
    var OrderDetail, template, BaseView;

    BaseView = require('BaseView');
    template = require('template/order_detail');

    OrderDetail = BaseView.extend({
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


    module.exports = OrderDetail;
  });