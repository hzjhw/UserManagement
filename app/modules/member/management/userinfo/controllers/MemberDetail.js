/**
 * @description MemberDetail
 * @namespace MemberDetail
 * @author yongjin<zjut_wyj@163.com> 2015/1/9
 */
define('MemberDetail', ['BaseDetail', 'template/member_detail', 'MemberDetailModel'], function (require, exports, module) {
  var MemberDetail, MemberDetailModel, BaseDetail, template;

  BaseDetail = require('BaseDetail');
  template = require('template/member_detail');
  MemberDetailModel = require('MemberDetailModel');

  MemberDetail = BaseDetail.extend({
    model: MemberDetailModel,
    initialize: function () {
      this._initialize({
        template: template
      });
    },
    render: function () {
      this._render();
    }
  });
  module.exports = MemberDetail;
});