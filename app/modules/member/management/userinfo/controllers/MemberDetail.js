/**
 * @description MemberDetail
 * @namespace MemberDetail
 * @author yongjin<zjut_wyj@163.com> 2015/1/9
 */
define('MemberDetail', ['BaseDetail', 'template/member_detail'], function (require, exports, module) {
  var MemberDetail, BaseDetail, template;

  BaseDetail = require('BaseDetail');
  template = require('template/member_detail');

  MemberDetail = BaseDetail.extend({
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