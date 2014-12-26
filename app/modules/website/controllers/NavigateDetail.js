/**
 * @description 产品分类添加或修改视图
 * @namespace ProductCategoryDetail
 * @author yongjin on 2014/10/31
 */
define('NavigateDetail', ['jquery', 'NavigateModel', 'BaseDetail', 'BaseService', 'BaseUtils'],
  function (require, exports, module) {
    var NavigateDetail, NavigateModel, BaseDetail, BaseService, BaseUtils;

    NavigateModel = require('NavigateModel');
    BaseDetail = require('BaseDetail');
    BaseService = require('BaseService');
    BaseUtils = require('BaseUtils');

    NavigateDetail = BaseDetail.extend({
      el: '#jhw-detail',
      events: {
        'click #product-category-reset': 'reset'
      },
      initialize: function () {
        this._initialize({
          template: $("#navigate-detail-tpl").html(),
          model: NavigateModel
        });
      },
      render: function () {
        this._render();
        // 导航
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