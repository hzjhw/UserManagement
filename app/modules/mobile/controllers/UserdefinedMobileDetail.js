/**
 * @description 属性添加或修改视图
 * @namespace UserdefinedMobileDetail
 * @author yongjin on 2014/11/13
 */
define('UserdefinedMobileDetail', ['jquery', 'UserdefinedMobileModel', 'UserdefinedMobileModel', 'BaseDetail', 'Utils', 'template/mobile_userdefined_detail'],
  function (require, exports, module) {
    var UserdefinedMobileDetail, UserdefinedMobileModel, UserdefinedMobileModel, BaseDetail, Utils, template;

    UserdefinedMobileModel = require('UserdefinedMobileModel');
    BaseDetail = require('BaseDetail');
    Utils = require('Utils');
    UserdefinedMobileModel = require('UserdefinedMobileModel');
    template = require('template/mobile_userdefined_detail');

    UserdefinedMobileDetail = BaseDetail.extend({
      events: {
        'click #reset': 'reset'
      },
      initialize: function () {
        var opts = {
          template: template,
          model: UserdefinedMobileModel
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

    module.exports = UserdefinedMobileDetail;

  });