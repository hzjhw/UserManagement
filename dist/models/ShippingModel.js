/**
 * @description ShippingModel
 * @namespace ShippingModel
 * @author yongjin<zjut_wyj@163.com> 2015/1/5
 */
define('ShippingModel', ['BaseModel'], function (require, exports, module) {
  var ShippingModel, BaseModel;

  BaseModel = require('BaseModel');

  ShippingModel = BaseModel.extend({
    defaults: Est.extend({}, BaseModel.prototype.defaults),
    baseUrl: CONST.API + '/orderShipping/detail',
    baseId: 'orderId',
    initialize: function(){
      this._initialize();
    }
  });

  module.exports = ShippingModel;
});