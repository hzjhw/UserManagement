/**
 * @description MemberBreadcrumbNav
 * @namespace MemberBreadcrumbNav
 * @author yongjin<zjut_wyj@163.com> 2015/1/7
 */
define('MemberBreadcrumbNav', ['BaseView', 'template/member_breadcrumb_nav'], function (require, exports, module) {
  var MemberBreadcrumbNav, BaseView, template;

  BaseView = require('BaseView');
  template = require('template/member_breadcrumb_nav');

  MemberBreadcrumbNav = BaseView.extend({
    initialize: function () {
      this._initialize({
        template: template
      });
      this.render();
      this.$a = this.$('.titleName');
    },
    reload: function(title){
      this.$a.html(title);
    },
    render: function () {
      this._render();
    }
  });

  module.exports = MemberBreadcrumbNav;

});