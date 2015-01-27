/**
 * @description 新闻分类添加或修改视图
 * @namespace NewsCategoryDetail
 * @author jihui-wxw on 2014/12/10
 */
define('NewsCategoryDetail', ['jquery', 'CategoryModel', 'BaseDetail', 'Service', 'Utils', 'template/category_news_detail'],
  function (require, exports, module) {
    var NewsCategoryDetail, CategoryModel, BaseDetail, Utils, Service, template;

    CategoryModel = require('CategoryModel');
    BaseDetail = require('BaseDetail');
    Service = require('Service');
    Utils = require('Utils');
    template = require('template/category_news_detail');

    NewsCategoryDetail = BaseDetail.extend({
      el: '#jhw-detail',
      events: {
        'click #news-category-reset': 'reset'
      },
      initialize: function () {
        debug('NewsCategoryDetail.initialize');
        this._initialize({
          template: template,
          model: CategoryModel
        });
      },
      render: function () {
        this._render();
        Service.getNewsCategory({ tree: true, select: true, extend: true })
          .then(function (list) {
            Utils.initSelect({
              render: '#s1',
              target: '#model-belongId',
              items: list
            });
          });
        this._form('#J_Form')._validate()._init({});
        return this;
      }
    });

    module.exports = NewsCategoryDetail;

  });