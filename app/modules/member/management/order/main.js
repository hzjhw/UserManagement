/**
 * @description main
 * @namespace main
 * @author yongjin<zjut_wyj@163.com> 2015/1/7
 */
app.addRoute('order', function () {
  seajs.use(['jquery', 'OrderList'], function (jquery, OrderList) {
    app.addPanel('main', {
      el: '#main',
      template: '<div class="main-inner"></div>'
    }).addView('orderList', new OrderList({
      el: '.main-inner',
      viewId: 'orderList',
      data: app.getData('user'),
      items: app.getData('user')['orderSet'],
      page: parseInt(Est.cookie('orderList_page')) || 1,
      pageSize: parseInt(Est.cookie('orderList_pageSize')) || 10,
      pagination: true
    }));
    app.getView('breadcrumb').reload('订单列表');
  });
});
app.addRoute('order/detail', function () {
  seajs.use(['OrderDetail'], function (OrderDetail) {
    app.addPanel('main', {
      el: '#main',
      template: '<div class="main-inner"></div>'
    }).addView('orderDetail', new OrderDetail({
      el: '.main-inner',
      data: app.getData('curOrderModel')
    }));
    app.getView('breadcrumb').reload('订单详情['+app.getData('curOrderModel').orderSn+']');
  });
});
app.addRoute('order/pay', function(){
  seajs.use(['OrderPay'], function(OrderPay){
    app.addPanel('main', {
      el: '#main',
      template: '<div class="main-inner"></div>'
    }).addView('orderPay', new OrderPay({
      el: '.main-inner',
      viewId: 'orderPay',
      data: app.getData('curOrderModel')
    }));
  });
});

app.addModule('OrderList', 'modules/member/management/order/controllers/OrderList.js');
app.addModule('OrderDetail', 'modules/member/management/order/controllers/OrderDetail.js');
app.addModule('OrderPay', 'modules/member/management/order/controllers/OrderPay.js');
app.addTemplate('template/order_list', function (require, exports, module) {
  module.exports = require('modules/member/management/order/views/order_list.html');
});
app.addTemplate('template/order_item', function (require, exports, module) {
  module.exports = require('modules/member/management/order/views/order_item.html');
});
app.addTemplate('template/order_detail', function (require, exports, module) {
  module.exports = require('modules/member/management/order/views/order_detail.html');
});
app.addTemplate('template/order_pay', function(require, exports, module){
  module.exports = require('modules/member/management/order/views/order_pay.html');
});