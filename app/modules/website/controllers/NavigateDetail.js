/**
 * @description 产品分类添加或修改视图
 * @namespace ProductCategoryDetail
 * @author yongjin on 2014/10/31
 */
define('NavigateDetail', ['jquery', 'NavigateModel', 'BaseDetail', 'BaseService', 'BaseUtils', 'template/navigate_detail'],
  function (require, exports, module) {
    var NavigateDetail, NavigateModel, BaseDetail, BaseService, BaseUtils, template;

    NavigateModel = require('NavigateModel');
    BaseDetail = require('BaseDetail');
    BaseService = require('BaseService');
    BaseUtils = require('BaseUtils');
    template = require('template/navigate_detail')

    NavigateDetail = BaseDetail.extend({
      el: '#jhw-detail',
      events: {
        'click #product-category-reset': 'reset',
        'click .btn-back': 'back'
      },
      initialize: function () {
        this._initialize({
          template: template,
          model: NavigateModel
        });
      },
      back: function () {
        this._navigate('#/static', true);
      },
      render: function () {
        this._render();
        BaseService.getNavigateCategory({ tree: true, select: true, extend: true })
          .then(function (list) {
            BaseUtils.initSelect({
              render: '#s1',
              target: '#model-parentId',
              items: list
            });
          });
        this._form('#J_Form')._validate()._init({});
        return this;
      }
    });

    module.exports = NavigateDetail;

  });