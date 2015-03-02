/**
 * @description 产品模型类
 * @namespace MessageModel
 * @author yongjin on 2014/10/31
 */
define('MessageModel', ['jquery', 'BaseModel'],
  function (require, exports, module) {
    var MessageModel, BaseModel;

    BaseModel = require('BaseModel');

    MessageModel = BaseModel.extend({
      defaults: Est.extend({
        title: "",
        addTime: new Date().getTime(),
        ip: "",
        messageId: "",
        replyId: null,
        addEnt: null,
        recvUser: "",
        recvEnt: "",
        sendState: "01",
        recvState: "00",
        fromName: "",
        fromEmail: "",
        fromPhone: null,
        addUser: null,
        type: "user",
        content: ""
      }, BaseModel.prototype.defaults),
      baseId: 'messageId',
      baseUrl: CONST.API + '/message/detail',
      initialize: function () {
        this._initialize();
      }
    });
    module.exports = MessageModel;
  });