/**
 * @description 产品分类列表视图
 * @namespace NewsCategoryList
 * @author jihui-wxw on 2014/10/31
 */
define('NewsCategoryList', ['jquery', 'CategoryModel', 'BaseCollection', 'BaseItem', 'BaseList', 'HandlebarsHelper', 'template/category_news_list', 'template/category_news_item'],
  function (require, exports, module) {
    var NewsCategoryList, NewsCategoryCollection, NewsCategoryItem, CategoryModel, BaseCollection, BaseItem, BaseList, HandlebarsHelper, listTemp, itemTemp;

    CategoryModel = require('CategoryModel');
    BaseCollection = require('BaseCollection');
    BaseItem = require('BaseItem');
    BaseList = require('BaseList');
    HandlebarsHelper = require('HandlebarsHelper');
    listTemp = require('template/category_news_list');
    itemTemp = require('template/category_news_item');

    NewsCategoryCollection = BaseCollection.extend({
      url: CONST.API + '/category/news?pageSize=1000',
      model: CategoryModel,
      initialize: function(){
        this._initialize();
      }
    });

    NewsCategoryItem = BaseItem.extend({
      tagName: 'li',
      className: 'cate-grid-row',
      events: {
        'click .name': 'editName',
        'click .delete': '_del',
        'click .edit': 'editItem',
        'click .extend': 'extend'
      },
      initialize: function () {
        this._initialize({
          template: itemTemp
        });
        this.extend = false;
        this.$sub = this.$('.cate-'+this.model.get('grade')+'-ul');
      },
      render: function () {
        this._render();
      },
      extend: function(){
        this.extend = !this.extend;
        this.$sub.show();
      },
      editItem: function () {
        var options = {
          title: '产品分类修改',
          url: CONST.HOST + '/modules/category/news_category_detail.html?id=' + this.model.id
        }
        this._edit(options);
      },
      editName: function () {
        var options = { title: '修改分类名称', field: 'name', target: '.name' };
        this._editField(options, this);
      }
    });

    NewsCategoryList = BaseList.extend({
      el: '#jhw-main',
      events: {
        'click #toggle-all': 'toggleAllChecked',
        'click .news-category-add': 'openAddDialog'
      },
      initialize: function () {
        var ctx = this;
        var thisOptions = {
          template: listTemp,
          render: '.category-ul',
          item: NewsCategoryItem,
          model: CategoryModel,
          collection: NewsCategoryCollection
        };
        this._initialize(thisOptions).then(function(context){
          context._initPagination(thisOptions);
          context._load(thisOptions).then(function (collection) {
            Est.sortBy(collection.models, function (item) {
              return item.attributes.sort;
            });
            Est.bulidTreeNode(collection.models, 'grade', '00', {
              categoryId: 'categoryId',// 分类ＩＤ
              belongId: 'belongId',// 父类ＩＤ
              childTag: 'cates', // 子分类集的字段名称
              sortBy: 'sort', // 按某个字段排序
              callback: function (item) {
              }  // 回调函数
            });
            ctx.render();
          });
        });
        return this;
      },
      render: function () {
        this._addAll();
      },
      openAddDialog: function () {
        this._detail({
          title: '分类添加',
          url: CONST.HOST + '/modules/category/news_category_detail.html?time=' + new Date().getTime()
        });
      }
    });

    module.exports = NewsCategoryList;
  });