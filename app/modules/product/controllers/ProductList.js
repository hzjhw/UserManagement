/**
 * @description ProductList
 * @namespace ProductList
 * @author yongjin on 2014/11/16
 */
define('ProductList', ['jquery', 'ProductModel', 'BaseCollection', 'BaseItem', 'BaseList', 'Select', 'HandlebarsHelper',
    'template/product_list', 'template/product_item', 'BaseUtils', 'template/product_search'],
  function (require, exports, module) {
    var ProductModel, BaseCollection, BaseItem, BaseList, HandlebarsHelper, Select, ProductList, ProductItem, ProductCollection, listTemp, itemTemp, searchTemp, BaseUtils;

    ProductModel = require('ProductModel');
    BaseCollection = require('BaseCollection');
    BaseItem = require('BaseItem');
    BaseList = require('BaseList');
    HandlebarsHelper = require('HandlebarsHelper');
    listTemp = require('template/product_list');
    itemTemp = require('template/product_item');
    searchTemp = require('template/product_search');
    BaseUtils = require('BaseUtils');
    Select = require('Select');

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
        'click .move-down': 'moveDown',
        'change .input-sort': 'changeSort',
        'change .pro-category': 'changeCategory'
      },
      // 初始化
      initialize: function () {
        if (!app.getData('productCategory')) {
          BaseUtils.getProductCategory({
            extend: true,
            select: true
          }).then(function (list) {
            app.setData('productCategory', list);
          })
        }
        this.model.set('productCategoryList', app.getData('productCategory'));
        this._initialize({ template: itemTemp });
      },
      render: function () {
        this._render();
      },
      changeSort: function () {
        var ctx = this;
        var sort = this.$('.input-sort').val();
        this.model._saveField({ id: this.model.get('id'), sort: sort
        }, ctx, { success: function () {
          ctx.model.set('sort', sort);
        }, hideTip: true
        });
      },
      changeCategory: function () {
        var ctx = this;
        var category = this.$('.pro-category').val();
        this.model._saveField({
          id: this.model.get('id'),
          category: category
        }, ctx, {success: function () {
          ctx.model.set('category', category);
        }});
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
      moveUp: function () {
        app.getView('productList')._moveUp(this.model);
      },
      moveDown: function () {
        app.getView('productList')._moveDown(this.model);
      }
    });
    /**
     * 列表视图
     */
    ProductList = BaseList.extend({
      el: '#jhw-main',
      events: {
        'click #toggle-all': '_toggleAllChecked',
        'click .product-add': 'openAddDialog',
        'click .btn-search': 'search',
        'click .search-advance': 'searchAdvance'
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
      },
      search: function () {
        var ctx = this;
        this.searchKey = Est.trim(this.$('.search-text').val());
        if (Est.isEmpty(this.searchKey)){
          this.searchKey = null;
          this._load();
        }
        this._search({
          filter: function(){
            if (ctx.searchKey){
              Est.each(ctx.collection.models, function(item){
                if (item.attributes.name.indexOf(ctx.searchKey) === -1){
                  ctx.collection.remove(item);
                } else{
                  ctx._addOne(item);
                }
                debug(item);
              });
            }
            debug(ctx.collection);
          }
        });
        debug('search');
      },
      searchAdvance: function(){
        var ctx = this;
        this.searchTemp = HandlebarsHelper.compile(searchTemp);
        if (!app.getData('productCategory')) {
          BaseUtils.getProductCategory({
            extend: true,
            select: true
          }).then(function (list) {
            app.setData('productCategory', list);
          })
        }
        seajs.use(['dialog-plus'], function (dialog) {
          window.dialog = dialog;
          ctx.searchDialog = dialog({
            id: 'search-dialog',
            title: '高级搜索',
            width: 900,
            content: ctx.searchTemp({
              productCategoryList: app.getData('productCategory'),
              loginViewList: [
                {text: '访问者可见', value: '1'},
                {text: '登录后可见', value: '0'}
              ],
              adsList: [
                {text: '广告产品', value: '2'},
                {text: '是', value: '1'},
                {text: '否', value: '0'}
              ]
            }),
            button: [
              {
                value: '搜索',
                callback: function () {
                  this.iframeNode.contentWindow.$("#submit").click();
                  return false;
                },
                autofocus: true
              },
              { value: '关闭' }
            ],
            oniframeload: function () {
              this.iframeNode.contentWindow.searchDialog = ctx.searchDialog;
            },
            onclose: function () {
              this.remove();
              if (this.returnValue) {
                $('#value').html(this.returnValue);
              }
            }
          }).show(this.$('.search-advance').get(0));
        });
      }
    });

    module.exports = ProductList;
  });