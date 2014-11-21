/**
 * @description 属性添加或修改视图
 * @namespace AttributesDetail
 * @author yongjin on 2014/11/13
 */
define('AttributesDetail', ['jquery', 'AttributesModel', 'HandlebarsHelper', 'Est', 'BaseDetail', 'AttributesAdd'],
  function (require, exports, module) {
    var AttributesDetail, AttributesModel, HandlebarsHelper, Est, BaseDetail, AttributesAdd;

    AttributesModel = require('AttributesModel');
    HandlebarsHelper = require('HandlebarsHelper');
    Est = require('Est');
    BaseDetail = require('BaseDetail');
    AttributesAdd = require('AttributesAdd');

    AttributesDetail = BaseDetail.extend({
      el: '#jhw-main',
      events: {
        'click #reset': 'reset'
      },
      initialize: function () {
        this._initialize({
          template: $("#attributes-detail-tpl").html(),
          model: AttributesModel
        });
      },
      render: function () {
        var ctx = this;
        this._render();
        // 产品分类
        this._getProductCategory({ select: true, extend: true })
          .then(function (list) {
            ctx._initSelect({
              render: '#s1',
              target: '#model-categoryId',
              items: list
            });
          });
        // 属性选择框
        this.attributeSelect();
        // 属性选项
        this.attributeRender();

        // 绑定提交与验证
        this._form("#J_Form")._validate()._init(function () {
          this.model.set("attributeOptionList", Est.pluck(this.optionsInstance.getItems(), 'value'))
        });
        return this;
      },
      showAttribute: function () {
        $("#multi-attribute").show();
      },
      attributeSelect: function () {
        this._initSelect({
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
        });
      },
      attributeRender: function () {
        var ctx = this;
        var attributesOptionList = this.model.get('attributeOptionList');
        var options = { el: '#multi-attribute', add: function () {
          ctx._resetIframe();
        }};
        if (attributesOptionList && attributesOptionList.length > 0) {
          options.items = attributesOptionList;
          this.showAttribute();
        }
        this.optionsInstance = new AttributesAdd(options);
      }
    });

    module.exports = AttributesDetail;

  });