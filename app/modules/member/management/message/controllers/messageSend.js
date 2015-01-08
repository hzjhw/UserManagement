/**
 * @description messageList.js
 * @namespace messageList.js
 * @author Administrator on 15-1-8
 */
define('MessageSend', ['BaseList', 'BaseView', 'BaseCollection', 'BaseItem', 'BaseModel', 'template/message_send','MessageModel'],
  function (require, exports, module) {
    var MessageSend, BaseList, BaseView, message_send, BaseCollection, BaseItem, model, collection, BaseModel,messageModel;

    BaseView = require('BaseView');
    message_send = require('template/message_send');
    BaseList = require('BaseList');
    BaseModel = require('BaseModel');
    BaseCollection = require('BaseCollection');
    BaseItem = require('BaseItem');

    messageModel = require('MessageModel');

    collection = BaseCollection.extend({
      initialize: function () {
        this._initialize({
          model: messageModel
        });
      }
    });

    MessageSend = BaseList.extend({
      initialize: function () {
        this._initialize({
          model: messageModel,
          collection: collection,
          template: message_send
        });
        this.render();
      },
      render: function () {
        this._render();
        this._form('#J_Form')._validate()._init({
          onBeforeSave: function(){
          },
          onAfterSave: function(response){
          }
        });
      }
    });

    module.exports = MessageSend;
  });