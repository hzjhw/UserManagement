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
        minusQuantity: ''
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
      events: {
        'click .btn-quantity-minus': 'quantityMinus',
        'click .btn-quantity-plus': 'quantityPlus'
      },
      initialize: function () {
        this._initialize({
          template: itemTemp,
          modelBind: true,
          filter: function (model) {
            var minus = 0;
            if (Est.isEmpty(model.get('minusQuantity'))){
              var num1 = model.get('productQuantity');
              var num2 = model.get('deliveryQuantity');
              minus = num1 - num2;
            } else{
              minus = parseInt(model.get('minusQuantity'));
            }
            model.set('minusQuantity', minus);
          }
        });
      },
      quantityMinus: function () {
        this.quantity = this.model.get('minusQuantity');
        if (parseInt(this.quantity, 10) === 0) return;
        this.model.set('minusQuantity', this.quantity - 1);
      },
      quantityPlus: function () {
        this.quantity = this.model.get('minusQuantity');
        this.model.set('minusQuantity', this.quantity + 1);
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
            productQuantity: parseInt(Est.isEmpty(item.attributes.minusQuantity) ? item.attributes.productQuantity :
              item.attributes.minusQuantity, 10),
            productId: item.attributes.product.productId
          });
        });
        return result;
      }
    });

    module.exports = DeliveryList;
  });