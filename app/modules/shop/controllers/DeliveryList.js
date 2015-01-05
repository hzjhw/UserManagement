/**
 * @description DeliveryList
 * @namespace DeliveryList
 * @author yongjin<zjut_wyj@163.com> 2015/1/5
 */
define('DeliveryList', ['BaseModel', 'BaseCollection', 'BaseItem', 'BaseList', 'template/delivery_item'],
  function (require, exports, module) {
    var DeliveryList, BaseModel, BaseCollection, BaseItem, BaseList, model, collection, item, itemTemp;

    BaseModel = require('BaseModel');
    BaseCollection = require('BaseCollection');
    BaseItem = require('BaseItem');
    BaseList = require('BaseList');
    itemTemp = require('template/delivery_item');

    model = BaseModel.extend({
      defaults: Est.extend({

      }, BaseModel.prototype.defaults),
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
          template: itemTemp,
          modelBind: true
        });
      },
      render: function () {
        this._render();
      }
    });

    DeliveryList = BaseList.extend({
      initialize: function () {
        this._initialize({
          model: model,
          collection: collection,
          item: item
        });
      },
      render: function () {
        this._render();
      },
      getItems: function () {
        var result = [];
        Est.each(this.collection.models, function (item) {
          result.push({
            productQuantity: item.attributes.productQuantity,
            productId: item.attributes.product.productId
          });
        });
        return result;
      }
    });

    module.exports = DeliveryList;
  });