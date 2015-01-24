/**
 * @description EnterpriseModel
 * @class EnterpriseModel
 * @author yongjin<zjut_wyj@163.com> 2015/1/15
 */
define('EnterpriseModel', ['BaseModel'], function (require, exports, module) {
  var EnterpriseModel, BaseModel;

  BaseModel = require('BaseModel');

  EnterpriseModel = BaseModel.extend({
    defaults: Est.extend({
      oem: '00',
      edesc: '未填写公司简介'
    }, BaseModel.prototype.defaults),
    baseUrl: CONST.API + '/enterprise/detail',
    baseId: 'enterpriseId',
    initialize: function () {
      this._initialize();
    }
  });

  module.exports = EnterpriseModel;
});