/**
 * @description MemberListDetail
 * @namespace MemberListDetail
 * @author wxw on 14-12-16
 */
define('MemberListDetail', ['jquery', 'MemberListModel', 'HandlebarsHelper', 'BaseDetail',
    'dialog', 'template/member_list_detail', 'BaseUtils','BaseCollection','MemberAttributesShow','BaseService'],
  function (require, exports, module) {
    var MemberListDetail, MemberListModel, HandlebarsHelper, BaseDetail, template, MemberAttributesShow, dialog, Tag, BaseUtils
      ,BaseCollection,BaseService;

    MemberListModel = require('MemberListModel');
    HandlebarsHelper = require('HandlebarsHelper');
    BaseDetail = require('BaseDetail');
    template = require('template/member_list_detail');
    dialog = require('dialog');
    MemberAttributesShow = require('MemberAttributesShow');
    Tag = require('Tag');
    BaseUtils = require('BaseUtils');
    BaseCollection = require('BaseCollection');
    BaseService = require('BaseService');


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

        BaseUtils.initTab({
          render: '#tab',
          elCls: 'nav-tabs',
          panelContainer: '#panel',
          autoRender: true,
          children: [
            {title: '常规', value: '1', selected: true},
            {title: '会员属性', value: '2'}

          ]
        });
        // 表单初始化
        this._form('#J_Form')._validate()._init({
          onBeforeSave: function(){
            //ctx.model.set('attributeOptionList',ctx.attribute.getItems().join(","))
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
            });
          });
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
          this.attribute.reload();
        }
      }
    });

    module.exports = MemberListDetail;

  });