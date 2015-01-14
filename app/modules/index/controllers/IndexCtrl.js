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
      app.addView('TopView', new TopView());
      app.addView('LeftView', new LeftView());
      $("#load").hide();
      $('#jhw-body').height($(window).height() - $('#jhw-top').height());
      $(window).resize(function () {
        $('#jhw-body').height($(window).height() - $('#jhw-top').height());
      });
      setTimeout(function(){
        new MouseScroll({
          selector: '#jhw-left-bar',
          scrollerType:"hoverPrecise",
          scrollerOrientation:"vertical",
          scrollSpeed:2,
          scrollEasing:"easeOutCirc",
          scrollEasingAmount:800,
          acceleration:4,
          scrollSpeed:800,
          noScrollCenterSpace:10,
          autoScrolling:0,
          autoScrollingSpeed:2000,
          autoScrollingEasing:"easeInOutQuad",
          autoScrollingDelay:500
        });
      }, 0);
    }
  });
