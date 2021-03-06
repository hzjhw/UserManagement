/**
 * @description 支付方式详细
 * @namespace PayTypeDetail
 * @author yongjin<zjut_wyj@163.com> 2014/12/29
 */
define('PayTypeDetail', ['PayTypeModel', 'BaseView', 'HandlebarsHelper', 'BaseDetail', 'Utils', 'template/pay_type_detail'],
  function (require, exports, module) {
    var PayTypeDetail, PayTypeModel, HandlebarsHelper, BaseDetail, Utils, BaseView, template, AlipayView;

    PayTypeModel = require('PayTypeModel');
    HandlebarsHelper = require('HandlebarsHelper');
    BaseDetail = require('BaseDetail');
    Utils = require('Utils');
    template = require('template/pay_type_detail');
    BaseView = require('BaseView');

    AlipayView = BaseView.extend({
      initialize: function () {
        this._initialize({
          template: $('#template-alipay').html(),
          data: this.model.attributes
        }).render();
      },
      render: function () {
        this._render();
      }
    });

    PayTypeDetail = BaseDetail.extend({
      el: '#jhw-detail',
      events: {
        'click .btn-back': 'back'
      },
      initialize: function () {
        debug('2.PayTypeDetail.initialize');
        this._initialize({
          template: template,
          model: PayTypeModel
        });
      },
      // 返回支付方式列表
      back: function () {
        this._navigate('#/shop/pay_type', true);
      },
      // 支付宝选项
      showAliPay: function () {
        app.addPanel('aliPayPanel', {
          template: '<div class="ali-pay-inner"></div>',
          el: $('#alipay')
        }).addView('aliPay', new AlipayView({
          el: '.ali-pay-inner',
          model: this.model
        }));
      },
      // 移除支付宝选项
      removeAliPay: function () {
        app.removeView('aliPay');
        app.removePanel('aliPayPanel', {
          el: $('#alipay')
        });
      },
      render: function () {
        debug('4.PayTypeDetail.render');
        var ctx = this;
        this._render();
        this._form('#J_Form')._validate()._init({ });
        Utils.initSelect({
          render: '#s1',
          target: '#model-paymentConfigType',
          items: app.getStatus('paymentConfigType'),
          change: function (item) {
            if (item.value === 'alipay') {
              ctx.showAliPay();
            } else {
              ctx.removeAliPay();
            }
            setTimeout(function () {
              Utils.resetIframe();
            }, 100);
          }
        });
        if (this.model.get('paymentConfigType') === 'alipay') {
          this.showAliPay();
        }
        Utils.initEditor({
          render: '.ckeditor'
        });
        return this;
      }
    });

    module.exports = PayTypeDetail;

  });