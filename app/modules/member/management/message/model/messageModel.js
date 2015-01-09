/**
 * @description messageModel.js
 * @namespace messageModel.js
 * @author wxw on 15-1-8
 */
define('MessageModel', ['BaseModel'], function (require, exports, module) {
  var MessageModel, BaseModel;

  BaseModel = require('BaseModel');

  MessageModel = BaseModel.extend({
    defaults: Est.extend({
      messageType:'member',
      isSaveDraftbox:'01'
    }, BaseModel.prototype.defaults),
    baseUrl: CONST.API + '/shop/message/detail',
    BaseId: 'messageId',
    initialize: function () {
      this._initialize();
    }
  });

  module.exports = MessageModel;
});