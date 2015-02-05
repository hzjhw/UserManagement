/**
 * @description DeliveryCorp
 * @namespace DeliveryCorp
 * @author yongjin<zjut_wyj@163.com> 2014/12/30
 */
define('DeliveryCorpModel', ['BaseModel'], function (require, exports, module) {
  var DeliveryCorpModel, BaseModel;

  BaseModel = require('BaseModel');

  DeliveryCorpModel = BaseModel.extend({
    defaults: Est.extend({
      url: 'http://',
      sort: 1
    }, BaseModel.prototype.defaults),
    baseId: 'corpId',
    baseUrl: CONST.API + '/deliverycorp/detail'
  });

  module.exports = DeliveryCorpModel;
});