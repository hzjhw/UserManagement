/**
 * @description main
 * @namespace main
 * @author yongjin<zjut_wyj@163.com> 2014/12/29
 */
app.addRoute('shop', function () {
  seajs.use(['OrderList'], function (OrderList) {
    app.addPanel('main', {
      el: '#jhw-main',
      template: '<div class="jhw-main-inner"></div>'
    }).addView('orderList', new OrderList({
      el: '.jhw-main-inner'
    }));
  });
});
app.addRoute('shop/pay_type', function () {
  seajs.use(['PayTypeList'], function (PayTypeList) {
    app.addPanel('main', {
      el: '#jhw-main',
      template: '<div class="jhw-main-inner"></div>'
    }).addView('payTypeList', new PayTypeList({
      el: '.jhw-main-inner'
    }));
  });
});
app.addRoute('shop/delivery_corp', function () {
  seajs.use(['DeliveryCorpList'], function (DeliveryCorpList) {
    app.addPanel('main', {
      el: '#jhw-main',
      template: '<div class="jhw-main-inner"></div>'
    }).addView('deliveryCorpList', new DeliveryCorpList({
      el: '.jhw-main-inner'
    }));
  });
});
app.addRoute('shop/delivery_type', function () {
  seajs.use(['DeliveryTypeList'], function (DeliveryTypeList) {
    app.addPanel('main', {
      el: '#jhw-main',
      template: '<div class="jhw-main-inner"></div>'
    }).addView('deliveryTypeList', new DeliveryTypeList({
      el: '.jhw-main-inner'
    }));
  });
});
app.addRoute

app.addModule('OrderList', 'modules/shop/controllers/OrderList.js');
app.addModule('OrderDetail', 'modules/shop/controllers/OrderDetail.js');
app.addModule('PayTypeList', 'modules/shop/controllers/PayTypeList.js');
app.addModule('PayTypeModel', 'models/PayTypeModel.js');
app.addModule('OrderModel', 'models/OrderModel.js');
app.addModule('PayTypeDetail', 'modules/shop/controllers/PayTypeDetail.js');

app.addModule('DeliveryCorpModel', 'models/DeliveryCorpModel.js');
app.addModule('DeliveryCorpList', 'modules/shop/controllers/DeliveryCorpList.js');
app.addModule('DeliveryCorpDetail', 'modules/shop/controllers/DeliveryCorpDetail.js');

app.addModule('DeliveryTypeList', 'modules/shop/controllers/DeliveryTypeList.js');
app.addModule('DeliveryTypeDetail', 'modules/shop/controllers/DeliveryTypeDetail.js');
app.addModule('DeliveryTypeModel', 'models/DeliveryTypeModel.js');

app.addModule('ProductInfoList', 'modules/shop/controllers/ProductInfoList.js');
app.addModule('OrderView', 'modules/shop/controllers/OrderView.js');
app.addModule('OrderHandle', 'modules/shop/controllers/OrderHandle.js');

app.addTemplate('template/order_list', function (require, exports, module) {
  module.exports = require('modules/shop/views/order_list.html');
});
app.addTemplate('template/order_item', function (require, exports, module) {
  module.exports = require('modules/shop/views/order_item.html');
});
app.addTemplate('template/pay_type_list', function (require, exports, module) {
  module.exports = require('modules/shop/views/pay_type_list.html');
});
app.addTemplate('template/pay_type_item', function (require, exports, module) {
  module.exports = require('modules/shop/views/pay_type_item.html');
});
app.addTemplate('template/pay_type_detail', function (require, exports, module) {
  module.exports = require('modules/shop/views/pay_type_detail.html');
});
app.addTemplate('template/delivery_corp_list', function (require, exports, module) {
  module.exports = require('modules/shop/views/delivery_corp_list.html');
});
app.addTemplate('template/delivery_corp_item', function (require, exports, module) {
  module.exports = require('modules/shop/views/delivery_corp_item.html');
});
app.addTemplate('template/delivery_corp_detail', function (require, exports, module) {
  module.exports = require('modules/shop/views/delivery_corp_detail.html');
});
app.addTemplate('template/delivery_type_list', function (require, exports, module) {
  module.exports = require('modules/shop/views/delivery_type_list.html');
});
app.addTemplate('template/delivery_type_item', function (require, exports, module) {
  module.exports = require('modules/shop/views/delivery_type_item.html');
});
app.addTemplate('template/delivery_type_detail', function (require, exports, module) {
  module.exports = require('modules/shop/views/delivery_type_detail.html');
});
app.addTemplate('template/order_detail', function(require, exports, module){
  module.exports = require('modules/shop/views/order_detail.html');
});
app.addTemplate('template/product_info_item', function(require, exports, module){
  module.exports = require('modules/shop/views/product_info_item.html');
});
app.addTemplate('template/order_view', function(require, exports, module){
  module.exports = require('modules/shop/views/order_view.html');
});
app.addTemplate('template/order_handle', function(require, exports, module){
  module.exports = require('modules/shop/views/order_handle.html');
});