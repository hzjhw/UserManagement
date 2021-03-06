/**
 * @description ProductList
 * @namespace ProductList
 * @author yongjin on 2014/11/16
 */
define('ProductList', ['jquery', 'ProductModel', 'BaseCollection', 'BaseItem', 'BaseList', 'HandlebarsHelper',
    'template/product_list', 'template/product_item', 'Utils', 'template/product_search', 'template/product_transfer',
    'template/product_sort', 'Service'],
  function (require, exports, module) {
    var ProductModel, BaseCollection, Service, BaseItem, BaseList, HandlebarsHelper, ProductList, ProductItem,
      ProductCollection, listTemp, itemTemp, searchTemp, Utils, transferTemp, sortTemp;

    ProductModel = require('ProductModel');
    BaseCollection = require('BaseCollection');
    BaseItem = require('BaseItem');
    BaseList = require('BaseList');
    HandlebarsHelper = require('HandlebarsHelper');
    listTemp = require('template/product_list');
    itemTemp = require('template/product_item');
    searchTemp = require('template/product_search');
    Utils = require('Utils');
    transferTemp = require('template/product_transfer');
    sortTemp = require('template/product_sort');
    Service = require('Service');

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
        'mouseover .product-img': 'showImage',
        'mouseout .product-img': 'hideImage',
        'click .btn-more': '_more',
        'click .seo': 'seo',
        'click .btn-tag': 'tag'
      },
      // 初始化
      initialize: function () {
        if (!app.getData('productCategory')) {
          Service.getProductCategory({ tree: true, extend: true, select: true
          }).then(function (list) {
            app.addData('productCategory', list);
          })
        }
        this.model.set('productCategoryList', app.getData('productCategory'));
        this._initialize({
          template: itemTemp
        });
      },
      // 查看图片
      showImage: function (e) {
        e.stopImmediatePropagation();
        this.editImage = e.target ? $(e.target) : $(e.currentTarget);
        if (!Est.isEmpty(this.model.get('picPath'))) {
          this.imageTemp = HandlebarsHelper.compile("<img src='{{CONST 'PIC_URL'}}/{{picUrl picPath 5}}'></img>");
          Utils.tooltip(this.imageTemp(this.model.attributes), {
            id: 'imageView',
            align: 'left',
            time: 100000,
            target: this.editImage.get(0)
          });
        }
        return false;
      },
      // 隐藏图片
      hideImage: function () {
        window.tooltipDialog &&
        window.tooltipDialog.close().remove();
      },
      // 标签
      tag: function () {
        this._dialog({
          moduleId: 'Tag',
          title: '标签修改',
          itemId: this.model.get('id'),
          _isAdd: false,
          height: 250,
          hideSaveBtn: true
        });
      },
      // seo修改
      seo: function () {
        this._dialog({
          moduleId: 'SeoDetail',
          title: 'Seo修改',
          id: this.model.get('id'),
          height: 250
        });
      },
      // 修改分类
      changeCategory: function () {
        var ctx = this;
        var category = this.$('.pro-category').val();
        Utils.comfirm({
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
          pagination: true
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
        /*Utils.dialog({
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
          Service.getProductCategory({
            tree: true,
            extend: true,
            select: true
          }).then(function (list) {
            app.addData('productCategory', list);
          })
        }
        app.emptyDialog();
        Utils.dialog({
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
          Utils.tip('请至少选择一项！');
          return;
        }
        Utils.dialog({
          id: 'transfer-dialog',
          title: '批量转移分类',
          width: 300,
          content: ctx.transferTemp({
            productCategoryList: app.getData('productCategory')
          }),
          target: this.$('.btn-batch-category').get(0),
          success: function () {
            ctx.transferCategory = $('select[name=transferCategory]').val();
            Service.batch({
              url: CONST.API + '/product/batch/transfer',
              ids: ctx.checkboxIds.join(','),
              category: ctx.transferCategory,
              success: function () {
                Utils.tip('批量转移成功');
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
        Utils.dialog({
          id: 'sort-dialog',
          title: '产品排序',
          width: 300,
          content: ctx.sortTemp({}),
          target: this.$('.btn-tool-sort').get(0),
          success: function () {
            ctx.sortType = $('select[name=sortCategory]').val();
            Service.productSort({
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