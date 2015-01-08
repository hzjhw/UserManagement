/**
 * @description OrderList
 * @namespace OrderList
 * @author yongjin<zjut_wyj@163.com> 2015/1/8
 */
define('OrderList', ['BaseList', 'BaseView', 'BaseCollection', 'BaseItem', 'BaseModel', 'template/order_list',
    'template/order_item'],
  function (require, exports, module) {
    var OrderList, BaseList, BaseView, itemTemp, listTemp, BaseCollection, BaseItem, model, item, collection,
      BaseModel, BaseCollection;

    BaseView = require('BaseView');
    itemTemp = require('template/order_item');
    listTemp = require('template/order_list');
    BaseList = require('BaseList');
    BaseModel = require('BaseModel');
    BaseCollection = require('BaseCollection');
    BaseItem = require('BaseItem');

    model = BaseModel.extend({
      defaults: Est.extend({}, BaseModel.prototype.defaults),
      initialize: function () {
        this._initialize();
      }
    });

    collection = BaseCollection.extend({
      initialize: function () {
        this._initialize({
          model: model
        });
      }
    });

    item = BaseItem.extend({
      tagName: 'tr',
      initialize: function () {
        this._initialize({
          template: itemTemp
        });
      },
      render: function () {
        this.render();
      }
    });

    OrderList = BaseList.extend({
      initialize: function () {
        this._initialize({
          model: model,
          collection: collection,
          item: item,
          template: listTemp,
          render: '.order-tbody'
        });
        this.render();
      },
      render: function () {
        this._render();
      }
    });

    module.exports = OrderList;
  });