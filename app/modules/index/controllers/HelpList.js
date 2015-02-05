/**
 * @description HelpList
 * @class HelpList
 * @author yongjin<zjut_wyj@163.com> 2015/1/14
 */
define('HelpList', ['BaseList', 'BaseModel', 'BaseCollection', 'BaseItem', 'template/help_item'],
  function (require, exports, module) {
    var HelpList, BaseList, BaseCollection, BaseModel, BaseItem, model, collection, item, itemTemp;

    BaseList = require('BaseList');
    BaseCollection = require('BaseCollection');
    BaseItem = require('BaseItem');
    BaseModel = require('BaseModel');
    itemTemp = require('template/help_item');

    model = BaseModel.extend({
      defaults: Est.extend({}, BaseModel.prototype.defaults),
      initialize: function () {
        this._initialize();
      }
    });

    collection = BaseCollection.extend({
      model: model,
      initialize: function () {
        this._initialize();
      }
    });

    item = BaseItem.extend({
      tagName: 'li',
      initialize: function () {
        this._initialize({
          template: itemTemp
        });
      },
      render: function () {
        this._render();
      }
    });

    HelpList = BaseList.extend({
      initialize: function () {
        this._initialize({
          item: item,
          model: model,
          collection: collection
        });
      },
      render: function () {
        this._render();
      }
    });

    module.exports = HelpList;
  });