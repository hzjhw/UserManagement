/**
 * @description MemberAttributeDetail
 * @namespace MemberAttributeDetail
 * @author wxw on 14-12-16
 */
define('MemberAttributeDetail', ['jquery', 'MemberAttributeModel', 'HandlebarsHelper', 'BaseDetail', 'dialog',
    'template/member_attribute_detail', 'AttributesAdd', 'Utils'],
  function (require, exports, module) {
    var MemberAttributeDetail, MemberAttributeModel, HandlebarsHelper, BaseDetail, template, dialog, Tag, AttributesAdd, Utils;

    MemberAttributeModel = require('MemberAttributeModel');
    HandlebarsHelper = require('HandlebarsHelper');
    BaseDetail = require('BaseDetail');
    template = require('template/member_attribute_detail');
    dialog = require('dialog');
    Tag = require('Tag');
    AttributesAdd = require('AttributesAdd');
    Utils = require('Utils');

    MemberAttributeDetail = BaseDetail.extend({
      el: '#jhw-detail',
      events: {
        'click #member-reset': 'reset',
        'click .btn-back': 'back'
      },
      initialize: function () {
        debug('2.MemberDetail.initialize');
        this._initialize({
          template: template,
          model: MemberAttributeModel
        });
      },
      back: function () {
        this._navigate('#/member/attr', true);
      },
      render: function () {
        this.categoryId = Est.getUrlParam('id', window.location.href);
        this.model.set('categoryId', this.categoryId);
        this._render();
        this.attributeSelect();
        this.attributeRender();
        this._form("#J_Form")._validate({})._init({
          onBeforeSave: function () {
            this.model.set("attributeOptionList",
              Est.pluck(app.getView('attributesAdd').getItems(), 'value'));
          }
        });
        return this;
      },
      showAttribute: function () {
        $("#multi-attribute").show();
      },
      attributeSelect: function () {
        var ctx = this;
        Utils.initSelect({
          render: '#s2',
          target: '#model-attributeType',
          itemId: 'value',
          items: [
            {text: '文本', value: 'text'},
            {text: '数字', value: 'number'},
            {text: '字母', value: 'alphaint'},
            {text: '单选项', value: 'select'},
            {text: '多选项', value: 'checkbox'},
            {text: '日期', value: 'date'}
          ]
        }).then(function (select) {
          if (select === 'select' || select === 'checkbox') {
            $("#multi-attribute").show();
          } else {
            $("#multi-attribute").hide();
          }
          Utils.resetIframe();
        });
      },
      attributeRender: function () {
        var attributesOptionList = this.model.get('attributeOptionList');
        var options = { el: '#multi-attribute', add: function () {
          Utils.resetIframe();
        }};
        if (attributesOptionList && attributesOptionList.length > 0) {
          options.items = attributesOptionList;
          this.showAttribute();
        }
        app.addView('attributesAdd', new AttributesAdd(options));
      }
    });

    module.exports = MemberAttributeDetail;

  });