/**
 * @description messageList.js
 * @namespace messageList.js
 * @author Administrator on 15-1-8
 */
define('MessageSend', ['BaseList', 'BaseView', 'BaseCollection', 'BaseItem', 'BaseModel', 'template/message_send'],
  function (require, exports, module) {
    var MessageSend, BaseList, BaseView, message_send, BaseCollection, BaseItem, model, collection, BaseModel;

    BaseView = require('BaseView');
    message_send = require('template/message_send');
    BaseList = require('BaseList');
    BaseModel = require('BaseModel');
    BaseCollection = require('BaseCollection');
    BaseItem = require('BaseItem');

    model = BaseModel.extend({
      defaults: Est.extend({}, BaseModel.prototype.defaults),
      initialize: function () {
        this._initialize();
      }
    });

    collection = BaseCollection.extend({
      initialize: function () {
        this._initialize({
          model: model
        });
      }
    });

    MessageSend = BaseList.extend({
      initialize: function () {
        this._initialize({
          model: model,
          collection: collection,
          template: message_send
        });
        this.render();
      },
      render: function () {
        this._render();
      }
    });

    module.exports = MessageSend;
  });