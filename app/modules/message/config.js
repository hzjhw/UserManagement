/**
 * @description config
 * @namespace config
 * @author jihui-wxw2014/12/12
 */
/**
 * 模块
 * */
app.addModule('MessageModel', 'models/MessageModel.js');
app.addModule('MessageList', 'modules/message/controllers/MessageList.js');
app.addModule('MessageDetail', 'modules/message/controllers/MessageDetail.js');

/**
 * 路由
 * */
app.addRoute('message', function(){
  seajs.use(['jquery', 'MessageList'], function (jquery, MessageList) {
    app.addView('messageList', new MessageList());
  });
});

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
app.addTemplate('template/message_email', function(require, exports, module){
  module.exports = require('modules/message/views/message_email.html');
});
