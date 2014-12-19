/**
 * @description MemberRankDetail
 * @namespace MemberRankDetail
 * @author wxw on 14-12-16
 */
define('MemberRankDetail', ['jquery', 'MemberRankModel', 'HandlebarsHelper', 'BaseDetail', 'dialog', 'template/member_rank_detail'],
  function (require, exports, module) {
    var MemberRankDetail, MemberRankModel, HandlebarsHelper, BaseDetail, template, AttributesShow, dialog, Tag;

    MemberRankModel = require('MemberRankModel');
    HandlebarsHelper = require('HandlebarsHelper');
    BaseDetail = require('BaseDetail');
    template = require('template/member_rank_detail');
    dialog = require('dialog');
    AttributesShow = require('AttributesShow');
    Tag = require('Tag');

    MemberRankDetail = BaseDetail.extend({
      el: '#jhw-detail',
      events: {
        'click #member-reset': 'reset'
      },
      initialize: function () {
        debug('2.MemberDetail.initialize');
        this._initialize({
          template : template,
          model: MemberRankModel
        });
      },
      render: function () {
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
            render: '#attribute-list',
            categoryId: categoryId,
            items: items
          });
        } else{
          this.attributes.reload(categoryId);
        }
      }
    });

    module.exports = MemberRankDetail;

  });