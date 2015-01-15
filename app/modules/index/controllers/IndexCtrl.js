/**
 * @description 首页
 * @namespace IndexCtrl
 * @author yongjin on 2014/10/31
 */
seajs.use(['jquery', 'TopView', 'LeftView', 'UserModel', 'BaseService', 'MouseScroll'],
  function (jquery, TopView, LeftView, UserModel, BaseService, MouseScroll) {
    BaseService.initUser(UserModel);
    if (!app.getData('user')) {
      window.location.href = CONST.HOST + '/modules/login/login.html';
      return false;
    } else {
      $("#load").hide();
      app.addView('TopView', new TopView());
      setTimeout(function () {
        app.addView('LeftView', new LeftView());
        new MouseScroll({
          selector: '#jhw-left-bar'
        });
      }, 0);
      $('#jhw-body').height($(window).height() - $('#jhw-top').height());
      $(window).resize(function () {
        $('#jhw-body').height($(window).height() - $('#jhw-top').height());
      });
    }
  });
