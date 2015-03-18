/**
 * @description WwyLtyResultList
 * @class WwyLtyResultList
 * @author yongjin<zjut_wyj@163.com> 2015/3/17
 */
define('WwyLtyResultList', ['BaseList', 'BaseModel', 'BaseCollection', 'BaseItem', 'template/wwy_lty_result_item'], function (require, exports, module) {
  var WwyLtyResultList, BaseList, BaseModel, BaseCollection, BaseItem, model, item, collection, itemTemp;

  BaseList = require('BaseList');
  BaseModel = require('BaseModel');
  BaseCollection = require('BaseCollection');
  BaseItem = require('BaseItem');
  itemTemp = require('template/wwy_lty_result_item');

  model = BaseModel.extend({
    defaults: Est.extend({

    }, BaseModel.prototype.default),
    baseId: 'id',
    initialize: function () {
      this._initialize();
    }
  });

  collection = BaseCollection.extend({
    model: model,
    url: function () {
      return CONST.API + '/wwy/detail/' + this.options.wwyId + '/lottery';
    },
    initialize: function () {
      this._initialize();
    }
  });

  item = BaseItem.extend({
    tagName: 'tr',
    className: 'bui-grid-row',
    initialize: function () {
      this._initialize({
        model: model,
        template: itemTemp
      });
    },
    render: function () {
      this._render();
    }
  });

  WwyLtyResultList = BaseList.extend({
    initialize: function () {
      this._initialize({
        render: '#lty-result-list-ul',
        model: model,
        item: item,
        collection: collection,
        pagination: true
      });
    },
    render: function () {
      this._render();
    }
  });

  module.exports = WwyLtyResultList;
});