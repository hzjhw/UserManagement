/**
 * @description config
 * @namespace config
 * @author yongjin<zjut_wyj@163.com> 2014/12/11
 */
app.addModule('UserModel', 'models/UserModel.js');
app.addModule('TopView', 'modules/index/controllers/TopView.js');
app.addModule('LeftView', 'modules/index/controllers/LeftView.js');
app.addModule('Main', 'modules/index/controllers/Main.js');

app.addRoute('index', function () {
  seajs.use(['jquery', 'Main'], function (jquery, Main) {
    app.addView('main', new Main());
  });
});

app.addTemplate('template/layout_left', function (require, exports, module) {
  module.exports = require('modules/index/views/layout_left.html');
});
app.addTemplate('template/layout_top', function (require, exports, module) {
  module.exports = require('modules/index/views/layout_top.html');
});
app.addTemplate('template/main', function (require, exports, module) {
  module.exports = require('modules/index/views/main.html');
});
