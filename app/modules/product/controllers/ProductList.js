/**
 * @description ProductList
 * @namespace ProductList
 * @author yongjin on 2014/11/16
 */
define('ProductList', ['jquery', 'ProductModel', 'BaseCollection', 'BaseItem', 'BaseList', 'HandlebarsHelper',
    'template/product_list', 'template/product_item', 'Est', 'BaseUtils'],
  function (require, exports, module) {
    var ProductModel, BaseCollection, BaseItem, BaseList, HandlebarsHelper, Est, ProductList, ProductItem, ProductCollection, listTemp, itemTemp, BaseUtils;

    ProductModel = require('ProductModel');
    BaseCollection = require('BaseCollection');
    BaseItem = require('BaseItem');
    BaseList = require('BaseList');
    HandlebarsHelper = require('HandlebarsHelper');
    listTemp = require('template/product_list');
    itemTemp = require('template/product_item');
    Est = require('Est');
    BaseUtils = require('BaseUtils');

    /**
     * 集合类
     */
    ProductCollection = BaseCollection.extend({
      url: CONST.API + '/product/list',
      model: ProductModel,
      initialize: function () {
        this._initialize();
      }
    });
    /**
     * 单视图
     */
    ProductItem = BaseItem.extend({
      tagName: 'tr',
      className: 'bui-grid-row',
      events: {
        'click .name': 'editName',
        'click .prodtype': 'editProdtype',
        'click .edit': 'editItem',
        'click .delete': '_del',
        'click .move-up': 'moveUp',
        'click .move-down': 'moveDown'
      },
      // 初始化
      initialize: function () {
        var ctx = this;
        this._initialize({ template: itemTemp });
        this._onAfterRender = function () {
          if (!APP.productCategory) {
            debug('categoryLoad');
            BaseUtils.getProductCategory({
              extend: true,
              select: true
            }).then(function (list) {
              APP.productCategory = list;
              ctx.initSelect(list);
            })
          } else {
            ctx.initSelect(APP.productCategory);
          }
        }
      },
      render: function () {
        this._render();
      },
      moveUp: function(){
        APP.productList._moveUp(this.model.get('dx'));
      },
      moveDown: function(){
        APP.productList._moveDown(this.model.get('dx'));
      },
      editItem: function () {
        var url = CONST.HOST + '/modules/product/product_detail.html?id='
          + this.model.id;
        var options = {
          title: '产品修改',
          url: url
        }
        this._edit(options);
      },
      editName: function () {
        var options = {
          title: '修改名称',
          field: 'name',
          target: '.pro-list-name'
        };
        this._editField(options, this);
      },
      editProdtype: function () {
        var options = {
          title: '修改型号',
          field: 'prodtype',
          target: '.pro-list-prodtype'
        };
        this._editField(options, this);
      },
      initSelect: function (list) {
        var ctx = this;
        BaseUtils.initSelect({
          render: '#pro-cate-' + this.model.get('dx'),
          target: '#model-category-' + this.model.get('dx'),
          items: list,
          change: function (categoryId) {
            ctx.model._saveField({
              id: ctx.model.get('id'),
              category: categoryId
            }, ctx, {});
          }
        });
      }
    });
    /**
     * 列表视图
     */
    ProductList = BaseList.extend({
      el: '#jhw-main',
      events: {
        'click #toggle-all': '_toggleAllChecked',
        'click .product-add': 'openAddDialog'
      },
      initialize: function () {
        var options = {
          render: '#product-list-ul',
          template: listTemp,
          model: ProductModel,
          collection: ProductCollection,
          item: ProductItem
        }
        this._initialize(options)
          .then(function (context) {
            context._initPagination(options);
            context._load(options);
          });
      },
      openAddDialog: function () {
        var url = CONST.HOST + '/modules/product/product_detail.html?uId='
          + Est.nextUid();
        this._detail({
          title: '产品添加',
          url: url
        });
      }
    });

    module.exports = ProductList;
  });