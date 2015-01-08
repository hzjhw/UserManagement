/**
 * @description messageList.js
 * @namespace messageList.js
 * @author Administrator on 15-1-8
 */
define('MessageOutbox', ['BaseList', 'BaseView', 'BaseCollection', 'BaseItem', 'BaseModel', 'template/message_outbox'],
  function (require, exports, module) {
    var MessageOutbox, BaseList, BaseView, itemTemp, listTemp, BaseCollection, BaseItem, model, item, collection,
      BaseModel, BaseCollection;

    BaseView = require('BaseView');
    itemTemp = require('template/message_outbox');
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

    item = BaseItem.extend({
      tagName: 'tr',
      initialize: function () {
        this._initialize({
          template: itemTemp
        });
      },
      render: function () {
        this.render();
      }
    });

    MessageOutbox = BaseList.extend({
      initialize: function () {
        this._initialize({
          model: model,
          collection: collection,
          item: item,
          template: listTemp,
          render: '.order-tbody'
        });
        this.render();
      },
      render: function () {
        this._render();
      }
    });

    module.exports = MessageOutbox;
  });