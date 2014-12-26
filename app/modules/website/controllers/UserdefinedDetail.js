/**
 * @description 属性添加或修改视图
 * @namespace UserdefinedDetail
 * @author yongjin on 2014/11/13
 */
define('UserdefinedDetail', ['jquery', 'UserdefinedModel', 'HandlebarsHelper', 'BaseDetail', 'BaseUtils'],
  function (require, exports, module) {
    var UserdefinedDetail, UserdefinedModel, HandlebarsHelper, BaseDetail, BaseUtils;

    UserdefinedModel = require('UserdefinedModel');
    HandlebarsHelper = require('HandlebarsHelper');
    BaseDetail = require('BaseDetail');
    BaseUtils = require('BaseUtils');

    UserdefinedDetail = BaseDetail.extend({
      events: {
        'click #reset': 'reset'
      },
      initialize: function () {
        this._initialize({
          template: $("#userdefined-detail-tpl").html(),
          model: UserdefinedModel
        });
      },
      render: function () {
        this._render();
        this._form("#J_Form")._validate({})._init({
          onBeforeSave: function () {
          }
        });
        BaseUtils.initEditor({
          render: '.ckeditor'
        });
        return this;
      }
    });

    module.exports = UserdefinedDetail;

  });