/**
 * @description messageList.js
 * @namespace messageList.js
 * @author wxw on 15-1-8
 */
define('MessageOutbox', ['BaseList', 'BaseView', 'BaseCollection', 'BaseItem', 'BaseModel', 'template/message_outbox_item'
    , 'template/message_outbox_list','MessageOutboxModel'],
  function (require, exports, module) {
    var MessageOutbox, BaseList, BaseView, itemTemp, listTemp, BaseCollection, BaseItem, item, collection,
      BaseModel, messageOutboxModel;

    BaseView = require('BaseView');
    itemTemp = require('template/message_outbox_item');
    listTemp = require('template/message_outbox_list');
    BaseList = require('BaseList');
    BaseModel = require('BaseModel');
    messageOutboxModel = require('MessageOutboxModel');
    BaseCollection = require('BaseCollection');
    BaseItem = require('BaseItem');

    collection = BaseCollection.extend({
      url: CONST.API + '/shop/message/outbox',
      initialize: function () {
        this._initialize({
          model: messageOutboxModel
        });
      }
    });

    item = BaseItem.extend({
      tagName: 'div',
      events: {
        'click .delete': '_del',
        'click .message_tr' :'message_tr'
      },
      initialize: function () {
        this._initialize({
          template: itemTemp
        });
      },
      render: function () {
        this.render();
      },
      message_tr :function(){
          $(this).next('.message_tr2').toggle();
      }
    });

    MessageOutbox = BaseList.extend({
      initialize: function () {
        this._initialize({
          model: messageOutboxModel,
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