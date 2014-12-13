/**
 * @description 产品添加或修改视图
 * @namespace MessageDetail
 * @author yongjin on 2014/10/31
 */
define('MessageDetail', ['jquery', 'MessageModel', 'HandlebarsHelper', 'BaseDetail', 'AttributesShow', 'dialog', 'template/message_detail', 'Tag'],
  function (require, exports, module) {
    var MessageDetail, MessageModel, HandlebarsHelper, BaseDetail, template, AttributesShow, dialog, Tag;

    MessageModel = require('MessageModel');
    HandlebarsHelper = require('HandlebarsHelper');
    BaseDetail = require('BaseDetail');
    template = require('template/message_detail');
    dialog = require('dialog');
    AttributesShow = require('AttributesShow');
    Tag = require('Tag');

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

        this.model.set('taglist', Est.pluck(Est.pluck(this.model.get('tagMapStore'), 'tag'), 'name')
          .join(","));
        this._render();

        // 表单初始化
        this._form('#J_Form')._validate()._init({
          onBeforeSave: function(){
            // 处理特殊字段
            this.model.set('taglist', Est.map(ctx.tagInstance.collection.models, function (item) {
              return item.get('name');
            }).join(','));
          },
          onAfterSave: function(response){
          }
        });

        setTimeout(function () {
          ctx._resetIframe();
        }, 1000);

        return this;
      },
      showAttributes: function(categoryId, items){
        if (!this.attributes){
          this.attributes = new AttributesShow({
            render: '#attributes-list',
            categoryId: categoryId,
            items: items
          });
        } else{
          this.attributes.reload(categoryId);
        }
      }
    });

    module.exports = MessageDetail;

  });