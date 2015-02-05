/**
 * @description DeliveryTypeModel
 * @namespace DeliveryTypeModel
 * @author yongjin<zjut_wyj@163.com> 2014/12/30
 */
define('DeliveryTypeModel', ['BaseModel'],
  function (require, exports, module) {
    var DeliveryTypeModel, BaseModel;

    BaseModel = require('BaseModel');

    DeliveryTypeModel = BaseModel.extend({
      defaults: Est.extend({
        defaultDeliveryCorp: {
          corpId: 'null'
        },
        firstWeightUnit: 'g',
        continueWeightUnit: 'g',
        deliveryMethod: 'deliveryAgainstPayment'
      }, BaseModel.prototype.defaults),
      initialize: function () {
        this._initialize();
      },
      baseId: 'typeId',
      baseUrl: CONST.API + '/deliverytype/detail'
    });

    module.exports = DeliveryTypeModel;
  });