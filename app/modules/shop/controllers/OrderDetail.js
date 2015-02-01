/**
 * @description 修改订单详细页面
 * @namespace OrderDetail
 * @author yongjin<zjut_wyj@163.com> 2014/12/29
 */
define('OrderDetail', ['jquery', 'OrderModel', 'HandlebarsHelper', 'BaseDetail', 'template/order_detail',
    'Service', 'BaseUtils', 'Utils'],
  function (require, exports, module) {
    var OrderDetail, OrderModel, HandlebarsHelper, BaseDetail, template, Service, Utils, BaseUtils;

    OrderModel = require('OrderModel');
    HandlebarsHelper = require('HandlebarsHelper');
    BaseDetail = require('BaseDetail');
    template = require('template/order_detail');
    Service = require('Service');
    Utils = require('Utils');
    BaseUtils = require('BaseUtils');

    OrderDetail = BaseDetail.extend({
      el: '#jhw-detail',
      events: {
        'click #product-reset': 'reset',
        'click .btn-back': 'back'
      },
      initialize: function () {
        debug('2.OrderDetail.initialize');
        this._initialize({
          template: template,
          model: OrderModel
        });
      },
      render: function () {
        debug('4.OrderDetail.render');
        this._render();
        this.initTab();
        this.initDeliveryType();
        this.initPayType();
        this.initProductWeightUnit();
        this.initProductInfoList();
        this.initDistrict();
        this._form('#J_Form')._validate()._init({
          onBeforeSave: function () {
            this.model.set('orderItemSet', app.getView('productInfoLIst').getItems());
            this.model.set('shipAreaPath', app.getView('district1').getDistrict());
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
            {title: '商品信息', value: '2'}
          ]
        });
      },
      // 支付方式
      initPayType: function () {
        Service.getPaymentTypeList({select: true})
          .then(function (result) {
            BaseUtils.initSelect({
              render: '#s1',
              target: '#model-paymentId',
              items: result,
              change: function () {
              }
            });
          });
      },
      // 配送方式
      initDeliveryType: function () {
        Service.getDeliverTypeList({select: true})
          .then(function (result) {
            BaseUtils.initSelect({
              render: '#s2',
              target: '#model-typeId',
              items: result,
              change: function (model) {
                /* $("#model-shipping_deliveryCorpName").val(model.text);*/
              }
            });
          });
      },
      // 重量单位
      initProductWeightUnit: function () {
        BaseUtils.initSelect({
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
      initDistrict: function () {
        BaseUtils.initDistrict({
          id: 'district1',// 必填
          render: '#city', // 目标选择符
          path: this.model.get('shipAreaPath')
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
      }
    });

    module.exports = OrderDetail;

  });