/**
 * @description MessageSendDetail
 * @namespace MessageSendDetail
 * @author wxw on 2015/1/13
 */
define('MessageSendDetail', ['jquery', 'MessageModel', 'HandlebarsHelper', 'BaseDetail', 'dialog', 'template/message_send', 'Utils'],
  function (require, exports, module) {
    var MessageSendDetail, MessageModel, HandlebarsHelper, BaseDetail, template, dialog, Utils;

    MessageModel = require('MessageModel');
    HandlebarsHelper = require('HandlebarsHelper');
    BaseDetail = require('BaseDetail');
    template = require('template/message_send');
    dialog = require('dialog');
    Utils = require('Utils');

    MessageSendDetail = BaseDetail.extend({
      el: '#jhw-detail',
      events: {
        'click .refreshCode': 'refreshCode'
      },
      initialize: function () {
        this._initialize({
          template: template,
          model: MessageModel
        });
      },
      refreshCode: function () {
        var $verifyPic = this.$("#verifyPic");
        $verifyPic.attr("src", $verifyPic.attr("src") + '?time=' + new Date().getTime())
      },
      render: function () {
        debug('4.MessageDetail.render');
        this.model.set('userName', app.getData('user')['name']);
        this.model.set('cellphone', app.getData('user')['cellphone']);
        this.model.set('email', app.getData('user')['email']);
        if (app.getData('curMessageUserName')) {
          this.model.set('username', app.getData('curMessageUserName'));
        }
        if (app.getData('curMessageType')) {
          switch (app.getData('curMessageType')) {
            case '03':
              this.model.set('type', 'user');
              break;
            case '04':
              this.model.set('type', 'admin');
              break;
            case '07':
              this.model.set('type', 'member');
              break;
          }
        }
        this._render();
        Utils.initSelect({
          render: '#s6',
          target: '#model-type',
          items: [
            {text: '其它会员', value: 'user'},
            {text: '我的下属会员', value: 'member'},
            {text: '系统管理员', value: 'admin'}
          ]
        });
        this._form('#J_Form')._validate()._init();
        return this;
      }
    });

    module.exports = MessageSendDetail;

  });