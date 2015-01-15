/**
 * @description EnterpriseModel
 * @class EnterpriseModel
 * @author yongjin<zjut_wyj@163.com> 2015/1/15
 */
define('EnterpriseModel', ['BaseModel'], function (require, exports, module) {
  var EnterpriseModel, BaseModel;

  BaseModel = require('BaseModel');

  EnterpriseModel = BaseModel.extend({
    defaults: Est.extend({}, BaseModel.prototype.defaults),
    baseUrl: CONST.API + '/enterprise/detail',
    baseId: 'enterpriseId',
    initialize: function () {
      this._initialize();
    }
  });

  module.exports = EnterpriseModel;
});