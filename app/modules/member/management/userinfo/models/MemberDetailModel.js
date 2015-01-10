/**
 * @description MemberDetailModel
 * @namespace MemberDetailModel
 * @author yongjin<zjut_wyj@163.com> 2015/1/10
 */
define('MemberDetailModel', ['BaseModel'], function (require, exports, module) {
  var MemberDetailModel, BaseModel;

  BaseModel = require('BaseModel');

  MemberDetailModel = BaseModel.extend({
    defaults: Est.extend({
    }, BaseModel.prototype.defaults),
    baseUrl: CONST.API + '/shop/member/detail',
    baseId: 'memberId',
    initialize: function () {
      this._initialize();
    }
  });

  module.exports = MemberDetailModel;
});