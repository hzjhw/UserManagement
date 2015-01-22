/**
 * @description messageModel.js
 * @namespace messageModel.js
 * @author wxw on 15-1-8
 */
define('MessageOutboxModel', ['BaseModel'], function (require, exports, module) {
  var MessageOutboxModel, BaseModel;

  BaseModel = require('BaseModel');

  MessageOutboxModel = BaseModel.extend({
    defaults: Est.extend({
      isClicked: false,
      isIcon:'downIcon'
    }, BaseModel.prototype.defaults),
    baseUrl: CONST.API + '/shop/message/outbox',
    BaseId: 'messageId',
    initialize: function () {
      this._initialize();
    }
  });

  module.exports = MessageOutboxModel;
});