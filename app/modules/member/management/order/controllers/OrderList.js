/**
 * @description OrderList
 * @namespace OrderList
 * @author yongjin<zjut_wyj@163.com> 2015/1/8
 */
define('OrderList', ['BaseList', 'BaseView', 'backbone', 'Utils', 'BaseCollection', 'BaseItem', 'BaseModel', 'template/order_list',
    'template/order_item'],
  function (require, exports, module) {
    var OrderList, BaseList, BaseView, itemTemp, listTemp, BaseCollection, Utils, BaseItem, model, item, collection,
      BaseModel, BaseCollection, Backbone;

    BaseView = require('BaseView');
    itemTemp = require('template/order_item');
    listTemp = require('template/order_list');
    BaseList = require('BaseList');
    BaseModel = require('BaseModel');
    BaseCollection = require('BaseCollection');
    BaseItem = require('BaseItem');
    Backbone = require('backbone');
    Utils = require('Utils')

    model = BaseModel.extend({
      defaults: Est.extend({}, BaseModel.prototype.defaults),
      initialize: function () {
        this._initialize();
      }
    });

    collection = BaseCollection.extend({
      url: CONST.API + '/shop/order/list',
      model: model,
      initialize: function () {
        this._initialize();
      }
    });

    item = BaseItem.extend({
      tagName: 'tr',
      events: {
        'click .order-a': 'detail',
        'click .delivery-view': 'delivery'
      },
      initialize: function () {
        this._initialize({
          template: itemTemp
        });
      },
      delivery: function () {
        Utils.delivery({
          com: this.model.get('deliveryType')['defaultDeliveryCorp']['com'],
          nu: this.model.get('shippingSet')[0]['deliverySn'],
          target: this.$('.delivery-view').get(0)
        });
      },
      detail: function () {
        app.addData('curOrderModel', Est.cloneDeep(this.model.attributes));
        Backbone.history.navigate('#/order/detail', true);
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