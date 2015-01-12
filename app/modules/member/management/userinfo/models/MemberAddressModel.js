/**
 * @description MemberAddressModel
 * @class MemberAddressModel
 * @author yongjin<zjut_wyj@163.com> 2015/1/11
 */
define('MemberAddressModel', ['BaseModel'], function (require, exports, module) {
  var MemberAddressModel, BaseModel;

  BaseModel = require('BaseModel');

  MemberAddressModel = BaseModel.extend({
    defaults: Est.extend({}, BaseModel.prototype.defaults),
    baseUrl: CONST.API + '/shop/receiver/detail',
    baseId: 'receiverId',
    initialize: function () {
      this._initialize();
    }
  });

  module.exports = MemberAddressModel;
});