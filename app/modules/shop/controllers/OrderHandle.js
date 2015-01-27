/**
 * @description 订单处理
 * @namespace OrderHandle
 * @author wxw on 15-1-4
 */
define('OrderHandle', ['jquery', 'OrderModel', 'HandlebarsHelper', 'BaseDetail', 'template/order_handle',
    'Service', 'Utils'],
  function (require, exports, module) {
    var OrderHandle, OrderModel, HandlebarsHelper, BaseDetail, template, Service, Utils;

    OrderModel = require('OrderModel');
    HandlebarsHelper = require('HandlebarsHelper');
    BaseDetail = require('BaseDetail');
    template = require('template/order_handle');
    Service = require('Service');
    Utils = require('Utils');

    OrderHandle = BaseDetail.extend({
      el: '#jhw-detail',
      events: {
        'click #product-reset': 'reset',
        'click .btn-back': 'back',
        'click .btn-finish': 'finish'
      },
      initialize: function () {
        debug('2.OrderHandle.initialize');
        this._initialize({
          template: template,
          model: OrderModel
        });
      },
      finish: function () {
        var ctx = this;
        Utils.comfirm({
          content: '订单完成后将不允许对此订单进行任何操作，确定执行？',
          success: function () {
            $.ajax({
              type: 'post',
              url: CONST.API + '/order/completed/' + ctx.model.get('id'),
              success: function () {
                ctx.back();
              }
            });
          }
        });
      },
      back: function () {
        var ctx = this;
        seajs.use(['OrderList'], function (OrderList) {
          app.addPanel('main', {
            el: '#jhw-main',
            template: '<div class="jhw-main-inner"></div>'
          }).addView('orderList', new OrderList({
            el: '.jhw-main-inner',
            page: ctx.options.page
          }));
          ;
        });
      },
      render: function () {
        debug('4.OrderHandle.render');
        this._render();
        this.initTab();
        this.initDeliveryType();
        this.initPayType();
        this.initProductWeightUnit();
        this.initProductInfoList();
        this.initPaymentDetail();
        this.initShippingDetail();
        this._form('#J_Form')._validate()._init({
          onBeforeSave: function () {
          }
        });
        return this;
      },
      // tab标签
      initTab: function () {
        Utils.initTab({
          render: '#tab',
          elCls: 'nav-tabs',
          panelContainer: '#panel',
          autoRender: true,
          children: [
            {title: '订单信息', value: '1', selected: true},
            {title: '商品信息', value: '2'},
            {title: '订单支付', value: '3'},
            {title: '订单发货', value: '4'}
          ]
        });
      },
      // 支付方式
      initPayType: function () {
        Utils.initSelect({
          render: '#s1',
          target: '#model-deliveryMethod',
          items: app.getStatus('deliveryMethod'),
          change: function () {
          }
        });
      },
      // 配送方式
      initDeliveryType: function () {
        Service.getDeliveryCorpList().then(function (result) {
          Utils.initSelect({
            render: '#s2',
            target: '#model-defaultDeliveryCorp',
            items: result,
            change: function () {
            }
          });
        });
      },
      // 重量单位
      initProductWeightUnit: function () {
        Utils.initSelect({
          render: '#s3',
          width: 100,
          target: '#model-productWeightUnit',
          items: app.getStatus('weightUnit')
        });
      },
      // 商品信息
      initProductInfoList: function () {
        var orderItemSet = this.model.get('orderItemSet');
        seajs.use(['ProductInfoList'], function (ProductInfoList) {
          app.addView('productInfoLIst', new ProductInfoList({
            el: '#product-info-list',
            items: orderItemSet
          }));
        });
      },
      // 订单支付
      initPaymentDetail: function () {
        var orderId = this.model.get('orderId');
        var attributes = this.model.attributes;
        seajs.use(['PaymentDetail'], function (PaymentDetail) {
          app.addView('paymentDetail', new PaymentDetail({
            el: '#payment-detail',
            id: orderId,
            data: attributes
          }));
        });
      },
      // 订单发货
      initShippingDetail: function () {
        var orderId = this.model.get('orderId');
        var attributes = this.model.attributes;
        seajs.use(['ShippingDetail'], function (ShippingDetail) {
          app.addView('shippingDetail', new ShippingDetail({
            el: '#shipping-detail',
            id: orderId,
            data: attributes
          }));
        });
      }
    });

    module.exports = OrderHandle;

  });