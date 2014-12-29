/**
 * @description main
 * @namespace main
 * @author yongjin<zjut_wyj@163.com> 2014/12/29
 */
function initShopPanel(callback) {
  seajs.use(['BaseView'], function (BaseView) {
    var ShopPanel = BaseView.extend({
      initialize: function () {
        this._initialize({
          template: '<div class="jhw-main-inner"></div>'
        });
      },
      render: function () {
        this._render();
      }
    });
    app.addPanel('shopPanel', new ShopPanel({
      el: '#jhw-main'
    })).on('after', callback).render();
  });
}
app.addRoute('shop', function () {
  initShopPanel(function () {
    seajs.use(['OrderList'], function (OrderList) {
      app.addView('orderList', new OrderList({
        el: '.jhw-main-inner',
        viewId: 'orderList'
      }));
    });
  })
});
app.addRoute('shop/pay_type', function(){
  initShopPanel(function(){
    seajs.use(['PayTypeList'], function(PayTypeList){
      app.addView('payTypeList', new PayTypeList({
        el: '.jhw-main-inner',
        viewId: 'payTypeList'
      }));
    });
  });
});

app.addModule('OrderList', 'modules/shop/controllers/OrderList.js');
app.addModule('OrderDetail', 'modules/shop/controllers/OrderDetail.js');
app.addModule('PayTypeList', 'modules/shop/controllers/PayTypeList.js');
app.addModule('PayTypeModel', 'models/PayTypeModel.js');
app.addModule('OrderModel', 'models/OrderModel.js');
app.addModule('PayTypeDetail', 'modules/shop/controllers/PayTypeDetail.js');

app.addTemplate('template/order_list', function(require, exports, module){
  module.exports = require('modules/shop/views/order_list.html');
});
app.addTemplate('template/order_item', function(require, exports, module){
  module.exports = require('modules/shop/views/order_item.html');
});
app.addTemplate('template/pay_type_list', function(require, exports, module){
  module.exports = require('modules/shop/views/pay_type_list.html');
});
app.addTemplate('template/pay_type_item', function(require, exports, module){
  module.exports = require('modules/shop/views/pay_type_item.html');
});
app.addTemplate('template/pay_type_detail', function(require, exports, module){
  module.exports = require('modules/shop/views/pay_type_detail.html')
});