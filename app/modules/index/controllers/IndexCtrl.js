/**
 * @description 首页
 * @namespace IndexCtrl
 * @author yongjin on 2014/10/31
 */
seajs.use(['jquery', 'TopView', 'LeftView', 'UserModel', 'Service', 'MouseScroll'],
  function (jquery, TopView, LeftView, UserModel, Service, MouseScroll) {
    Service.initUser(UserModel).done(function (result) {
      debug(result);
      //if (result.attributes && !Est.isEmpty(result.attributes.success)) return;
      if (!app.getData('user')) return;
      $("#load").hide();
      app.addView('TopView', new TopView());
      setTimeout(function () {
        app.addView('LeftView', new LeftView());
        new MouseScroll({
          selector: '#jhw-left-bar'
        });
      }, 0);
      function getHeight() {
        var window_h = $(window).height();
        $("html, body").height(window_h);
        var top_h = $('#jhw-top').height();
        CONST.MAIN_HEIGHT = window_h - top_h;
        CONST.BUI_GRID_BODY_HEIGHT = CONST.MAIN_HEIGHT - (CONST.MAIN_HEIGHT * 0.02 + (CONST.MAIN_HEIGHT - CONST.MAIN_HEIGHT * 0.02) * 0.02) - 180;
        CONST.BUI_GRID_BODY_HEIGHT_NO_PAGINATION = CONST.BUI_GRID_BODY_HEIGHT + 50;
        return parseInt(CONST.MAIN_HEIGHT, 10);
      }

      $('#jhw-body').height(getHeight());
      $(window).resize(function () {
        $('#jhw-body').height(getHeight());
      });
    });
  });
