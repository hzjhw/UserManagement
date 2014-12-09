/**
 * @description 产品分类添加或修改视图
 * @namespace ProductCategoryDetail
 * @author yongjin on 2014/10/31
 */
define('ProductCategoryDetail', ['jquery', 'CategoryModel', 'BaseDetail'],
  function (require, exports, module) {
    var ProductCategoryDetail, CategoryModel, BaseDetail;

    CategoryModel = require('CategoryModel');
    BaseDetail = require('BaseDetail');

    ProductCategoryDetail = BaseDetail.extend({
      el: '#jhw-main',
      events: {
        'click #product-category-reset': 'reset'
      },
      initialize: function () {
        debug('ProductCategoryDetail.initialize');
        this._initialize({
          template: $("#product-category-detail-tpl").html(),
          model: CategoryModel
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
              target: '#model-category',
              items: list
            });
          });
        this._form('#J_Form')._validate()._init({});
        return this;
      }
    });

    module.exports = ProductCategoryDetail;

  });