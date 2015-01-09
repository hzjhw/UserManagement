/**
 * @description messageModel.js
 * @namespace messageModel.js
 * @author wxw on 15-1-8
 */
define('MessageSendModel', ['BaseModel'], function (require, exports, module) {
  var MessageSendModel, BaseModel;

  BaseModel = require('BaseModel');

  MessageSendModel = BaseModel.extend({
    defaults: Est.extend({
      messageType:'member',
      isSaveDraftbox:'01'
    }, BaseModel.prototype.defaults),
    baseUrl: CONST.API + '/shop/message/send',
    BaseId: 'messageId',
    initialize: function () {
      this._initialize();
    }
  });

  module.exports = MessageSendModel;
});