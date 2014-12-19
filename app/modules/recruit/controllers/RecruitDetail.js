/**
 * @description RecruitDetail
 * @namespace RecruitDetail
 * @author wxw on 14-12-15
 */

define('RecruitDetail', ['jquery', 'RecruitModel', 'HandlebarsHelper', 'BaseDetail', 'AttributesShow', 'dialog', 'template/recruit_detail', 'Tag'],
  function (require, exports, module) {
    var RecruitDetail, RecruitModel, HandlebarsHelper, BaseDetail, template, AttributesShow, dialog, Tag;

    RecruitModel = require('RecruitModel');
    HandlebarsHelper = require('HandlebarsHelper');
    BaseDetail = require('BaseDetail');
    template = require('template/recruit_detail');
    dialog = require('dialog');
    AttributesShow = require('AttributesShow');
    Tag = require('Tag');

    RecruitDetail = BaseDetail.extend({
      el: '#jhw-detail',
      events: {
        'click #recruit-reset': 'reset'
      },
      initialize: function () {
        debug('2.RecruitDetail.initialize');
        this._initialize({
          template : template,
          model: RecruitModel
        });
      },
      render: function () {
        debug('4.RecruitDetail.render');
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

    module.exports = RecruitDetail;

  });