/**
 * @description WwyLeafletPages
 * @class WwyLeafletPages
 * @author yongjin<zjut_wyj@163.com> 2015/3/16
 */
define('WwyLeafletPages', ['BaseList', 'WwyLeafletPageModel', 'BaseCollection', 'BaseItem', 'template/wwy_leaflet_pages_list', 'template/wwy_leaflet_pages_item'],
  function (require, exports, module) {
    var WwyLeafletPages, BaseCollection, itemTemp, listTemp, BaseList, model, collection, item, WwyLeafletPageModel, BaseItem;

    BaseList = require('BaseList');
    itemTemp = require('template/wwy_leaflet_pages_item');
    listTemp = require('template/wwy_leaflet_pages_list');
    WwyLeafletPageModel = require('WwyLeafletPageModel');
    BaseCollection = require('BaseCollection');
    BaseItem = require('BaseItem');

    collection = BaseCollection.extend({
      model: WwyLeafletPageModel,
      initialize: function () {
        this._initialize();
      }
    });

    item = BaseItem.extend({
      initialize: function () {
        this._initialize({
          template: itemTemp
        });
      },
      render: function () {
        this._render();
      }
    });

    WwyLeafletPages = BaseList.extend({
      initialize: function () {
        this._initialize({
          model: WwyLeafletPageModel,
          collection: collection,
          item: item,
          template: listTemp
        });
      },
      render: function () {
        this._render();
      }
    });

    module.exports = WwyLeafletPages;
  });