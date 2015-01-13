/**
 * @description MessageDetail
 * @namespace MessageDetail
 * @author wxw on 2014/12/31
 */
define('MessageSendDetail', ['jquery', 'MessageModel', 'HandlebarsHelper', 'BaseDetail', 'AttributesShow', 'dialog', 'template/message_send', 'Tag', 'BaseUtils'],
  function (require, exports, module) {
    var MessageSendDetail, MessageModel, HandlebarsHelper, BaseDetail, template, AttributesShow, dialog, Tag, BaseUtils;

    MessageModel = require('MessageModel');
    HandlebarsHelper = require('HandlebarsHelper');
    BaseDetail = require('BaseDetail');
    template = require('template/message_send');
    dialog = require('dialog');
    AttributesShow = require('AttributesShow');
    Tag = require('Tag');
    BaseUtils = require('BaseUtils');

    MessageSendDetail = BaseDetail.extend({
      el: '#jhw-detail',
      events: {
        'click #message-reset': 'reset'
      },
      initialize: function () {
        debug('2.MessageDetail.initialize');
        this._initialize({
          template : template,
          model: MessageModel
        });
      },
      render: function () {
        debug('4.MessageDetail.render');
        var ctx = this;
        this._render();
        // 表单初始
        this._form('#J_Form')._validate()._init({
          onBeforeSave: function(){
          },
          onAfterSave: function(response){
          }
        });
        setTimeout(function () {
          BaseUtils.resetIframe();
        }, 1000);
        return this;
      }
    });

    module.exports = MessageSendDetail;

  });