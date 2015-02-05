/**
 * @description config
 * @namespace config
 * @author jihui-wxw2014/12/12
 */

/**
 * 路由
 * */
app.addRoute('message', function () {
  seajs.use(['jquery', 'MessageList'], function (jquery, MessageList) {
    app.addPanel('main', {
      el: '#jhw-main',
      template: '<div class="jhw-main-inner"></div>'
    }).addView(('messageList', new MessageList({
      el: '.jhw-main-inner'
    })));
  });
});
app.addRoute('message_add', function () {
  seajs.use(['MessageSendDetail'], function (MessageSendDetail) {
    app.addPanel('main', {
      el: '#jhw-main',
      template: '<div class="jhw-panel"></div>'
    }).addView('messageSendDetail', new MessageSendDetail({
      el: '.jhw-panel',
      viewId: 'messageSendDetail'
    }));
  });
});
/**
 * 模块
 * */
app.addModule('MessageModel', 'models/MessageModel.js');
app.addModule('MessageList', 'modules/message/controllers/MessageList.js');
app.addModule('MessageDetail', 'modules/message/controllers/MessageDetail.js');
app.addModule('MessageSendDetail', 'modules/message/controllers/MessageSendDetail.js');
app.addModule('MessageBindModel', 'models/MessageBindModel.js');

/**
 * 模板
 * */
app.addTemplate('template/message_item', function (require, exports, module) {
  module.exports = require('modules/message/views/message_item.html');
});
app.addTemplate('template/message_list', function (require, exports, module) {
  module.exports = require('modules/message/views/message_list.html');
});
app.addTemplate('template/message_detail', function (require, exports, module) {
  module.exports = require('modules/message/views/message_detail.html');
});
app.addTemplate('template/message_email', function (require, exports, module) {
  module.exports = require('modules/message/views/message_email.html');
});
app.addTemplate('template/message_send', function (require, exports, module) {
  module.exports = require('modules/message/views/message_send.html');
});