/**
 * @description main
 * @namespace main
 * @author yongjin<zjut_wyj@163.com> 2015/1/7
 */
seajs.use(['jquery', 'MemberModel', 'backbone'], function ($, MemberModel, Backbone) {
  var userModel = new MemberModel();
  userModel.fetch({
    async: false,
    success: function (data) {
      if (Est.isEmpty(data.attributes.username)) {
        //TODO 未登录， 跳转到登录页面
        window.location.href = CONST.HOST +
          "/modules/member/management/login/login.html";
      }
      app.addData('user', data.attributes);
      CONST.USER = data.attributes;
    }
  });
  //TODO 已登录 渲染首页
  Backbone.history.navigate("index");
});