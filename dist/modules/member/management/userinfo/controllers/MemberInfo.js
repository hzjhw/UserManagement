/**
 * @description MemberInfo
 * @namespace MemberInfo
 * @author yongjin<zjut_wyj@163.com> 2015/1/7
 */
define('MemberInfo', ['BaseView', 'template/member_info'],
  function (require, exports, module) {
    var MemberInfo, BaseView, template;

    BaseView = require('BaseView');
    template = require('template/member_info');

    MemberInfo = BaseView.extend({
      initialize: function () {
        this.options.data.recvSum = Est.filter(this.options.data.inboxMessageSet, function (item) {
          return item.recvState === '00'
        }).length;
        this._initialize({
          template: template
        });
        this.render();
      },
      render: function () {
        this._render();
      }
    });

    module.exports = MemberInfo;
  });
