/**
 * @description 产品分类列表视图
 * @namespace ProductCategoryList
 * @author yongjin on 2014/10/31
 */
define('ProductCategoryList', ['jquery', 'CategoryModel', 'BaseComposite', 'BaseItem', 'BaseList', 'HandlebarsHelper', 'template/category_product_list', 'template/category_product_item'],
  function (require, exports, module) {
    var ProductCategoryList, ProductCategoryCollection, ProductCategoryItem, CategoryModel, BaseComposite, BaseItem, BaseList, HandlebarsHelper, listTemp, itemTemp;

    CategoryModel = require('CategoryModel');
    BaseComposite = require('BaseComposite');
    BaseItem = require('BaseItem');
    BaseList = require('BaseList');
    HandlebarsHelper = require('HandlebarsHelper');
    listTemp = require('template/category_product_list');
    itemTemp = require('template/category_product_item');

    ProductCategoryCollection = BaseComposite.extend({
      url: CONST.API + '/category/product',
      model: CategoryModel,
      initialize: function () {
        this._initialize();
      }
    });

    ProductCategoryItem = BaseItem.extend({
      tagName: 'li',
      className: 'cate-grid-row',
      events: {
        'click .delete': '_del',
        'click .name': 'editName',
        'click .edit': 'editItem',
        'click .extend': 'extend'
      },
      initialize: function () {
        this._initialize({
          template: itemTemp
        });
        this.extend = false;
        this.$sub = this.$('.cate-' + this.model.get('grade') + '-ul');
      },
      render: function () {
        this._render();
      },
      extend: function () {
        this.extend = !this.extend;
        this.$sub.show();
      },
      editItem: function () {
        var options = {
          title: '产品分类修改',
          url: CONST.HOST + '/modules/category/product_category_detail.html?id=' + this.model.id
        }
        this._edit(options);
      },
      editName: function () {
        var options = { title: '修改分类名称', field: 'name', target: '.name' };
        this._editField(options, this);
      }
    });

    ProductCategoryList = BaseList.extend({
      el: '#jhw-main',
      events: {
        'click #toggle-all': '_toggleAllChecked',
        'click .product-category-add': 'openAddDialog'
      },
      initialize: function () {
        this._initialize({
          template: listTemp,
          render: '.category-ul',
          item: ProductCategoryItem,
          model: CategoryModel,
          collection: ProductCategoryCollection,

          subRender: '.node-tree',
          parentId: 'belongId',
          categoryId: 'categoryId',
          grade: '01',
          parentValue: '/'
        }).then(function (thisCtx) {
          thisCtx._load(thisCtx._options).then(function (collection) {
            thisCtx._filterRoot();
          });
        });
      },
      render: function () {
        this._render();
        //return this.el;
      },
      openAddDialog: function () {
        this._detail({
          title: '分类添加',
          url: CONST.HOST + '/modules/category/product_category_detail.html?time=' + new Date().getTime()
        });
      }
    });

    module.exports = ProductCategoryList;
  });