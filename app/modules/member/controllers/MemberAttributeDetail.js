/**
 * @description MemberAttributeDetail
 * @namespace MemberAttributeDetail
 * @author wxw on 14-12-16
 */
define('MemberAttributeDetail', ['jquery', 'MemberAttributeModel', 'HandlebarsHelper', 'BaseDetail', 'dialog', 'template/member_attribute_detail'],
  function (require, exports, module) {
    var MemberAttributeDetail, MemberAttributeModel, HandlebarsHelper, BaseDetail, template, AttributeShow, dialog, Tag;

    MemberAttributeModel = require('MemberAttributeModel');
    HandlebarsHelper = require('HandlebarsHelper');
    BaseDetail = require('BaseDetail');
    template = require('template/member_attribute_detail');
    dialog = require('dialog');
    AttributeShow = require('AttributeShow');
    Tag = require('Tag');

    MemberAttributeDetail = BaseDetail.extend({
      el: '#jhw-detail',
      events: {
        'click #member-reset': 'reset'
      },
      initialize: function () {
        debug('2.MemberDetail.initialize');
        this._initialize({
          template : template,
          model: MemberAttributeModel
        });
      },
      render: function () {
        debug('4.MemberDetail.render');
        var ctx = this;

        this.model.set('taglist', Est.pluck(Est.pluck(this.model.get('tagMapStore'), 'tag'), 'name')
          .join(","));
        this._render();
        // 编辑器
        this._initEditor({
          render: '.ckeditor'
        });

        // 表单初始化
        this._form('#J_Form')._validate()._init({
          onBeforeSave: function(){
            // 处理特殊字段
          },
          onAfterSave: function(response){
          }
        });

        setTimeout(function () {
          ctx._resetIframe();
        }, 1000);
        return this;
      },
      showAttribute: function(categoryId, items){
        if (!this.attribute){
          this.attribute = new AttributeShow({
            render: '#attribute-list',
            categoryId: categoryId,
            items: items
          });
        } else{
          this.attribute.reload(categoryId);
        }
      }
    });

    module.exports = MemberAttributeDetail;

  });