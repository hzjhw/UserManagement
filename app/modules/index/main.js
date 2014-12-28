/**
 * @description config
 * @namespace config
 * @author yongjin<zjut_wyj@163.com> 2014/12/11
 */

app.addRoute('index', function () {
  seajs.use(['jquery', 'BaseView', 'Main', 'template/layout_panel'],
    function (jquery, BaseView, Main, template) {
      var MainPanel = BaseView.extend({
        initialize: function () {
          this._initialize({
            template: template
          });
        },
        render: function () {
          this._render();
        }
      });
      app.addPanel('main', new MainPanel({
        el: '#jhw-main'
      })).on('after', function () {
        app.addView('main', new Main({
          el: '#jhw-main',
          viewId: 'main'
        }));
      }).render();
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
app.addTemplate('template/layout_panel', function (require, exports, module) {
  module.exports = require('modules/index/views/layout_panel.html')
});