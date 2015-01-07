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
  seajs.use(['jquery', 'MemberLeftInfo', 'MemberLeftNav', 'MemberBreadcrumbNav'],
    function (jquery, MemberLeftInfo, MemberLeftNav, MemberBreadcrumbNav) {
      app.addPanel('left', {
        el: '#content1',
        template: '<div id="narrow_member_left_1" class="bodyCont moveChild narrow_member_left_1">加载中...</div>' +
          '<div id="narrow_member_left_2" class="bodyCont moveChild narrow_member_left_2">加载中...</div>'
      }).addView('memberLeftInfo', new MemberLeftInfo({
        el: '#narrow_member_left_1'
      })).addView('memberLeftNav', new MemberLeftNav({
        el: '#narrow_member_left_2'
      }));
      app.addPanel('right', {
        el: '#companyIntro',
        template: '<div id="breadcrumb">加载中...</div><div class="bodyContContent rel rightConteWidth propertyByWideIntro"> ' +
          '<div class="bodyContContentRightCont fl tal mainTextColor break"> <div class="middle"> 加载中... <div class="blank"></div> ' +
          '</div> <div class="bottom"></div> </div> <div class="clr"></div> </div>'
      }).addView('breadcrumb', new MemberBreadcrumbNav({
        el: '#breadcrumb'
      }));
    });
});