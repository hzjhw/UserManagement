/**
 * @description DepositPaymentDetail
 * @class DepositPaymentDetail
 * @author yongjin<zjut_wyj@163.com> 2015/1/13
 */
define('DepositPaymentDetail', ['BaseDetail', 'BaseModel', 'template/deposit_payment_detail'], function (require, exports, module) {
  var DepositPaymentDetail, BaseDetail, template, model, BaseModel;

  BaseDetail = require('BaseDetail');
  template = require('template/deposit_payment_detail');
  BaseModel = require('BaseModel');

  model = BaseModel.extend({
    defaults: Est.extend({

    }, BaseModel.prototype.defaults),
    baseUrl: '',
    baseId: '',
    initialize: function () {
      this._initialize();
    }
  });

  DepositPaymentDetail = BaseDetail.extend({
    initialize: function () {
      this._initialize({
        template: template,
        model: model
      });
    },
    render: function () {
      this._render();
      this._form('#J_Form')._validate()._init({
        onBeforeSave: function () {

        }
      });
    }
  });

  module.exports = DepositPaymentDetail;
});