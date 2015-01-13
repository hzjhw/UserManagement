/**
 * @description main
 * @namespace main
 * @author wxw<zjut_wyj@163.com> 2015/1/7
 */

app.addRoute('message_send', function () {
  seajs.use(['jquery', 'MessageSend'], function (jquery, MessageSend) {
    app.addPanel('main', {
      el: '#main',
      template: '<div class="main-inner"></div>'
    }).addView('messageSend', new MessageSend({
      el: '.main-inner',
      data: app.getData('user')
    }));
    app.getView('breadcrumb').reload('发送信息');
  });
});
app.addRoute('message_view', function () {
  seajs.use(['jquery', 'MessageInbox'], function (jquery, MessageInbox) {
    app.addPanel('main', {
      el: '#main',
      template: '<div class="main-inner"></div>'
    }).addView('messageInbox', new MessageInbox({
      el: '.main-inner',
      data: app.getData('user'),
      items: app.getData('user')['orderSet'],
      page: 1,
      pageSize: 15,
      pagination: true
    }));
    app.getView('breadcrumb').reload('收件箱');
  });
});
app.addRoute('message_list', function () {
  seajs.use(['jquery', 'MessageOutbox'], function (jquery, MessageOutbox) {
    app.addPanel('main', {
      el: '#main',
      template: '<div class="main-inner"></div>'
    }).addView('messageOutbox', new MessageOutbox({
      el: '.main-inner',
      data: app.getData('user'),
      items: app.getData('user')['orderSet'],
      page: 1,
      pageSize: 15,
      pagination: true
    }));
    app.getView('breadcrumb').reload('发件箱');
  });
});


app.addModule('MessageModel', 'modules/member/management/message/model/MessageModel.js');
app.addModule('MessageInboxModel', 'modules/member/management/message/model/MessageInboxModel.js');
app.addModule('MessageOutboxModel', 'modules/member/management/message/model/MessageOutboxModel.js');
app.addModule('MessageSendModel', 'modules/member/management/message/model/MessageSendModel.js');
app.addModule('MessageSend', 'modules/member/management/message/controllers/MessageSend.js');
app.addModule('MessageInbox', 'modules/member/management/message/controllers/MessageInbox.js');
app.addModule('MessageOutbox', 'modules/member/management/message/controllers/MessageOutbox.js');

app.addTemplate('template/message_send', function (require, exports, module) {
  module.exports = require('modules/member/management/message/views/message_send.html');
});
app.addTemplate('template/message_inbox_item', function (require, exports, module) {
  module.exports = require('modules/member/management/message/views/message_inbox_item.html');
});
app.addTemplate('template/message_inbox_list', function (require, exports, module) {
  module.exports = require('modules/member/management/message/views/message_inbox_list.html');
});
app.addTemplate('template/message_outbox_item', function (require, exports, module) {
  module.exports = require('modules/member/management/message/views/message_outbox_item.html');
});
app.addTemplate('template/message_outbox_list', function (require, exports, module) {
  module.exports = require('modules/member/management/message/views/message_outbox_list.html');
});
