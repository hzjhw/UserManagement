/**
 * @description 首页
 * @namespace IndexCtrl
 * @author yongjin on 2014/10/31
 */
seajs.use(['jquery', 'TopView', 'LeftView', 'Main'],
  function (jquery, TopView, LeftView, Main) {
    app.addView('topView', new TopView);
    app.addView('leftView', new LeftView);
    app.addView('main', new Main);
  });
