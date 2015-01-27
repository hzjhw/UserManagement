/**
 * @description 支付详细页面
 * @namespace PaymentDetail
 * @author yongjin<zjut_wyj@163.com> 2015/1/5
 */
define('PaymentDetail', ['BaseDetail', 'PaymentModel', 'template/payment_detail', 'Service', 'Utils'],
  function (require, exports, module) {
    var PaymentDetail, BaseDetail, PaymentModel, template, Service, Utils;

    BaseDetail = require('BaseDetail');
    PaymentModel = require('PaymentModel');
    template = require('template/payment_detail');
    Service = require('Service');
    Utils = require('Utils');

    PaymentDetail = BaseDetail.extend({
      initialize: function () {
        this._initialize({
          template: template,
          model: PaymentModel
        });
      },
      render: function () {
        this._render();
        this.initPayType();
        this.initPaymentType();
        this._form('#payment-detail')._validate()._init({
          onBeforeSave: function () {

          }
        });
      },
      // 支付方式
      initPayType: function () {
        Service.getPaymentTypeList().then(function (result) {
          Utils.initSelect({
            render: '#s2',
            target: '#model-paymentConfig_id',
            items: result,
            change: function () {
            }
          });
        });
      },
      initPaymentType: function(){
        Utils.initSelect({
          render: '#s1',
          target: '#model-payment_paymentType',
          items: app.getStatus('paymentType'),
          change: function (itemId) {
          }
        });
      }
    });

    module.exports = PaymentDetail;
  });