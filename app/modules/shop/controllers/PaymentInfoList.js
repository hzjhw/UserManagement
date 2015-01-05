/**
 * @description PaymentInfoList
 * @namespace PaymentInfoList
 * @author yongjin<zjut_wyj@163.com> 2015/1/5
 */
define('PaymentInfoList', ['BaseModel', 'BaseItem', 'BaseCollection', 'BaseList', 'template/payment_info_item'],
  function (require, exports, module) {
    var PaymentInfoList, BaseModel, BaseItem, BaseCollection, BaseList, itemTemp, model, item, collection;

    BaseModel = require('BaseModel');
    BaseItem = require('BaseItem');
    BaseCollection = require('BaseCollection');
    BaseList = require('BaseList');
    itemTemp = require('template/payment_info_item');

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
          template: itemTemp
        });
      },
      render: function () {
        this._render();
      }
    });

    PaymentInfoList = BaseList.extend({
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

    module.exports = PaymentInfoList;

  });