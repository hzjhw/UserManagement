/**
 * @description 查看订单
 * @namespace OrderView
 * @author yongjin<zjut_wyj@163.com> 2014/12/29
 */
define('OrderView', ['jquery', 'OrderModel', 'HandlebarsHelper', 'BaseDetail', 'template/order_view',
    'Service', 'Utils'],
  function (require, exports, module) {
    var OrderView, OrderModel, HandlebarsHelper, BaseDetail, template, Service, Utils;

    OrderModel = require('OrderModel');
    HandlebarsHelper = require('HandlebarsHelper');
    BaseDetail = require('BaseDetail');
    template = require('template/order_view');
    Service = require('Service');
    Utils = require('Utils');

    OrderView = BaseDetail.extend({
      el: '#jhw-detail',
      events: {
        'click #product-reset': 'reset',
        'click .btn-back': 'back'
      },
      initialize: function () {
        debug('2.OrderView.initialize');
        this._initialize({
          template: template,
          model: OrderModel
        });
      },
      back: function(){
        var ctx = this;
        seajs.use(['OrderList'], function(OrderList){
          app.addPanel('main', {
            el: '#jhw-main',
            template: '<div class="jhw-main-inner"></div>'
          }).addView('orderList', new OrderList({
            el: '.jhw-main-inner',
            page: ctx.options.page
          }));;
        });
      },
      render: function () {
        debug('4.OrderView.render');
        this._render();
        this.initTab();
        this.initProductInfoList();
        this.initPaymentInfoList();
        this.initDeliveryInfoList();
        this.initOrderLogList();
        this.showMemberInfo();
        this._form('#J_Form')._validate()._init({
          onBeforeSave: function () {
            debugger
            console.dir(app.getView('productInfoLIst').getItems());
            this.model.set('orderItemSet', app.getView('productInfoLIst').getItems());
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
            {title: '收款记录', value: '3'},
            {title: '收货记录', value: '4'},
            {title: '订单日志', value: '5'}
          ]
        });
      },
      showMemberInfo: function(){
        var memberId = this.model.get('');
         seajs.use(['MemberInfo'], function(MemberInfo){
           app.addView('memberInfo', new MemberInfo({
             el: '#member-info',
             id: memberId
           }));
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
      // 收款记录
      initPaymentInfoList: function(){
        var paymentSet = this.model.get('paymentSet');
        seajs.use(['PaymentInfoList'], function(PaymentInfoList){
          app.addView('paymentInfoList', new PaymentInfoList({
            el: '#payment-info-list',
            items: paymentSet
          }));
        });
      },
      // 收货记录
      initDeliveryInfoList: function(){
        var shippingSet = this.model.get('shippingSet');
        var deliveryType = this.model.get('deliveryType')['defaultDeliveryCorp']['com'];
        Est.each(shippingSet, function(item){
          item.com = deliveryType;
        });
        seajs.use(['DeliveryInfoList'], function(DeliveryInfoList){
          app.addView('deliveryInfoList', new DeliveryInfoList({
            el: '#delivery-info-list',
            items: shippingSet
          }));
        });
      },
      // 订单日志
      initOrderLogList: function(){
        var orderLogSet = this.model.get('orderLogSet');
        seajs.use(['OrderLogList'], function(OrderLogList){
          app.addView('orderLogList', new OrderLogList({
            el: '#order-log-list',
            items: orderLogSet
          }));
        });
      }
    });

    module.exports = OrderView;

  });