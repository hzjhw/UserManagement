/**
 * @description messageList.js
 * @namespace messageList.js
 * @author Administrator on 15-1-8
 */
define('MessageSend', ['BaseDetail', 'template/message_send','MessageSendModel'],
  function (require, exports, module) {
    var MessageSend, BaseDetail, message_send,MessageSendModel;

    message_send = require('template/message_send');
    BaseDetail = require('BaseDetail');
    MessageSendModel = require('MessageSendModel');


    MessageSend = BaseDetail.extend({
      even:{
      'click #model1-type':'typeclick'
      },
      initialize: function () {
        this._initialize({
          model: MessageSendModel,
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