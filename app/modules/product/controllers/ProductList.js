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
        'click .toggle': '_toggleChecked',
        'click .delete': '_del',
        'click .name': 'editName',
        'click .prodtype': 'editProdtype',
        'click .edit': 'editItem',
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
        'click .search-advance': 'searchAdvance',
        'click .btn-batch-del': 'batchDel'
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
      baseSearch: function () {
        this._search([
          { key: 'name', value: this.searchKey },
          {key: 'prodtype', value: this.searchProdtype} ,
          {key: 'category', value: this.searchCategory === '/' ? '' : this.searchCategory},
          {key: 'loginView', value: this.searchLoginView},
          {key: 'ads', value: this.searchAds === '2' ? '' : this.searchAds}
        ], {});
      },
      search: function () {
        this.searchKey = Est.trim(this.$('.search-text').val());
        if (Est.isEmpty(this.searchKey)) {
          this._load({ page: 1, pageSize: 16 });
        } else {
          this.baseSearch();
        }
      },
      searchAdvance: function () {
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
              loginViewList: app.getData('loginViewList'),
              adsList: app.getData('adsList'),
              searchKey: ctx.searchKey,
              searchProdtype: ctx.searchProdtype,
              searchCategory: ctx.searchCategory,
              searchAds: ctx.searchAds,
              searchLoginView: ctx.searchLoginView
            }),
            button: [
              {
                value: '搜索',
                callback: function () {
                  ctx.searchKey = $('input[name=searchKey]').val();
                  ctx.searchProdtype = $('input[name=searchProdtype]').val();
                  ctx.searchCategory = $('select[name=searchCategory]').val();
                  ctx.searchLoginView = $('select[name=searchLoginView]').val();
                  ctx.searchAds = $('select[name=searchAds]').val();
                  ctx.baseSearch();
                  this.remove();
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
      },
      // 批量隐藏
      batchDisplay: function () {
        var ctx = this;
        if (this.checkboxIds = this._getCheckboxIds()) {
          debug(this.checkboxIds);
          /*$.ajax({
           type: 'POST',
           async: false,
           url: CONST.API + '/product/batch/display',
           data: {
           ids: this.checkboxIds.join(',')
           },
           success: function(result){
           BaseUtils.tip('删除成功');
           ctx._load();
           }
           });*/
        }
      },
      // 批量删除
      batchDel: function () {
        var ctx = this;
        if (this.checkboxIds = this._getCheckboxIds()) {
          debug(this.checkboxIds);
          $.ajax({
            type: 'POST',
            async: false,
            url: CONST.API + '/product/batch/del',
            data: {
              ids: this.checkboxIds.join(',')
            },
            success: function (result) {
              BaseUtils.tip('删除成功');
              ctx._load();
            }
          });
        }
      }
    });

    module.exports = ProductList;
  });