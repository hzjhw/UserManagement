/**
 * @description MemberLeftInfo
 * @namespace MemberLeftInfo
 * @author yongjin<zjut_wyj@163.com> 2015/1/7
 */
define('MemberLeftInfo', ['BaseView', 'template/member_left_info'],
  function (require, exports, module) {
    var MemberLeftInfo, BaseView, template;

    BaseView = require('BaseView');
    template = require('template/member_left_info');

    MemberLeftInfo = BaseView.extend({
      initialize: function () {
        this._initialize({
          template: template,
          data: app.getData('memberInfo')
        });
        this.render();
      },
      render: function () {
        this._render();
      }
    });

    module.exports = MemberLeftInfo;
  });