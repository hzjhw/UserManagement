/**
 * @description 收货记录
 * @namespace DeliveryInfoList
 * @author yongjin<zjut_wyj@163.com> 2015/1/5
 */
define('DeliveryInfoList', ['BaseModel', 'BaseCollection', 'HandlebarsHelper', 'BaseItem', 'BaseList', 'Utils', 'template/delivery_info_item'],
  function (require, exports, module) {
    var DeliveryInfoList, BaseModel, BaseCollection, BaseItem, BaseList, HandlebarsHelper, itemTemp, Utils, model, collection, item;

    BaseModel = require('BaseModel');
    BaseCollection = require('BaseCollection');
    BaseItem = require('BaseItem');
    BaseList = require('BaseList');
    itemTemp = require('template/delivery_info_item');
    Utils = require('Utils');
    HandlebarsHelper = require('HandlebarsHelper');

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
      events: {
        'click .delivery-view': 'deliveryView'
      },
      initialize: function () {
        this._initialize({
          template: itemTemp
        });
      },
      // 查看物流信息
      deliveryView: function () {
        Utils.delivery({
          com: this.model.get('com'),
          nu: this.model.get('deliverySn'),
          target: this.$('.delivery-view').get(0)
        });
      },
      render: function () {
        this._render();
      }
    });

    DeliveryInfoList = BaseList.extend({
      events: {
        'click .btn-back': 'back'
      },
      initialize: function () {
        this._initialize({
          model: model,
          collection: collection,
          item: item
        });
      },
      back: function(){
        this._navigate('#/shop', true);
      },
      render: function () {
        this._render();
      }
    });


    module.exports = DeliveryInfoList;
  });