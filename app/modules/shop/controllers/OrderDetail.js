/**
 * @description OrderDetail
 * @namespace OrderDetail
 * @author yongjin<zjut_wyj@163.com> 2014/12/29
 */
define('OrderDetail', ['jquery', 'OrderModel', 'HandlebarsHelper', 'BaseDetail', 'template/order_detail',
    'BaseService', 'BaseUtils'],
  function (require, exports, module) {
    var OrderDetail, OrderModel, HandlebarsHelper, BaseDetail, template, BaseService, BaseUtils;

    OrderModel = require('OrderModel');
    HandlebarsHelper = require('HandlebarsHelper');
    BaseDetail = require('BaseDetail');
    template = require('template/order_detail');
    BaseService = require('BaseService');
    BaseUtils = require('BaseUtils');

    OrderDetail = BaseDetail.extend({
      el: '#jhw-detail',
      events: {
        'click #product-reset': 'reset'
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
        this._form('#J_Form')._validate()._init({
          onBeforeSave: function () {
          }
        });
        return this;
      },
      // tab标签
      initTab: function () {
        BaseUtils.initTab({
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
        BaseUtils.initSelect({
          render: '#s1',
          target: '#model-deliveryMethod',
          items: [
            {text: '先付款后发货', value: 'deliveryAgainstPayment'},
            {text: '货到付款', value: 'cashOnDelivery'}
          ],
          change: function () {
          }
        });
      },
      // 配送方式
      initDeliveryType: function () {
        BaseService.getDeliveryCorpList().then(function (result) {
          BaseUtils.initSelect({
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
        BaseUtils.initSelect({
          render: '#s3',
          width: 100,
          target: '#model-productWeightUnit',
          items: [
            {text: '克', value: 'g'},
            {text: '千克', value: 'kg'},
            {text: '吨', value: 't'}
          ]
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
      }
    });

    module.exports = OrderDetail;

  });