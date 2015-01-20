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
        'click .edit': '_edit',
        'click .delete': '_del',
        'click .move-up': '_moveUp',
        'click .move-down': '_moveDown',
        'change .input-sort': '_saveSort',
        'click .btn-display': 'setDisplay',
        'click .name': 'editName',
        'click .prodtype': 'editProdtype',
        'change .pro-category': 'changeCategory',
        'click .btn-more': '_more',
        'click .seo': 'seo'
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
          template: itemTemp
        });
      },
      // seo修改
      seo: function () {
        BaseUtils.dialog({
          title: 'Seo优化',
          url: CONST.HOST + '/common/seo/seo_detail.html?id=' +
            this.model.get('id'),
          width: 600,
          height: 250,
          button: [
            {
              value: '保存',
              callback: function () {
                this.title('正在提交..');
                this.iframeNode.contentWindow.$("#submit").click();
                // 是否执行默认的关闭操作
                return false;
              }}
          ]
        });
      },
      // 修改分类
      changeCategory: function () {
        var ctx = this;
        var category = this.$('.pro-category').val();
        BaseUtils.comfirm({
          title: '提示：',
          content: '是否更改分类？',
          success: function () {
            ctx.model._saveField({
              id: ctx.model.get('id'),
              category: category
            }, ctx, {success: function () {
              ctx.model.set('category', category);
            }});
          }
        });
        this._render();
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
      },
      // 渲染文档
      render: function () {
        this._render();
      }
    });
    /**
     * 列表视图
     */
    ProductList = BaseList.extend({
      events: {
        'click #toggle-all': '_toggleAllChecked',
        'click .btn-batch-del': '_batchDel',
        'click .btn-add': 'add',
        'click .btn-category': 'category',
        'click .btn-search': 'search',
        'click .btn-batch-import': 'batchImport',
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
          detail: CONST.HOST + '/modules/product/product_detail.html',
          route: '#/product'
        });
      },
      // 添加产品
      add: function () {
        this._navigate('#/product_add');
      },
      // 分类管理
      category: function () {
        this._navigate('#/category/product');
      },
      // 批量导入
      batchImport: function () {
        window.open(CONST.DOMAIN + '/user/product/selectImportType');
        /*BaseUtils.dialog({
         title: '产品批量导入',
         width: 800,
         height: 500,
         url: CONST.DOMAIN + '/user/product/selectImportType'
         });*/
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
          success: function () {
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
        this.checkboxIds = this._getCheckboxIds();
        if (this.checkboxIds.length === 0) {
          BaseUtils.tip('请至少选择一项！');
          return;
        }
        BaseUtils.dialog({
          id: 'transfer-dialog',
          title: '批量转移分类',
          width: 300,
          content: ctx.transferTemp({
            productCategoryList: app.getData('productCategory')
          }),
          target: this.$('.btn-batch-category').get(0),
          success: function () {
            ctx.transferCategory = $('select[name=transferCategory]').val();
            BaseService.batch({
              url: CONST.API + '/product/batch/transfer',
              ids: ctx.checkboxIds.join(','),
              category: ctx.transferCategory,
              success: function () {
                BaseUtils.tip('批量转移成功');
                ctx._load();
              }
            });
            this.remove();
          }
        });
      },
      // 批量隐藏
      batchDisplay: function () {
        this._batch({
          url: CONST.API + '/product/batch/display',
          tip: '批量隐藏成功'
        });
      },
      // 产品排序
      proSort: function () {
        var ctx = this;
        this.sortTemp = HandlebarsHelper.compile(sortTemp);
        BaseUtils.dialog({
          id: 'sort-dialog',
          title: '产品排序',
          width: 300,
          content: ctx.sortTemp({}),
          target: this.$('.btn-tool-sort').get(0),
          success: function () {
            ctx.sortType = $('select[name=sortCategory]').val();
            BaseService.productSort({
              type: ctx.sortType,
              category: ctx.searchCategory,
              sortType: ctx.sortType,
              success: function () {
                ctx._load();
              }
            });
            this.remove();
          }
        });
      }
    });

    module.exports = ProductList;
  });