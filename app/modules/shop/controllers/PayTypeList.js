/**
 * @description 支付方式列表
 * @namespace PayType
 * @author yongjin<zjut_wyj@163.com> 2014/12/29
 */
define('PayTypeList', ['BaseCollection', 'BaseItem', 'BaseList', 'PayTypeModel', 'template/pay_type_list',
    'BaseUtils', 'template/pay_type_item', 'HandlebarsHelper'],
  function (require, exports, module) {
    var PayTypeList, BaseUtils, BaseCollection, BaseItem, BaseList, PayTypeCollection, PayTypeItem, PayTypeModel,
      listTemp, itemTemp, HandlebarsHelper;

    BaseCollection = require('BaseCollection');
    BaseItem = require('BaseItem');
    BaseList = require('BaseList');
    PayTypeModel = require('PayTypeModel');
    listTemp = require('template/pay_type_list');
    itemTemp = require('template/pay_type_item');
    BaseUtils = require('BaseUtils');
    HandlebarsHelper = require('HandlebarsHelper');

    PayTypeCollection = BaseCollection.extend({
      url: CONST.API + '/paymentconfig/list',
      batchUrl: CONST.API + '/paymentconfig/batch/del',
      model: PayTypeModel,
      initialize: function () {
        this._initialize();
      }
    });

    PayTypeItem = BaseItem.extend({
      tagName: 'tr',
      className: 'bui-grid-row',
      events: {
        'click .toggle': '_toggleChecked',
        'click .btn-edit': 'edit',
        'click .btn-del': '_del',
        'click .name': 'editName',
        'click .move-up': '_moveUp', // 上移
        'click .move-down': '_moveDown', // 下移
        'change .input-sort': '_saveSort' // 保存sort 注： 当字段不为sort时， 此方法不适用， 参照AttributesList中的changeSort方法
      },
      initialize: function () {
        this._initialize({
          template: itemTemp,
          detail: CONST.HOST + '/modules/shop/pay_type_detail.html'
        });
      },
      // 支付方式修改
      edit: function () {
        this._navigate('#/shop/pay_type/' + this.model.get('id'), true)
      },
      // 修改名称
      editName: function () {
        this._editField({
          target: '.pro-list-name',
          title: '修改名称',
          field: 'name'
        });
      },
      render: function () {
        this._render();
      }
    });

    PayTypeList = BaseList.extend({
      events: {
        'click #toggle-all': '_toggleAllChecked',
        'click .btn-batch-del': '_batchDel',
        'click .product-add': 'add',
        'click .btn-search': 'search',
        'click .search-advance-product': 'searchAdvance'
      },
      initialize: function () {
        this._initialize({
          model: PayTypeModel,
          item: PayTypeItem,
          render: '#pay-type-list-ul',
          collection: PayTypeCollection,
          enterRender: '.btn-search',
          template: listTemp,
          pagination: true,
          detail: CONST.HOST + '/modules/shop/pay_type_detail.html'
        });
      },
      // 支付方式添加
      add: function () {
        this._navigate('#/shop/pay_type_add', true);
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

        app.emptyDialog();
        BaseUtils.dialog({
          title: '高级搜索',
          width: 600,
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
      render: function () {
        this._render();
      }
    });

    module.exports = PayTypeList;
  });