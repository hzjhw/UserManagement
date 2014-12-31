/**
 * @description ProductInfoList
 * @namespace ProductInfoList
 * @author yongjin<zjut_wyj@163.com> 2014/12/30
 */
define('ProductInfoList', ['BaseList', 'BaseCollection', 'BaseItem', 'BaseModel', 'template/product_info_item'],
  function (require, exports, module) {
    var ProductInfoList, BaseList, BaseCollection, BaseItem, BaseModel, collection, model, item, itemTemp;

    BaseList = require('BaseList');
    BaseCollection = require('BaseCollection');
    BaseItem = require('BaseItem');
    BaseModel = require('BaseModel');
    itemTemp = require('template/product_info_item');

    model = BaseModel.extend({
      defaults: Est.extend({

      }, BaseModel.prototype.defaults),
      baseId: 'id',
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
      className: 'bui-grid-row',
      events: {
        'click .delete': '_del',
        'click .btn-quantity-minus': 'quantityMinus',
        'click .btn-quantity-plus': 'quantityPlus'
      },
      initialize: function () {
        this.quantity = this.model.get('productQuantity');
        this._initialize({
          template: itemTemp,
          modelBind: true
        });
      },
      render: function () {
        this._render();
      },
      quantityMinus: function () {
        if (parseInt(this.quantity, 10) === 0) return;
        this.model.set('productQuantity', this.quantity - 1);
      },
      quantityPlus: function () {
        this.model.set('productQuantity', this.quantity + 1);
      }
    });

    ProductInfoList = BaseList.extend({
      initialize: function () {
        this._initialize({
          collection: collection,
          model: model,
          item: item
        })
      },
      render: function () {
        this._render();
      },
      getItems: function () {
        return Est.pluck(this.collection.models, 'attributes');
      }
    });

    module.exports = ProductInfoList;
  });