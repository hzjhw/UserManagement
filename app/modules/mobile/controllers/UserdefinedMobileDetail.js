/**
 * @description 属性添加或修改视图
 * @namespace UserdefinedMobileDetail
 * @author yongjin on 2014/11/13
 */
define('UserdefinedMobileDetail', ['jquery', 'UserdefinedMobileModel', 'UserdefinedMobileModel', 'BaseDetail', 'BaseUtils'],
  function (require, exports, module) {
    var UserdefinedMobileDetail, UserdefinedMobileModel, UserdefinedMobileModel, BaseDetail, BaseUtils;

    UserdefinedMobileModel = require('UserdefinedMobileModel');
    BaseDetail = require('BaseDetail');
    BaseUtils = require('BaseUtils');
    UserdefinedMobileModel = require('UserdefinedMobileModel');

    UserdefinedMobileDetail = BaseDetail.extend({
      events: {
        'click #reset': 'reset'
      },
      initialize: function () {
        var opts = {
          template: $("#userdefined-detail-tpl").html(),
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
        BaseUtils.initEditor({
          render: '.ckeditor'
        });
        return this;
      }
    });

    module.exports = UserdefinedMobileDetail;

  });