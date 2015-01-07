/**
 * @description OrderList
 * @namespace OrderList
 * @author yongjin<zjut_wyj@163.com> 2015/1/8
 */
define('OrderList', ['BaseList', 'BaseView'],
  function (require, exports, module) {
    var OrderList, BaseList, BaseView;

    BaseView = require('BaseView');

    OrderList = BaseView.extend({
      initialize: function(){
        this._initialize({
          template: 'page: order; username: {{username}}'
        });
        this.render();
      },
      render: function(){
        this._render();
      }
    });

    module.exports = OrderList;
  });