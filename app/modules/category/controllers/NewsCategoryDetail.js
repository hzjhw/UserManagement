/**
 * @description 新闻分类添加或修改视图
 * @namespace NewsCategoryDetail
 * @author jihui-wxw on 2014/12/10
 */
define('NewsCategoryDetail', ['jquery', 'CategoryModel', 'BaseDetail', 'BaseService', 'BaseUtils'],
  function (require, exports, module) {
    var NewsCategoryDetail, CategoryModel, BaseDetail, BaseUtils, BaseService;

    CategoryModel = require('CategoryModel');
    BaseDetail = require('BaseDetail');
    BaseService = require('BaseService');
    BaseUtils = require('BaseUtils');

    NewsCategoryDetail = BaseDetail.extend({
      el: '#jhw-detail',
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
        // 新闻分类
        BaseService.getNewsCategory({ select: true, extend: true })
          .then(function (list) {
            BaseUtils.initSelect({
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