/**
 * @description 订单列表
 * @namespace OrderList
 * @author yongjin<zjut_wyj@163.com> 2014/12/29
 */
define('OrderList', ['BaseList', 'OrderModel', 'BaseItem', 'HandlebarsHelper', 'Utils', 'BaseCollection',
    'template/order_list', 'template/order_item', 'template/order_search'],
  function (require, exports, module) {
    var BaseList, BaseItem, BaseCollection, OrderList, Utils, itemTemp, HandlebarsHelper, listTemp, OrderModel,
      OrderCollection, OrderItem, searchTemp;

    BaseList = require('BaseList');
    BaseItem = require('BaseItem');
    BaseCollection = require('BaseCollection');
    itemTemp = require('template/order_item');
    listTemp = require('template/order_list');
    OrderModel = require('OrderModel');
    Utils = require('Utils');
    HandlebarsHelper = require('HandlebarsHelper');
    searchTemp = require('template/order_search');

    OrderCollection = BaseCollection.extend({
      url: CONST.API + '/order/list',
      model: OrderModel,
      initialize: function () {
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
      initialize: function () {
        this._initialize({
          template: itemTemp,
          model: OrderModel,
          detail: CONST.HOST + '/modules/shop/order_detail.html'
        });
      },
      render: function () {
        this._render();
      },
      edit: function () {
        var ctx = this;
        seajs.use(['OrderDetail'], function (OrderDetail) {
          app.addPanel('main', {
            el: '#jhw-main',
            template: '<div class="jhw-panel"></div>'
          }).addView('orderView', new OrderDetail({
            el: '.jhw-panel',
            id: ctx.model.get('id'),
            page: ctx._getPage()
          }));
          ;
        });
      },
      viewOrder: function () {
        var ctx = this;
        seajs.use(['OrderView'], function (OrderView) {
          app.addPanel('main', {
            el: '#jhw-main',
            template: '<div class="jhw-panel"></div>'
          }).addView('orderView', new OrderView({
            el: '.jhw-panel',
            id: ctx.model.get('id'),
            page: ctx._getPage()
          }));
          ;
        });
      },
      handleOrder: function () {
        var ctx = this;
        seajs.use(['OrderHandle'], function (OrderHandle) {
          app.addPanel('main', {
            el: '#jhw-main',
            template: '<div class="jhw-panel"></div>'
          }).addView('orderHandle', new OrderHandle({
            el: '.jhw-panel',
            id: ctx.model.get('id'),
            page: ctx._getPage()
          }));
          ;
        });
      }
    });

    OrderList = BaseList.extend({
      events: {
        'click .btn-search': 'search',
        'click .search-advance-product': 'searchAdvance',
        'click #toggle-all': '_toggleAllChecked',
        'click .btn-pay-type': 'payType',
        'click .btn-delivery-type': 'deliveryType',
        'click .btn-delivery-corp': 'deliveryCorp'
      },
      initialize: function () {
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
      // 支付方式管理
      payType: function(){
        this._navigate('#/shop/pay_type', true);
      },
      // 配送方式管理
      deliveryType: function(){
        this._navigate('#/shop/delivery_type', true);
      },
      // 物流公司查看
      deliveryCorp: function(){
        this._navigate('#/shop/delivery_corp', true);
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
        Utils.dialog({
          title: '高级搜索',
          width: 700,
          target: this.$('.search-advance-product').get(0),
          content: ctx.searchTemp({
            orderSn: ctx.orderSn,
            username: ctx.username,
            shipName: ctx.shipName,
            shipArea: ctx.shipArea,
            paymentStatus: app.getStatus('paymentStatus'),
            shippingStatus: app.getStatus('shippingStatus'),
            orderStatus: app.getStatus('orderStatus')
          }),
          success: function () {
            ctx.orderSn = $('input[name=orderSn]').val();
            ctx.shipName = $('input[name=shipName]').val();
            ctx.username = $('input[name=username]').val();
            ctx.shipArea = $('input[name=shipArea]').val();
            ctx.paymentStatus = $('select[name=paymentStatus]').val();
            ctx.shippingStatus = $('select[name=shippingStatus]').val();
            ctx.orderStatus = $('select[name=orderStatus]').val();
            ctx._search({
              filter: [
                {key: 'orderSn', value: ctx.orderSn },
                {key: 'shipName', value: ctx.shipName} ,
                {key: 'memberObj.username', value: ctx.username},
                {key: 'shipArea', value: ctx.shipArea},
                {key: 'paymentStatus', value: ctx.paymentStatus, match: new RegExp('^' + ctx.paymentStatus + '$')},
                {key: 'shippingStatus', value: ctx.shippingStatus, match: new RegExp('^' + ctx.shippingStatus + '$')},
                {key: 'orderStatus', value: ctx.orderStatus, match: new RegExp('^' + ctx.orderStatus + '$')}
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

    module.exports = OrderList;
  });