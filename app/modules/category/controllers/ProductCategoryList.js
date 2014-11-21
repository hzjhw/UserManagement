/**
 * @description 产品分类列表视图
 * @namespace ProductCategoryList
 * @author yongjin on 2014/10/31
 */
define('ProductCategoryList', ['jquery', 'CategoryModel', 'BaseCollection', 'BaseItem', 'BaseList', 'HandlebarsHelper', 'Est', 'template/category_product_list', 'template/category_product_item'],
  function (require, exports, module) {
    var ProductCategoryList, ProductCategoryCollection, ProductCategoryItem, CategoryModel, BaseCollection, BaseItem, BaseList, HandlebarsHelper, Est, listTemp, itemTemp;

    CategoryModel = require('CategoryModel');
    BaseCollection = require('BaseCollection');
    BaseItem = require('BaseItem');
    BaseList = require('BaseList');
    Est = require('Est');
    HandlebarsHelper = require('HandlebarsHelper');
    listTemp = require('template/category_product_list');
    itemTemp = require('template/category_product_item');

    ProductCategoryCollection = BaseCollection.extend({
      url: global.API + '/category/product?pageSize=1000',
      model: CategoryModel,
      initialize: function(){
        this._initialize();
      }
    });

    ProductCategoryItem = BaseItem.extend({
      tagName: 'tr',
      className: 'bui-grid-row',
      events: {
        'click .name': 'editName',
        'click .delete': '_del',
        'click .edit': 'editItem'
      },

      initialize: function () {
        this._initialize({
          template: itemTemp
        });
      },

      render: function () {
        this._render();
      },

      editItem: function () {
        this._edit({
          title: '产品分类修改',
          url: global.HOST + '/modules/category/product_category_detail.html?id=' + this.model.id
        });
      },

      editName: function () {
        this._editField({
          title: '修改分类名称',
          field: 'name',
          target: '.name'
        }, this);
      }
    });

    ProductCategoryList = BaseList.extend({
      el: '#jhw-main',
      events: {
        'click #toggle-all': 'toggleAllChecked',
        'click .product-category-add': 'openAddDialog'
      },

      initialize: function () {
        var ctx = this;
        var thisOptions = {
          template: listTemp,
          render: '#list-product-category',
          item: ProductCategoryItem,
          model: CategoryModel,
          collection: ProductCategoryCollection
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
          url: global.HOST + '/modules/category/product_category_detail.html?time=' + new Date().getTime()
        });
      }
    });

    module.exports = ProductCategoryList;
  });