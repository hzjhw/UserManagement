/**
 * @description 微网页
 * @namespace config
 * @author jihui-wxw2014/12/12
 */
/**
 * 路由
 * */
app.addRoute('wwy', function () {
  seajs.use(['jquery', 'WwyList'], function (jquery, WwyList) {
    app.addPanel('main', {
      el: '#jhw-main',
      template: '<div class="jhw-panel"></div>'
    }).addView('wwyList', new WwyList({
      el: '.jhw-panel',
      viewId: 'wwyList'
    }));
  });
});
app.addRoute('wwy_mobile/:id', function (id) {
  seajs.use(['jquery', 'WwyMobileList'], function (jquery, WwyMobileList) {
    app.addPanel('main', {
      el: '#jhw-main',
      template: '<div class="jhw-panel"></div>'
    }).addView('WwyMobileList', new WwyMobileList({
      el: '.jhw-panel',
      wyId: id
    }));
  });
});
app.addRoute('wwy_message/:id', function (id) {
  seajs.use(['jquery', 'WwyMessageList'], function (jquery, WwyMessageList) {
    app.addPanel('main', {
      el: '#jhw-main',
      template: '<div class="jhw-panel"></div>'
    }).addView('WwyMessageList', new WwyMessageList({
      el: '.jhw-panel',
      wyId: id
    }));
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