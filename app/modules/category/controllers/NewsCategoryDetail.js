/**
 * @description 产品分类添加或修改视图
 * @namespace NewsCategoryDetail
 * @author yongjin on 2014/10/31
 */
define('NewsCategoryDetail', ['jquery', 'CategoryModel', 'BaseDetail'],
  function (require, exports, module) {
    var NewsCategoryDetail, CategoryModel, BaseDetail;

    CategoryModel = require('CategoryModel');
    BaseDetail = require('BaseDetail');

    NewsCategoryDetail = BaseDetail.extend({
      el: '#jhw-main',
      events: {
        'click #news-category-reset': 'reset'
      },
      initialize: function () {
        debug('NewsCategoryDetail.initialize');
        this._initialize({
          template: $("#news-category-detail-tpl").html(),
          model: CategoryModel
        });
      },
      render: function () {
       var ctx = this;
        this._render();
        // 产品分类
        this._getNewsCategory({ select: true, extend: true })
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

    module.exports = NewsCategoryDetail;

  });