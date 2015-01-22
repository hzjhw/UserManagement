/**
 * @description messageModel.js
 * @namespace messageModel.js
 * @author wxw on 15-1-8
 */
define('MessageInboxModel', ['BaseModel'], function (require, exports, module) {
  var MessageInboxModel, BaseModel;

  BaseModel = require('BaseModel');

  MessageInboxModel = BaseModel.extend({
    defaults: Est.extend({
      isClicked: false,
      isIcon:'downIcon'
    }, BaseModel.prototype.defaults),
    baseUrl: CONST.API + '/shop/message/inbox',
    BaseId: 'messageId',
    initialize: function () {
      this._initialize();
    }
  });

  module.exports = MessageInboxModel;
});