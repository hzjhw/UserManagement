/**
 * @description ProductList
 * @namespace ProductList
 * @author yongjin on 2014/11/16
 */
define('ProductList', ['jquery', 'ProductModel', 'BaseCollection', 'BaseItem', 'BaseList', 'HandlebarsHelper',
    'template/product_list', 'template/product_item', 'BaseUtils', 'template/product_search', 'template/product_transfer',
    'template/product_sort', 'BaseService'],
  function (require, exports, module) {
    var ProductModel, BaseCollection, BaseService, BaseItem, BaseList, HandlebarsHelper, ProductList, ProductItem,
      ProductCollection, listTemp, itemTemp, searchTemp, BaseUtils, transferTemp, sortTemp;

    ProductModel = require('ProductModel');
    BaseCollection = require('BaseCollection');
    BaseItem = require('BaseItem');
    BaseList = require('BaseList');
    HandlebarsHelper = require('HandlebarsHelper');
    listTemp = require('template/product_list');
    itemTemp = require('template/product_item');
    searchTemp = require('template/product_search');
    BaseUtils = require('BaseUtils');
    transferTemp = require('template/product_transfer');
    sortTemp = require('template/product_sort');
    BaseService = require('BaseService');

    /**
     * 集合类
     */
    ProductCollection = BaseCollection.extend({
      url: CONST.API + '/product/list',
      batchDel: CONST.API + '/product/batch/del',
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
        'click .edit': 'edit',
        'click .delete': '_del',
        'click .move-up': '_moveUp',
        'click .move-down': '_moveDown',
        'change .input-sort': '_saveSort',
        'click .btn-display': 'setDisplay',
        'click .name': 'editName',
        'click .prodtype': 'editProdtype',
        'change .pro-category': 'changeCategory'
      },
      // 初始化
      initialize: function () {
        if (!app.getData('productCategory')) {
          BaseService.getProductCategory({ tree: true, extend: true, select: true
          }).then(function (list) {
            app.addData('productCategory', list);
          })
        }
        this.model.set('productCategoryList', app.getData('productCategory'));
        this._initialize({
          template: itemTemp,
          viewId: 'productList',
          detail: CONST.HOST + '/modules/product/product_detail.html'
        });
      },
      // 渲染文档
      render: function () {
        this._render();
      },
      edit: function(){
        var ctx = this;
        seajs.use(['ProductDetail'], function(ProductDetail){
          app.addPanel('main', {
            el: '#jhw-main',
            template: '<div class="jhw-main-inner"></div>'
          }).addView('productDetail', new ProductDetail({
            el: '.jhw-main-inner',
            id: ctx.model.get('id'),
            page: ctx._getPage()
          }));;
        });
      },
      // 修改分类
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
      // 修改名称
      editName: function () {
        this._editField({
          target: '.pro-list-name',
          title: '修改名称',
          field: 'name'
        });
      },
      // 显示/隐藏
      setDisplay: function () {
        this.model.set('isdisplay', this.model.get('isdisplay') === '1' ? '0' : '1');
        this.model._saveField({
          id: this.model.get('id'),
          isdisplay: this.model.get('isdisplay')
        }, this, { // ctx须初始化initModel
          success: function () {
          },
          async: false,
          hideTip: true
        });
      },
      // 修改型号
      editProdtype: function () {
        this._editField({
          target: '.pro-list-prodtype',
          title: '修改型号',
          field: 'prodtype'
        });
      }
    });
    /**
     * 列表视图
     */
    ProductList = BaseList.extend({
      events: {
        'click #toggle-all': '_toggleAllChecked',
        'click .btn-batch-del': '_batchDel',
        'click .product-add': 'edit',
        'click .btn-search': 'search',
        'click .search-advance-product': 'searchAdvance',
        'click .btn-batch-display': 'batchDisplay',
        'click .btn-batch-category': 'batchCategory',
        'click .btn-tool-sort': 'proSort'
      },
      initialize: function () {
        this._initialize({
          viewId: 'productList',
          render: '#product-list-ul',
          enterRender: '.btn-search',
          template: listTemp,
          model: ProductModel,
          collection: ProductCollection,
          item: ProductItem,
          pagination: true,
          detail: CONST.HOST + '/modules/product/product_detail.html'
        });
      },
      // 添加产品
      edit: function(){
        seajs.use(['ProductDetail'], function(ProductDetail){
          app.addPanel('main', {
            el: '#jhw-main',
            template: '<div class="jhw-main-inner"></div>'
          }).addView('productDetail', new ProductDetail({
            el: '.jhw-main-inner'
          }));
        });
      },
      // 简单搜索
      search: function () {
        this.searchKey = Est.trim(this.$('.search-text').val());
        if (Est.isEmpty(this.searchKey)) {
          this._load({ page: 1, pageSize: 16 });
        } else {
          this._search({
            filter: [
              {key: 'name', value: this.searchKey }
            ]
          });
        }
      },
      // 高级搜索
      searchAdvance: function () {
        var ctx = this;
        this.searchTemp = HandlebarsHelper.compile(searchTemp);
        if (!app.getData('productCategory')) {
          BaseService.getProductCategory({
            tree: true,
            extend: true,
            select: true
          }).then(function (list) {
            app.addData('productCategory', list);
          })
        }
        app.emptyDialog();
        BaseUtils.dialog({
          title: '高级搜索',
          width: 700,
          target: this.$('.search-advance-product').get(0),
          content: ctx.searchTemp({
            productCategoryList: app.getData('productCategory'),
            loginViewList: app.getStatus('loginViewList'),
            adsList: app.getStatus('adsList'),
            searchKey: ctx.searchKey,
            searchProdtype: ctx.searchProdtype,
            searchCategory: ctx.searchCategory,
            searchAds: ctx.searchAds,
            searchLoginView: ctx.searchLoginView
          }),
          success: function(){
            ctx.searchKey = $('input[name=searchKey]').val();
            ctx.searchProdtype = $('input[name=searchProdtype]').val();
            ctx.searchCategory = $('select[name=searchCategory]').val();
            ctx.searchLoginView = $('select[name=searchLoginView]').val();
            ctx.searchAds = $('select[name=searchAds]').val();
            ctx._search({
              filter: [
                {key: 'name', value: ctx.searchKey },
                {key: 'prodtype', value: ctx.searchProdtype} ,
                {key: 'category', value: ctx.searchCategory === '/' ? '' : ctx.searchCategory},
                {key: 'loginView', value: ctx.searchLoginView},
                {key: 'ads', value: ctx.searchAds}
              ]
            });
            this.close().remove();
          }
        });
      },
      // 批量转移分类
      batchCategory: function (category) {
        var ctx = this;
        this.transferTemp = HandlebarsHelper.compile(transferTemp);
        if (this.checkboxIds = this._getCheckboxIds()) {
          BaseUtils.dialog({
            id: 'transfer-dialog',
            title: '批量转移分类',
            width: 300,
            content: ctx.transferTemp({
              productCategoryList: app.getData('productCategory')
            }),
            target: this.$('.btn-batch-category').get(0),
            success: function(){
              ctx.transferCategory = $('select[name=transferCategory]').val();
              $.ajax({
                type: 'POST',
                async: false,
                url: CONST.API + '/product/batch/transfer',
                data: {
                  ids: ctx.checkboxIds.join(','),
                  category: ctx.transferCategory
                },
                success: function (result) {
                  BaseUtils.tip('批量转移成功');
                  ctx._load();
                }
              });
              this.remove();
            }
          });
        }
      },
      // 批量隐藏
      batchDisplay: function () {
        this._batch({
          url: CONST.API + '/product/batch/display',
          tip: '批量隐藏成功'
        });
      },
      // 排序
      proSort: function () {
        var ctx = this;
        this.sortTemp = HandlebarsHelper.compile(sortTemp);
        seajs.use(['dialog-plus'], function (dialog) {
          window.dialog = dialog;
          ctx.sortDialog = dialog({
            id: 'sort-dialog',
            title: '产品排序',
            width: 300,
            content: ctx.sortTemp({}),
            button: [
              {
                value: '确定',
                callback: function () {
                  ctx.sortType = $('select[name=sortCategory]').val();
                  $.ajax({
                    type: 'POST',
                    async: false,
                    url: CONST.DOMAIN + '/user_v2/product',
                    data: {
                      sortType: ctx.sortType
                    },
                    success: function (result) {
                      BaseUtils.tip('产品排序成功');
                      ctx._load();
                    }
                  });
                  this.remove();
                  return false;
                },
                autofocus: true
              },
              { value: '关闭' }
            ]
          }).show(this.$('.btn-tool-sort').get(0));
        })
      }
    });

    module.exports = ProductList;
  });