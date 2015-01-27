/**
 * @description MemberRankDetail
 * @namespace MemberRankDetail
 * @author wxw on 14-12-16
 */
define('MemberRankDetail', ['jquery', 'MemberRankModel', 'HandlebarsHelper', 'BaseDetail',
    'dialog', 'template/member_rank_detail', 'Utils'],
  function (require, exports, module) {
    var MemberRankDetail, MemberRankModel, HandlebarsHelper, BaseDetail, template, AttributesShow, dialog, Tag, Utils;

    MemberRankModel = require('MemberRankModel');
    HandlebarsHelper = require('HandlebarsHelper');
    BaseDetail = require('BaseDetail');
    template = require('template/member_rank_detail');
    dialog = require('dialog');
    AttributesShow = require('AttributesShow');
    Tag = require('Tag');
    Utils = require('Utils');

    MemberRankDetail = BaseDetail.extend({
      el: '#jhw-detail',
      events: {
        'click #member-reset': 'reset',
        'click .btn-back': 'back'
      },
      initialize: function () {
        debug('2.MemberDetail.initialize');
        this._initialize({
          template: template,
          model: MemberRankModel
        });
      },
      back: function () {
        this._navigate('#/member/rank', true);
      },
      render: function () {
        this.model.set('taglist', Est.pluck(Est.pluck(this.model.get('tagMapStore'), 'tag'), 'name')
          .join(","));
        this._render();
        this._form('#J_Form')._validate()._init({
          onBeforeSave: function () {
          },
          onAfterSave: function (response) {
          }
        });
        return this;
      },
      showAttributes: function (categoryId, items) {
        if (!this.attributes) {
          this.attributes = new AttributesShow({
            render: '#attribute-list',
            categoryId: categoryId,
            items: items
          });
        } else {
          this.attributes.reload(categoryId);
        }
      }
    });

    module.exports = MemberRankDetail;

  });