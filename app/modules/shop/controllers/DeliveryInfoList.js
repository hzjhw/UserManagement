/**
 * @description DeliveryInfoList
 * @namespace DeliveryInfoList
 * @author yongjin<zjut_wyj@163.com> 2015/1/5
 */
define('DeliveryInfoList', ['BaseModel', 'BaseCollection', 'BaseItem', 'BaseList', 'template/delivery_info_item'],
  function (require, exports, module) {
    var DeliveryInfoList, BaseModel, BaseCollection, BaseItem, BaseList, itemTemp, model, collection, item;

    BaseModel = require('BaseModel');
    BaseCollection = require('BaseCollection');
    BaseItem = require('BaseItem');
    BaseList = require('BaseList');
    itemTemp = require('template/delivery_info_item');

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
        this._render();
      }
    });

    DeliveryInfoList = BaseList.extend({
      initialize: function () {
        this._initialize({
          model: model,
          collection: collection,
          item: item
        });
      },
      render: function () {
        this._render();
      }
    });


    module.exports = DeliveryInfoList;
  });