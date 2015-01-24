/**
 * @description 产品分类添加或修改视图
 * @namespace ProductCategoryDetail
 * @author yongjin on 2014/10/31
 */
define('ProductCategoryDetail', ['jquery', 'CategoryModel', 'BaseDetail', 'BaseService', 'BaseUtils', 'template/category_product_detail'],
  function (require, exports, module) {
    var ProductCategoryDetail, CategoryModel, BaseDetail, BaseService, BaseUtils, template;

    CategoryModel = require('CategoryModel');
    BaseDetail = require('BaseDetail');
    BaseService = require('BaseService');
    BaseUtils = require('BaseUtils');
    template = require('template/category_product_detail');

    ProductCategoryDetail = BaseDetail.extend({
      el: '#jhw-detail',
      events: {
        'click #product-category-reset': 'reset'
      },
      initialize: function () {
        debug('ProductCategoryDetail.initialize');
        this._initialize({
          template: template,
          model: CategoryModel
        });
      },
      render: function () {
        this._render();
        // 产品分类
        BaseService.getProductCategory({ tree: true, select: true, extend: true })
          .then(function (list) {
            BaseUtils.initSelect({
              render: '#s1',
              target: '#model-belongId',
              items: list
            });
          });
        this._form('#J_Form')._validate()._init({});
        return this;
      }
    });

    module.exports = ProductCategoryDetail;

  });