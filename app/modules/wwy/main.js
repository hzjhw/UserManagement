/**
 * @description 微网页
 * @namespace config
 * @author jihui-wxw2014/12/12
 */
/**
 * 路由
 * */
app.addRoute('wwy', function () {
  seajs.use(['jquery', 'BaseView', 'WwyList', 'template/wwy_panel'],
    function (jquery, BaseView, WwyList, template) {
      var WwyPanel = BaseView.extend({
        initialize: function () {
          this._initialize({
            template: template
          });
        },
        render: function () {
          this._render();
        }
      });
      app.addPanel('wwy', new WwyPanel({
        el: '#jhw-main'
      })).on('after', function () {
        app.addView('wwyList', new WwyList({
          el: '.jhw-main-inner',
          viewId: 'wwyList'
        }));
      }).render();
    });
});
app.addRoute('wwy_mobile/:id', function (id) {
  seajs.use(['jquery', 'WwyMobileList'], function (jquery, WwyMobileList) {
    var wwyMobileList = new WwyMobileList({
      wyId: id
    });
    app.addView('WwyMobileList', wwyMobileList);
  });
});
app.addRoute('wwy_message/:id', function (id) {
  seajs.use(['jquery', 'WwyMessageList'], function (jquery, WwyMessageList) {
    var wwyMessageList = new WwyMessageList({
      wyId: id
    });
    app.addView('WwyMessageList', wwyMessageList);
  });
});

/**
 * 模块
 * */
app.addModule('WwyModel', 'models/WwyModel.js');
app.addModule('WwyList', 'modules/wwy/controllers/WwyList.js');
app.addModule('WwyDetail', 'modules/wwy/controllers/WwyDetail.js');

app.addModule('WwyMobileList', 'modules/wwy/controllers/WwyMobileList.js');
app.addModule('WwyMessageList', 'modules/wwy/controllers/WwyMessageList.js');

app.addModule('WwyMessageModel', 'models/WwyMessageModel.js');
app.addModule('WwyPicturePick', 'modules/wwy/controllers/WwyPicturePick.js');
app.addModule('WwyLtyList', 'modules/wwy/controllers/WwyLtyList.js');

/**
 * 模板
 * */
app.addTemplate('template/wwy_item', function (require, exports, module) {
  module.exports = require('modules/wwy/views/wwy_item.html');
});
app.addTemplate('template/wwy_list', function (require, exports, module) {
  module.exports = require('modules/wwy/views/wwy_list.html');
});
app.addTemplate('template/wwy_detail', function (require, exports, module) {
  module.exports = require('modules/wwy/views/wwy_detail.html');
});

app.addTemplate('template/wwy_mobile_item', function (require, exports, module) {
  module.exports = require('modules/wwy/views/wwy_mobile_item.html');
});
app.addTemplate('template/wwy_mobile_list', function (require, exports, module) {
  module.exports = require('modules/wwy/views/wwy_mobile_list.html');
});
app.addTemplate('template/wwy_message_item', function (require, exports, module) {
  module.exports = require('modules/wwy/views/wwy_message_item.html');
});
app.addTemplate('template/wwy_message_list', function (require, exports, module) {
  module.exports = require('modules/wwy/views/wwy_message_list.html');
});
app.addTemplate('template/wwy_picture_pick_list', function (require, exports, module) {
  module.exports = require('modules/wwy/views/picture_pick_list.html');
});
app.addTemplate('template/wwy_picture_pick_item', function (require, exports, module) {
  module.exports = require('modules/wwy/views/picture_pick_item.html');
});
app.addTemplate('template/wwy_lty_item', function (require, exports, module) {
  module.exports = require('modules/wwy/views/wwy_lty_item.html');
});
app.addTemplate('template/wwy_panel', function (require, exports, module) {
  module.exports = require('modules/wwy/views/wwy_panel.html');
});