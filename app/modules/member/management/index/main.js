/**
 * @description main
 * @namespace main
 * @author yongjin<zjut_wyj@163.com> 2015/1/7
 */

app.addModule('MemberLeftNav', 'modules/member/management/index/controllers/MemberLeftNav.js');
app.addModule('MemberBreadcrumbNav', 'modules/member/management/index/controllers/MemberBreadcrumbNav.js');

app.addTemplate('template/member_left_nav', function (require, exports, module) {
  module.exports = require('modules/member/management/index/views/member_left_nav.html');
});
app.addTemplate('template/member_left_nav_item', function (require, exports, module) {
  module.exports = require('modules/member/management/index/views/member_left_nav_item.html');
});
app.addTemplate('template/member_breadcrumb_nav', function(require, exports, module){
  module.exports = require('modules/member/management/index/views/member_breadcrumb_nav.html');
});
app.addRoute('index', function () {
  seajs.use(['jquery', 'MemberLeftInfo', 'MemberLeftNav', 'MemberBreadcrumbNav', 'MemberInfo', 'OrderList'],
    function (jquery, MemberLeftInfo, MemberLeftNav, MemberBreadcrumbNav, MemberInfo, OrderList) {
      // 左侧导航
      app.addPanel('left', {
        el: '#content1',
        template: '<div id="narrow_member_left_1" class="bodyCont moveChild narrow_member_left_1"></div>' +
          '<div id="narrow_member_left_2" class="bodyCont moveChild narrow_member_left_2"></div>'
      }).addView('memberLeftInfo', new MemberLeftInfo({
        el: '#narrow_member_left_1',
        data: app.getData('user')
      })).addView('memberLeftNav', new MemberLeftNav({
        el: '#narrow_member_left_2'
      }));
      // 面包屑导航
      app.addPanel('breadcrumb', {
        el: '#breadcrumb',
        template: '<div class="breadcrumb-inner"></div>'
      }).addView('breadcrumb', new MemberBreadcrumbNav({
        el: '.breadcrumb-inner'
      }));
      // 主面板
      app.addPanel('main', {
        el: '#main',
        template: '<div class="main-inner"></div>'
      }).addView('memberInfoDetail', new MemberInfo({
        el: '.main-inner',
        data: app.getData('user')
      })).addView('orderList', new OrderList({
        el: '.main-inner',
        items: app.getData('user')['orderSet']
      }));
    });
});



