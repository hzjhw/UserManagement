/**
 * @description OrderList
 * @namespace OrderList
 * @author yongjin<zjut_wyj@163.com> 2014/12/29
 */
define('OrderList', ['BaseList', 'OrderModel', 'BaseItem', 'BaseCollection', 'template/order_list', 'template/order_item'],
  function (require, exports, module) {
  var BaseList, BaseItem, BaseCollection, OrderList, itemTemp, listTemp, OrderModel, OrderCollection, OrderItem;

    BaseList = require('BaseList');
    BaseItem = require('BaseItem');
    BaseCollection = require('BaseCollection');
    itemTemp = require('template/order_item');
    listTemp = require('template/order_list');
    OrderModel = require('OrderModel');

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
        'click .edit': '_edit',
        'click .delete': '_del',
        'click .view': 'viewOrder'
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
      }
    });

    OrderList = BaseList.extend({
      initialize: function(){
        this._initialize({
          collection: OrderCollection,
          item: OrderItem,
          model: OrderModel,
          template: listTemp,
          render: '#order-list-ul'
        });
      },
      render: function(){
        this._render();
      }
    });

    module.exports = OrderList;
  });