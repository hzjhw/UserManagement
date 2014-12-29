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
      initialize: function(){
        this._initialize({
          template: itemTemp,
          model: OrderModel
        });
      },
      render: function(){
        this._render();
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