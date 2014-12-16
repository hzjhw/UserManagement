/**
 * @description MemberListDetail
 * @namespace MemberListDetail
 * @author wxw on 14-12-16
 */
define('MemberListDetail', ['jquery', 'MemberListModel', 'HandlebarsHelper', 'BaseDetail', 'dialog', 'template/member_list_detail'],
  function (require, exports, module) {
    var MemberListDetail, MemberListModel, HandlebarsHelper, BaseDetail, template, AttributesShow, dialog, Tag;

    MemberListModel = require('MemberListModel');
    HandlebarsHelper = require('HandlebarsHelper');
    BaseDetail = require('BaseDetail');
    template = require('template/member_list_detail');
    dialog = require('dialog');
    AttributesShow = require('AttributesShow');
    Tag = require('Tag');

    MemberListDetail = BaseDetail.extend({
      el: '#jhw-detail',
      events: {
        'click #member-reset': 'reset'
      },
      initialize: function () {
        debug('2.MemberDetail.initialize');
        this._initialize({
          template : template,
          model: MemberListModel
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

    module.exports = MemberListDetail;

  });