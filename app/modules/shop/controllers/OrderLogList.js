/**
 * @description OrderLogList
 * @namespace OrderLogList
 * @author yongjin<zjut_wyj@163.com> 2015/1/5
 */
define('OrderLogList', ['BaseModel', 'BaseCollection', 'BaseItem', 'BaseList', 'template/order_log_item'],
  function (require, exports, module) {
    var OrderLogList, BaseModel, BaseCollection, BaseItem, BaseList, itemTemp, collection, item, model;

    BaseModel = require('BaseModel');
    BaseCollection = require('BaseCollection');
    BaseItem = require('BaseItem');
    BaseList = require('BaseList');
    itemTemp = require('template/order_log_item');

    model = BaseModel.extend({
      defaults: Est.extend({
      }, BaseModel.prototype.defaults),
      initialize: function(){
        this._initialize();
      }
    });

    collection = BaseCollection.extend({
      initialize: function(){
        this._initialize({
          model: model
        });
      }
    })

    item = BaseItem.extend({
      tagName: 'tr',
      className: 'log-tr',
      initialize: function(){
        this._initialize({
          template: itemTemp
        });
      },
      render: function(){
        this._render();
      }
    });

    OrderLogList = BaseList.extend({
      initialize: function(){
        this._initialize({
          model: model,
          collection: collection,
          item: item
        });
      },
      render: function(){
        this._render();
      },
      getItems: function(){
        return Est.pluck(this.collection.models, 'attributes.name');
      }
    });

    module.exports = OrderLogList;

  });