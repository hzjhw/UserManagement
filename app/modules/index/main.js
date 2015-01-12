/**
 * @description config
 * @namespace config
 * @author yongjin<zjut_wyj@163.com> 2014/12/11
 */

app.addRoute('index', function () {
  seajs.use(['jquery', 'Main'], function (jquery, Main) {
    app.addPanel('main', {
      el: '#jhw-main',
      template: '<div class="jhw-main-inner"></div>'
    }).addView('main', new Main({
      el: '.jhw-main-inner'
    }));
  });
});

app.addModule('UserModel', 'models/UserModel.js');
app.addModule('TopView', 'modules/index/controllers/TopView.js');
app.addModule('LeftView', 'modules/index/controllers/LeftView.js');
app.addModule('Main', 'modules/index/controllers/Main.js');

app.addTemplate('template/layout_left', function (require, exports, module) {
  module.exports = require('modules/index/views/layout_left.html');
});
app.addTemplate('template/layout_top', function (require, exports, module) {
  module.exports = require('modules/index/views/layout_top.html');
});
app.addTemplate('template/main', function (require, exports, module) {
  module.exports = require('modules/index/views/main.html');
});
app.addTemplate('template/nav_item', function (require, exports, module) {
  module.exports = require('modules/index/views/nav_item.html');
});