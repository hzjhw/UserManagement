/**
 * @description 支付方式
 * @namespace PayTypeModel
 * @author yongjin<zjut_wyj@163.com> 2014/12/29
 */
define('PayTypeModel', ['BaseModel'],
  function (require, exports, module) {
    var PayTypeModel, BaseModel;

    BaseModel = require('BaseModel');

    PayTypeModel = BaseModel.extend({
      defaults: Est.extend({
        paymentType: 'offline',
        paymentFeeType: 'scale'
      }, BaseModel.prototype.defaults),
      baseUrl: CONST.API + '/paymentconfig/detail',
      baseId: 'paymentId',
      initialize: function () {
        this._initialize();
      }
    });

    module.exports = PayTypeModel;
  });