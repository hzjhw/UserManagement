/**
 * @description MemberInfo
 * @namespace MemberInfo
 * @author yongjin<zjut_wyj@163.com> 2015/1/5
 */

define('MemberInfo', ['MemberListModel', 'BaseDetail', 'template/member_info'],
  function (require, exports, module) {
    var MemberInfo, MemberListModel, template, BaseDetail;

    MemberListModel = require('MemberListModel');
    template = require('template/member_info');
    BaseDetail = require('BaseDetail');

    MemberInfo = BaseDetail.extend({
      initialize: function () {
        this._initialize({
          model: model,
          template: template
        });
      },
      render: function () {
        this._render();
      }
    });

    module.exports = MemberInfo;
  });
