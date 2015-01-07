/**
 * @description MemberModel
 * @namespace MemberModel
 * @author yongjin<zjut_wyj@163.com> 2015/1/7
 */
define('MemberModel', ['jquery', 'BaseModel'], function (require, exports, module) {
  var MemberModel, BaseModel;

  BaseModel = require('BaseModel');

  MemberModel = BaseModel.extend({
    defaults: Est.extend({
      name: '未登录'
    }, BaseModel.prototype.defaults),
    baseId: 'memberId',
    baseUrl: CONST.API + '/shop/member/info',
    initialize: function () {
      this._initialize();
    }
  });

  module.exports = MemberModel;
});