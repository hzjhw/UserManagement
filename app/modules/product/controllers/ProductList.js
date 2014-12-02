/**
 * @description ProductList
 * @namespace ProductList
 * @author yongjin on 2014/11/16
 */
define('ProductList', ['jquery', 'ProductModel', 'BaseCollection', 'BaseItem', 'BaseList', 'HandlebarsHelper',
    'template/product_list', 'template/product_item', 'Est'],
  function (require, exports, module) {
    var ProductModel, BaseCollection, BaseItem, BaseList, HandlebarsHelper, Est, ProductList, ProductItem, ProductCollection, listTemp, itemTemp;

    ProductModel = require('ProductModel');
    BaseCollection = require('BaseCollection');
    BaseItem = require('BaseItem');
    BaseList = require('BaseList');
    HandlebarsHelper = require('HandlebarsHelper');
    listTemp = require('template/product_list');
    itemTemp = require('template/product_item');
    Est = require('Est');

    /**
     * 集合类
     */
    ProductCollection = BaseCollection.extend({
      url: global.API + '/product/list',
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
        'click .edit': 'editItem',
        'click .delete': '_del'
      },
      // 初始化
      initialize: function () {
        this._initialize({ template: itemTemp });
      },
      // 渲染
      render: function () {
        this._render();
      },
      // 编辑产品
      editItem: function () {
        var url = global.HOST + '/modules/product/product_detail.html?id='
          + this.model.id;
        var options = { title: '产品修改', url: url }
        this._edit(options);
      },
      // 编辑名称
      editName: function () {
        var options = { title: '修改名称', field: 'name', target: '.pro-list-name' };
        this._editField(options, this);
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
      // 初始化
      initialize: function () {
        var options = {
          render: '#product-list-ul',
          template: listTemp,
          model: ProductModel,
          collection: ProductCollection,
          item: ProductItem
        }
        this._initialize(options).then(function (context) {
          // 加载分页
          context._initPagination(options);
          // 加载数据
          context._load(options);
        });
      },
      // 添加产品对话框
      openAddDialog: function () {
        var url = global.HOST + '/modules/product/product_detail.html?uId='
          + Est.nextUid();
        this._detail({ title: '产品添加', url: url });
      }
    });

    module.exports = ProductList;
  });