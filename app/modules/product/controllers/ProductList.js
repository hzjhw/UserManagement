/**
 * @description ProductList
 * @namespace ProductList
 * @author yongjin on 2014/11/16
 */
define('ProductList', ['jquery', 'ProductModel', 'BaseCollection', 'BaseItem', 'BaseList', 'HandlebarsHelper',
    'template/product_list', 'template/product_item'],
  function (require, exports, module) {
    var ProductModel, BaseCollection, BaseItem, BaseList, HandlebarsHelper, ProductList, ProductItem, ProductCollection, listTemp, itemTemp;

    ProductModel = require('ProductModel');
    BaseCollection = require('BaseCollection');
    BaseItem = require('BaseItem');
    BaseList = require('BaseList');
    HandlebarsHelper = require('HandlebarsHelper');
    listTemp = require('template/product_list');
    itemTemp = require('template/product_item');

    ProductCollection = BaseCollection.extend({
      url: global.API + '/product/list',
      model: ProductModel,
      initialize: function () {
        this._initialize();
      }
    });

    ProductItem = BaseItem.extend({
      tagName: 'tr',
      className: 'bui-grid-row',
      events: {
        'click .name': 'editName',
        'click .edit': 'editItem',
        'click .delete': '_del'
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
        var url = global.HOST + '/modules/product/product_detail.html?id=' +
          this.model.id;
        this._edit({
          title: '产品修改',
          url: url
        });
      },
      editName: function () {
        this._editField({
          title: '修改名称',
          field: 'name',
          target: '.name'
        }, this);
      }
    });

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
        this._initialize(options).then(function (context) {
          context._initPagination(options);
          context._load(options);
        });
      },
      openAddDialog: function () {
        this._detail({
          title: '产品添加',
          url: global.HOST + '/modules/product/product_detail.html?time=' + new Date().getTime()
        });
      }
    });
    module.exports = ProductList;
  });