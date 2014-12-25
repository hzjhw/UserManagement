/**
 * @description MemberListDetail
 * @namespace MemberListDetail
 * @author wxw on 14-12-16
 */
define('MemberListDetail', ['jquery', 'MemberListModel', 'HandlebarsHelper', 'BaseDetail',
    'dialog', 'template/member_list_detail', 'BaseUtils','MemberAttributeModel','BaseCollection','MemberAttributesShow','BaseService'],
  function (require, exports, module) {
    var MemberListDetail, MemberListModel, HandlebarsHelper, BaseDetail, template, MemberAttributesShow, dialog, Tag, BaseUtils
      ,MemberAttrModel,BaseCollection,attrCollection ,BaseService;

    MemberListModel = require('MemberListModel');
    HandlebarsHelper = require('HandlebarsHelper');
    BaseDetail = require('BaseDetail');
    template = require('template/member_list_detail');
    dialog = require('dialog');
    MemberAttributesShow = require('MemberAttributesShow');
    Tag = require('Tag');
    BaseUtils = require('BaseUtils');
    BaseCollection = require('BaseCollection');
    MemberAttrModel = require('MemberAttrModel');
    BaseService = require('BaseService');
    attrCollection = BaseCollection.extend({
      url:CONST.API + '/member/attr/list/',
      model: MemberAttrModel,
      initialize: function () {
        this._initialize();
      },
      getName: function () {
        return this.name;
      },
      getAttributeType: function () {
        return this.attributeType;
      }
    });

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

        // 表单初始化
        this._form('#J_Form')._validate()._init({
          onBeforeSave: function(){
            ctx.model.set('attributeOptionList',ctx.attribute.getItems().join(","))
          },
          onAfterSave: function(response){
          }
        });
        // 会员分类
        BaseService.getMemberRankCategory({ select: true, extend: true }
        ).then(function (list) {
            BaseUtils.initSelect({
              render: '#s1',
              target: '#model-memberRank',
              items: list
              /*change: function (categoryId) {
                var buttons = [
                  {
                    value: '更换',
                    callback: function () {
                      ctx.showAttributes(categoryId, []);
                    }},
                  {
                    value: '保留',
                    autofocus: true,
                    callback: function () {
                      this.close();
                    }
                  }
                ];
                if (!ctx._isAdd) {
                  dialog({
                    title: '提示',
                    content: '更换分类将更改产品属性选项， 点击“保留”只更改分类， 不更改属性！',
                    width: 250,
                    button: buttons
                  }).show($("#s1").get(0));
                } else {
                  ctx.showAttributes(categoryId);
                }
              }*/
            });
          });
/*
        if (!ctx._isAdd) {
          ctx.showAttributes(ctx.model.get('category'), ctx.model.get('productAttributeMapStore'));
        }
*/
        if (!ctx._isAdd) {
          ctx.showAttributes(ctx.model.get('memberAttributeMapStore'));
        }else{
          ctx.showAttributes();
        }
        setTimeout(function () {
          BaseUtils.resetIframe();
        }, 1000);
        return this;
      },

      showAttributes: function(items){
        if (!this.attribute){
          this.attribute = new MemberAttributesShow({
            render: '#attribute-list',
            items: items
          });
        } else{
          this.attribute.reload(categoryId);
        }
      }
    });

    module.exports = MemberListDetail;

  });