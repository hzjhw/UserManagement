/**
 * @description MemberListDetail
 * @namespace MemberListDetail
 * @author wxw on 14-12-16
 */
define('MemberListDetail', ['jquery', 'MemberListModel', 'HandlebarsHelper', 'BaseDetail',
    'dialog', 'template/member_list_detail', 'Utils', 'BaseCollection', 'MemberAttributesShow', 'Service'],
  function (require, exports, module) {
    var MemberListDetail, MemberListModel, HandlebarsHelper, BaseDetail, template, MemberAttributesShow, dialog, Tag, Utils
      , BaseCollection, Service;

    MemberListModel = require('MemberListModel');
    HandlebarsHelper = require('HandlebarsHelper');
    BaseDetail = require('BaseDetail');
    template = require('template/member_list_detail');
    dialog = require('dialog');
    MemberAttributesShow = require('MemberAttributesShow');
    Tag = require('Tag');
    Utils = require('Utils');
    BaseCollection = require('BaseCollection');
    Service = require('Service');


    MemberListDetail = BaseDetail.extend({
      el: '#jhw-detail',
      events: {
        'click #member-reset': 'reset',
        'click .btn-back': 'back'
      },
      initialize: function () {
        debug('2.MemberDetail.initialize');
        this._initialize({
          template: template,
          model: MemberListModel
        });
      },
      back: function () {
        this._navigate('#/member', true);
      },
      render: function () {
        debug('4.MemberDetail.render');
        var ctx = this;
        this.model.set('taglist', Est.pluck(Est.pluck(this.model.get('tagMapStore'), 'tag'), 'name')
          .join(","));
        this._render();

        Utils.initTab({
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
          onBeforeSave: function () {
            //ctx.model.set('attributeOptionList',ctx.attribute.getItems().join(","))
          },
          onAfterSave: function (response) {
          }
        });
        // 会员分类
        Service.getMemberRankCategory({ select: true, extend: true }
        ).then(function (list) {
            Utils.initSelect({
              render: '#s1',
              target: '#model-memberRank',
              items: list
            });
          });
        if (!ctx._isAdd) {
          ctx.showAttributes(ctx.model.get('memberAttributeMapStore'));
        } else {
          ctx.showAttributes();
        }
        setTimeout(function () {
          Utils.resetIframe();
        }, 1000);
        return this;
      },

      showAttributes: function (items) {
        if (!this.attribute) {
          this.attribute = new MemberAttributesShow({
            render: '#attribute-list',
            items: items
          });
        } else {
          this.attribute.reload();
        }
      }
    });

    module.exports = MemberListDetail;

  });