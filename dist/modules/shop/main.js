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
function payTypeRoute(id) {
  seajs.use(['PayTypeDetail'], function (PayTypeDetail) {
    app.addPanel('main', {
      el: '#jhw-main',
      template: '<div class="jhw-panel"></div>'
    }).addView('payTypeDetail', new PayTypeDetail({
      el: '.jhw-panel',
      id: id,
      viewId: 'payTypeDetail'
    }));
  });
}
app.addRoute('shop/pay_type_add', function () {
  payTypeRoute();
});
app.addRoute('shop/pay_type/:id', function (id) {
  payTypeRoute(id);
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
function deliveryTypeRoute(id) {
  seajs.use(['DeliveryTypeDetail'], function (DeliveryTypeDetail) {
    app.addPanel('main', {
      el: '#jhw-main',
      template: '<div class="jhw-panel"></div>'
    }).addView('deliveryTypeDetail', new DeliveryTypeDetail({
      el: '.jhw-panel',
      viewId: 'deliveryTypeDetail',
      id: id
    }));
  });
}
app.addRoute('shop/delivery_type_add', function () {
  deliveryTypeRoute();
});
app.addRoute('shop/delivery_type/:id', function (id) {
  deliveryTypeRoute(id);
});
app.addRoute('shop/delivery_no_send', function () {
  seajs.use(['OrderList'], function (OrderList) {
    app.addPanel('main', {
      el: '#jhw-main',
      template: '<div class="jhw-main-inner"></div>'
    }).addView('orderList', new OrderList({
      el: '.jhw-main-inner',
      viewId: 'orderList',
      filter: [
        {key: 'shippingStatus', value: 'unshipped', match: new RegExp('^unshipped$') }
      ]
    }));
  });
});
app.addRoute('shop/delivery_no_paid', function () {
  seajs.use(['OrderList'], function (OrderList) {
    app.addPanel('main', {
      el: '#jhw-main',
      template: '<div class="jhw-main-inner"></div>'
    }).addView('orderList', new OrderList({
      el: '.jhw-main-inner',
      viewId: 'orderList',
      filter: [
        {key: 'paymentStatus', value: 'unpaid', match: new RegExp('^unpaid$') }
      ]
    }));
  });
});

app.addModule('OrderList', 'modules/shop/controllers/OrderList.js');
app.addModule('OrderDetail', 'modules/shop/controllers/OrderDetail.js');
app.addModule('PayTypeList', 'modules/shop/controllers/PayTypeList.js');
app.addModule('PayTypeModel', 'models/PayTypeModel.js');
app.addModule('OrderModel', 'models/OrderModel.js');
app.addModule('PaymentModel', 'models/PaymentModel.js');
app.addModule('ShippingModel', 'models/ShippingModel.js');

app.addModule('PayTypeDetail', 'modules/shop/controllers/PayTypeDetail.js');

app.addModule('DeliveryCorpModel', 'models/DeliveryCorpModel.js');
app.addModule('DeliveryCorpList', 'modules/shop/controllers/DeliveryCorpList.js');
app.addModule('DeliveryCorpDetail', 'modules/shop/controllers/DeliveryCorpDetail.js');

app.addModule('DeliveryTypeList', 'modules/shop/controllers/DeliveryTypeList.js');
app.addModule('DeliveryTypeDetail', 'modules/shop/controllers/DeliveryTypeDetail.js');
app.addModule('DeliveryTypeModel', 'models/DeliveryTypeModel.js');

app.addModule('ProductInfoList', 'modules/shop/controllers/ProductInfoList.js');
app.addModule('OrderLogList', 'modules/shop/controllers/OrderLogList.js');
app.addModule('PaymentInfoList', 'modules/shop/controllers/PaymentInfoList.js');
app.addModule('DeliveryInfoList', 'modules/shop/controllers/DeliveryInfoList.js');
app.addModule('OrderView', 'modules/shop/controllers/OrderView.js');
app.addModule('OrderHandle', 'modules/shop/controllers/OrderHandle.js');
app.addModule('MemberInfo', 'modules/shop/controllers/MemberInfo.js');
app.addModule('PaymentDetail', 'modules/shop/controllers/PaymentDetail.js');
app.addModule('ShippingDetail', 'modules/shop/controllers/ShippingDetail.js');
app.addModule('DeliveryList', 'modules/shop/controllers/DeliveryList.js');

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
app.addTemplate('template/order_detail', function (require, exports, module) {
  module.exports = require('modules/shop/views/order_detail.html');
});
app.addTemplate('template/product_info_item', function (require, exports, module) {
  module.exports = require('modules/shop/views/product_info_item.html');
});
app.addTemplate('template/order_view', function (require, exports, module) {
  module.exports = require('modules/shop/views/order_view.html');
});
app.addTemplate('template/order_handle', function (require, exports, module) {
  module.exports = require('modules/shop/views/order_handle.html');
});
app.addTemplate('template/order_log_item', function (require, exports, module) {
  module.exports = require('modules/shop/views/order_log_item.html');
});
app.addTemplate('template/payment_info_item', function (require, exports, module) {
  module.exports = require('modules/shop/views/payment_info_item.html');
});
app.addTemplate('template/delivery_info_item', function (require, exports, module) {
  module.exports = require('modules/shop/views/delivery_info_item.html');
});
app.addTemplate('template/member_info', function (require, exports, module) {
  module.exports = require('modules/shop/views/member_info.html');
});
app.addTemplate('template/payment_detail', function (require, exports, module) {
  module.exports = require('modules/shop/views/payment_detail.html');
});
app.addTemplate('template/shipping_detail', function (require, exports, module) {
  module.exports = require('modules/shop/views/shipping_detail.html');
});
app.addTemplate('template/delivery_item', function (require, exports, module) {
  module.exports = require('modules/shop/views/delivery_item.html');
});
app.addTemplate('template/order_search', function (require, exports, module) {
  module.exports = require('modules/shop/views/order_search.html');
});
app.addTemplate('template/delivery_ickd', function (require, exports, module) {
  module.exports = require('modules/shop/views/delivery_ickd.html')
});