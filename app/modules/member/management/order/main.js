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
      data: app.getData('user')
    }));
  });
});

app.addModule('OrderList', 'modules/member/management/order/controllers/OrderList.js');
