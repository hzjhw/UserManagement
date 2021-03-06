/**
 * @description 属性添加或修改视图
 * @namespace UserdefinedDetail
 * @author yongjin on 2014/11/13
 */
define('UserdefinedDetail', ['jquery', 'UserdefinedModel', 'UserdefinedMobileModel', 'BaseDetail', 'Utils', 'template/userdefined_detail'],
  function (require, exports, module) {
    var UserdefinedDetail, UserdefinedModel, UserdefinedMobileModel, BaseDetail, Utils, template;

    UserdefinedModel = require('UserdefinedModel');
    BaseDetail = require('BaseDetail');
    Utils = require('Utils');
    UserdefinedMobileModel = require('UserdefinedMobileModel');
    template = require('template/userdefined_detail');

    UserdefinedDetail = BaseDetail.extend({
      events: {
        'click #reset': 'reset'
      },
      initialize: function () {
        var opts = {
          template: template,
          model: UserdefinedModel
        }
        if (this.options.mobile) {
          opts.model = UserdefinedMobileModel
        }
        this._initialize(opts);
      },
      render: function () {
        this._render();
        this._form("#J_Form")._validate({})._init({
          onBeforeSave: function () {
          }
        });
        Utils.initEditor({
          render: '.ckeditor'
        });
        return this;
      }
    });

    module.exports = UserdefinedDetail;

  });