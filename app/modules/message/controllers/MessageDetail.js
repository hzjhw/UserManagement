/**
 * @description 产品添加或修改视图
 * @namespace MessageDetail
 * @author yongjin on 2014/10/31
 */
define('MessageDetail', ['jquery', 'MessageModel', 'HandlebarsHelper', 'BaseDetail', 'AttributesShow', 'dialog', 'template/message_detail', 'Tag', 'BaseUtils'],
  function (require, exports, module) {
    var MessageDetail, MessageModel, HandlebarsHelper, BaseDetail, template, AttributesShow, dialog, Tag, BaseUtils;

    MessageModel = require('MessageModel');
    HandlebarsHelper = require('HandlebarsHelper');
    BaseDetail = require('BaseDetail');
    template = require('template/message_detail');
    dialog = require('dialog');
    AttributesShow = require('AttributesShow');
    Tag = require('Tag');
    BaseUtils = require('BaseUtils');

    MessageDetail = BaseDetail.extend({
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

    module.exports = MessageDetail;

  });