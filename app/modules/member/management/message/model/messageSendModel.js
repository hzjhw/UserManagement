/**
 * @description messageModel.js
 * @namespace messageModel.js
 * @author wxw on 15-1-8
 */
define('MessageSendModel', ['BaseModel'], function (require, exports, module) {
  var MessageSendModel, BaseModel;

  BaseModel = require('BaseModel');

  MessageSendModel = BaseModel.extend({
    defaults: Est.extend({
      type:'user',
      isSaveDraftbox:'01'
    }, BaseModel.prototype.defaults),
    baseUrl: function(){
      var end ='send';
      if(this.get('_data')['messageType'] === 'detail'){
        end = 'detail';
      }
      return CONST.API + '/shop/message/'+end;
    },
    BaseId: 'messageId',
    initialize: function () {
      this._initialize();
    }
  });

  module.exports = MessageSendModel;
});