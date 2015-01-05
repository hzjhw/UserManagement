/**
 * @description PaymentDetail
 * @namespace PaymentDetail
 * @author yongjin<zjut_wyj@163.com> 2015/1/5
 */
define('PaymentDetail', ['BaseDetail', 'PaymentModel', 'template/payment_detail', 'BaseService', 'BaseUtils'],
  function (require, exports, module) {
    var PaymentDetail, BaseDetail, PaymentModel, template, BaseService, BaseUtils;

    BaseDetail = require('BaseDetail');
    PaymentModel = require('PaymentModel');
    template = require('template/payment_detail');
    BaseService = require('BaseService');
    BaseUtils = require('BaseUtils');

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
        BaseService.getPaymentTypeList().then(function (result) {
          BaseUtils.initSelect({
            render: '#s2',
            target: '#model-paymentConfig_id',
            items: result,
            change: function () {
            }
          });
        });
      },
      initPaymentType: function(){
        BaseUtils.initSelect({
          render: '#s1',
          target: '#model-payment_paymentType',
          items: app.getData('paymentType'),
          change: function (itemId) {
          }
        });
      }
    });

    module.exports = PaymentDetail;
  });