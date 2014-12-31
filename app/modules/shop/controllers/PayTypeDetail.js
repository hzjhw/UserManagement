/**
 * @description PayTypeDetail
 * @namespace PayTypeDetail
 * @author yongjin<zjut_wyj@163.com> 2014/12/29
 */
define('PayTypeDetail', ['PayTypeModel', 'BaseView', 'HandlebarsHelper', 'BaseDetail', 'BaseUtils', 'template/pay_type_detail'],
  function (require, exports, module) {
    var PayTypeDetail, PayTypeModel, HandlebarsHelper, BaseDetail, BaseUtils, BaseView, template, AlipayView;

    PayTypeModel = require('PayTypeModel');
    HandlebarsHelper = require('HandlebarsHelper');
    BaseDetail = require('BaseDetail');
    BaseUtils = require('BaseUtils');
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
      },
      initialize: function () {
        debug('2.PayTypeDetail.initialize');
        this._initialize({
          template: template,
          model: PayTypeModel
        });
      },
      render: function () {
        debug('4.PayTypeDetail.render');
        var ctx = this;
        this._render();
        this._form('#J_Form')._validate()._init({ });
        BaseUtils.initSelect({
          render: '#s1',
          target: '#model-paymentConfigType',
          items: app.getData('paymentType'),
          change: function (itemId) {
            if (itemId === 'alipay') {
              ctx.showAliPay();
            } else {
              ctx.removeAliPay();
            }
            setTimeout(function () {
              BaseUtils.resetIframe();
            }, 100);
          }
        });
        if (this.model.get('paymentConfigType') === 'alipay'){
          this.showAliPay();
        }
        BaseUtils.initEditor({
          render: '.ckeditor'
        });
        return this;
      },
      showAliPay: function () {
        app.addPanel('aliPayPanel', {
          template: '<div class="ali-pay-inner"></div>',
          el: $('#alipay')
        }).addView('aliPay', new AlipayView({
          el: '.ali-pay-inner',
          model: this.model
        }));
      },
      removeAliPay: function () {
        app.removeView('aliPay');
        app.removePanel('aliPayPanel', {
          el: $('#alipay')
        });
      }
    });

    module.exports = PayTypeDetail;

  });