/**
 * @description messageList.js
 * @namespace messageList.js
 * @author wxw on 15-1-8
 */
define('MessageInbox', ['BaseList', 'BaseView', 'BaseCollection', 'BaseItem', 'BaseModel', 'template/message_inbox_item'
    , 'template/message_inbox_list','MessageInboxModel'],
  function (require, exports, module) {
    var MessageInbox, BaseList, BaseView, itemTemp, listTemp, BaseCollection, BaseItem, item, collection,
      BaseModel, messageInboxModel;

    BaseView = require('BaseView');
    itemTemp = require('template/message_inbox_item');
    listTemp = require('template/message_inbox_list');
    BaseList = require('BaseList');
    BaseModel = require('BaseModel');
    messageInboxModel = require('MessageInboxModel');
    BaseCollection = require('BaseCollection');
    BaseItem = require('BaseItem');

    collection = BaseCollection.extend({
      url: CONST.API + '/shop/message/inbox',
      initialize: function () {
        this._initialize({
          model: messageInboxModel
        });
      }
    });

    item = BaseItem.extend({
      tagName: 'tr',
      events: {
        'click .delete': '_del',
        'click .edit': 'edit',
        'click .member_div_in' : 'display'
      },
      initialize: function () {
        this._initialize({
          template: itemTemp
        });
      },
      render: function () {
        this._render();
      },
      edit: function(){
        var ctx=this;
          seajs.use(['jquery', 'MessageSend'], function (jquery, MessageSend) {
            app.addPanel('main', {
              el: '#main',
              template: '<div class="main-inner"></div>'
            }).addView('messageSend', new MessageSend({
              el: '.main-inner',
              id: ctx.model.get('messageId'),
              messageType: 'detail',
              data: {
                messageType: 'detail'
              }
            }));
          });
      },
      display :function(e){
        e.stopImmediatePropagation();
        this.model.set('isClicked', !this.model.get('isClicked'));
      }
    });
    MessageInbox = BaseList.extend({
      initialize: function () {
        this._initialize({
          model: messageInboxModel,
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

    module.exports = MessageInbox;
  });