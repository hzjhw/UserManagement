/**
 * @description 属性添加或修改视图
 * @namespace AttributesDetail
 * @author yongjin on 2014/11/13
 */
define('AttributesDetail', ['jquery', 'AttributesModel', 'HandlebarsHelper', 'BaseDetail', 'AttributesAdd', 'BaseUtils'],
  function (require, exports, module) {
    var AttributesDetail, AttributesModel, HandlebarsHelper, BaseDetail, AttributesAdd, BaseUtils;

    AttributesModel = require('AttributesModel');
    HandlebarsHelper = require('HandlebarsHelper');
    BaseDetail = require('BaseDetail');
    AttributesAdd = require('AttributesAdd');
    BaseUtils = require('BaseUtils');

    AttributesDetail = BaseDetail.extend({
      el: '#jhw-detail',
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
        this.categoryId = Est.getUrlParam('categoryId', window.location.href);
        this.model.set('categoryId',this.categoryId);
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
        BaseUtils.initSelect({
          render: '#s2',
          target: '#model-attributeType',
          items: app.getStatus('attributeType')
        }).then(function (select) {
          if (select === 'select' || select === 'checkbox') {
            $("#multi-attribute").show();
          } else {
            $("#multi-attribute").hide();
          }
          BaseUtils.resetIframe();
        });
      },
      attributeRender: function () {
        var attributesOptionList = this.model.get('attributeOptionList');
        var options = { el: '#multi-attribute',
          add: function () {
          BaseUtils.resetIframe();
        }};
        if (attributesOptionList && attributesOptionList.length > 0) {
          options.items = attributesOptionList;
          this.showAttribute();
        }
        app.addView('attributesAdd', new AttributesAdd(options));
      }
    });

    module.exports = AttributesDetail;

  });