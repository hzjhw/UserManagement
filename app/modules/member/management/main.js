/**
 * @description main
 * @namespace main
 * @author yongjin<zjut_wyj@163.com> 2015/1/7
 */
seajs.use(['jquery', 'MemberModel'], function ($, MemberModel) {
  var userModel = new MemberModel();
  userModel.fetch({
    async: false,
    success: function (data) {
      if (Est.typeOf(data.success) === 'boolean' && !data.success) {
        //TODO 未登录， 跳转到登录页面
        window.location.href = CONST.HOST + "/modules/member/management/login/login.html";
      }
      app.addData('user', data.attributes);
      CONST.USER = data.attributes;
    }
  });
  //TODO 已登录 渲染首页
  seajs.use(['jquery', 'MemberLeftInfo', 'MemberLeftNav', 'MemberBreadcrumbNav', 'MemberInfo'],
    function (jquery, MemberLeftInfo, MemberLeftNav, MemberBreadcrumbNav, MemberInfo) {
      // 左侧导航
      app.addPanel('left', {
        el: '#content1',
        template: '<div id="narrow_member_left_1" class="bodyCont moveChild narrow_member_left_1">加载中...</div>' +
          '<div id="narrow_member_left_2" class="bodyCont moveChild narrow_member_left_2">加载中...</div>'
      }).addView('memberLeftInfo', new MemberLeftInfo({
        el: '#narrow_member_left_1'
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
      }));
    });
});