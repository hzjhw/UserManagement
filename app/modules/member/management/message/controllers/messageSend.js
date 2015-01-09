/**
 * @description messageList.js
 * @namespace messageList.js
 * @author Administrator on 15-1-8
 */
define('MessageSend', ['BaseDetail', 'BaseView', 'BaseCollection', 'BaseItem', 'BaseModel', 'template/message_send','MessageSendModel'],
  function (require, exports, module) {
    var MessageSend, BaseDetail, BaseView, message_send, BaseCollection, BaseItem, collection, BaseModel,MessageSendModel;

    BaseView = require('BaseView');
    message_send = require('template/message_send');
    BaseDetail = require('BaseDetail');
    BaseModel = require('BaseModel');
    BaseCollection = require('BaseCollection');
    BaseItem = require('BaseItem');

    MessageSendModel = require('MessageSendModel');

    collection = BaseCollection.extend({
      initialize: function () {
        this._initialize({
          model: MessageSendModel
        });
      }
    });

    MessageSend = BaseDetail.extend({
      initialize: function () {
        this._initialize({
          model: MessageSendModel,
          collection: collection,
          template: message_send
        });
      },
      render: function () {
        this._render();
        this._form('#J_Form')._validate()._init({
          onBeforeSave: function(){
            this.model.set('_data',null)
          },
          onAfterSave: function(response){
          }
        });
      }
    });

    module.exports = MessageSend;
  });