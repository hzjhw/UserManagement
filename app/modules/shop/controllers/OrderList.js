/**
 * @description OrderList
 * @namespace OrderList
 * @author yongjin<zjut_wyj@163.com> 2014/12/29
 */
define('OrderList', ['BaseList', 'OrderModel', 'BaseItem', 'HandlebarsHelper', 'BaseUtils', 'BaseCollection',
    'template/order_list', 'template/order_item', 'template/order_search'],
  function (require, exports, module) {
  var BaseList, BaseItem, BaseCollection, OrderList, BaseUtils, itemTemp, HandlebarsHelper, listTemp, OrderModel,
    OrderCollection, OrderItem, searchTemp;

    BaseList = require('BaseList');
    BaseItem = require('BaseItem');
    BaseCollection = require('BaseCollection');
    itemTemp = require('template/order_item');
    listTemp = require('template/order_list');
    OrderModel = require('OrderModel');
    BaseUtils = require('BaseUtils');
    HandlebarsHelper = require('HandlebarsHelper');
    searchTemp = require('template/order_search');

    OrderCollection = BaseCollection.extend({
      url: CONST.API + '/order/list',
      model: OrderModel,
      initialize: function(){
        this._initialize();
      }
    });

    OrderItem = BaseItem.extend({
      tagName: 'tr',
      className: 'bui-grid-row',
      events: {
        'click .toggle': '_toggleChecked',
        'click .edit': 'edit',
        'click .delete': '_del',
        'click .view': 'viewOrder',
        'click .handle': 'handleOrder'
      },
      initialize: function(){
        this._initialize({
          template: itemTemp,
          model: OrderModel,
          detail: CONST.HOST + '/modules/shop/order_detail.html'
        });
      },
      render: function(){
        this._render();
      },
      edit: function(){
        var ctx = this;
        seajs.use(['OrderDetail'], function(OrderDetail){
          app.addPanel('main', {
            el: '#jhw-main',
            template: '<div class="jhw-main-inner"></div>'
          }).addView('orderDetail', new OrderDetail({
            el: '.jhw-main-inner',
            id: ctx.model.get('id'),
            page: ctx._getPage()
          }));
        });
      },
      viewOrder: function(){
        var ctx = this;
        seajs.use(['OrderView'], function(OrderView){
          app.addPanel('main', {
            el: '#jhw-main',
            template: '<div class="jhw-main-inner"></div>'
          }).addView('orderView', new OrderView({
            el: '.jhw-main-inner',
            id: ctx.model.get('id'),
            page: ctx._getPage()
          }));;
        });
      },
      handleOrder: function(){
        var ctx = this;
        seajs.use(['OrderHandle'], function(OrderHandle){
          app.addPanel('main', {
            el: '#jhw-main',
            template: '<div class="jhw-main-inner"></div>'
          }).addView('orderHandle', new OrderHandle({
            el: '.jhw-main-inner',
            id: ctx.model.get('id'),
            page: ctx._getPage()
          }));;
        });
      }
    });

    OrderList = BaseList.extend({
      events: {
        'click .btn-search': 'search',
        'click .search-advance-product': 'searchAdvance'
      },
      initialize: function(){
        this._initialize({
          collection: OrderCollection,
          item: OrderItem,
          model: OrderModel,
          template: listTemp,
          render: '#order-list-ul',
          pagination: true,
          enterRender: '.btn-search'
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
              {key: 'orderSn', value: this.searchKey }
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
          width: 700,
          target: this.$('.search-advance-product').get(0),
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
      render: function(){
        this._render();
      }
    });

    module.exports = OrderList;
  });