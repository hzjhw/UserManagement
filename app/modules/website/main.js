/**
 * @description main
 * @namespace main
 * @author yongjin<zjut_wyj@163.com> 2014/12/26
 */
app.addRoute('static', function () {
  seajs.use(['jquery', 'BaseView', 'NavigateList', 'template/website_panel'],
    function (jquery, BaseView, NavigateList, template) {
      var WebsitePanel = BaseView.extend({
        initialize: function () {
          this._initialize({
            template: template
          });
        },
        render: function () {
          this._render();
        }
      });
      app.addPanel('website', new WebsitePanel({
        el: '#jhw-main'
      })).on('after', function () {
        app.addView('navigateList', new NavigateList({
          el: '.jhw-main-inner',
          viewId: 'navigateList'
        }));
      }).render();
    });
});
var userdefinedRoute = function (id) {
  seajs.use(['BaseView', 'UserdefinedList', 'template/website_panel'],
    function (BaseView, UserdefinedList, template) {
      var UserdefinedPanel = BaseView.extend({
        initialize: function () {
          this._initialize({
            template: template
          });
        },
        render: function () {
          this._render();
        }
      });
      app.addPanel('userdefined', new UserdefinedPanel({
        el: '#jhw-main'
      })).on('after', function () {
        app.addView('userdefinedList', new UserdefinedList({
          el: '.jhw-main-inner',
          viewId: 'userdefinedList',
          data: {
            page: id
          }
        }));
      }).render();
    });
}
app.addRoute('userdefined/:id', userdefinedRoute);
app.addRoute('userdefined', userdefinedRoute);

app.addModule('NavigateList', 'modules/website/controllers/NavigateList.js');
app.addModule('NavigateModel', 'models/NavigateModel.js');
app.addModule('NavigateDetail', 'modules/website/controllers/NavigateDetail.js');
app.addModule('UserdefinedList', 'modules/website/controllers/UserdefinedList.js');
app.addModule('UserdefinedModel', 'models/UserdefinedModel.js');
app.addModule('UserdefinedDetail', 'modules/website/controllers/UserdefinedDetail.js');

app.addTemplate('template/navigate_list', function (require, exports, module) {
  module.exports = require('modules/website/views/navigate_list.html');
});

app.addTemplate('template/navigate_item', function (require, exports, module) {
  module.exports = require('modules/website/views/navigate_item.html');
});
app.addTemplate('template/userdefined_list', function (require, exports, module) {
  module.exports = require('modules/website/views/userdefined_list.html');
});
app.addTemplate('template/userdefined_item', function (require, exports, module) {
  module.exports = require('modules/website/views/userdefined_item.html');
});
app.addTemplate('template/website_panel', function (require, exports, module) {
  module.exports = require('modules/website/views/website_panel.html');
});
app.addTemplate('template/website_static', function(require, exports, module){
  module.exports = require('modules/website/views/website_static.html');
});
