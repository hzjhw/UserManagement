/**
 * @description FavoriteList
 * @namespace FavoriteList
 * @author yongjin<zjut_wyj@163.com> 2015/1/9
 */
define('FavoriteList', ['BaseList', 'BaseCollection', 'BaseList', 'BaseItem', 'FavoriteModel', 'template/favorite_list',
    'template/favorite_item'],
  function (require, exports, module) {
    var FavoriteList, BaseList, BaseCollection, FavoriteModel, BaseList, BaseItem, itemTemp, listTemp,
      collection, item;

    FavoriteModel = require('FavoriteModel');
    BaseList = require('BaseList');
    BaseCollection = require('BaseCollection');
    BaseItem = require('BaseItem');
    itemTemp = require('template/favorite_item');
    listTemp = require('template/favorite_list');

    collection = BaseCollection.extend({
      url: CONST.API + '/shop/favorite/list',
      model: FavoriteModel,
      initialize: function () {
        this._initialize({
          model: FavoriteModel
        });
      }
    });

    item = BaseItem.extend({
      tagName: 'tr',
      events: {
        'click .btn-del': '_del',
        'click .btn-url': 'productDetail'
      },
      initialize: function () {
        this._initialize({
          template: itemTemp
        })
      },
      productDetail: function () {
        var host = Est.urlResolve().host;
        top.window.location.href = 'http://' + host + '/product-detail-' +
          Est.encodeId(this.model.get('product')['productId']) + '.html'
      },
      render: function () {
        this._render();
      }
    });

    FavoriteList = BaseList.extend({
      initialize: function () {
        this._initialize({
          model: FavoriteModel,
          collection: collection,
          item: item,
          template: listTemp,
          render: '.favorite-tbody'
        });
      },
      render: function () {
        this._render();
      }
    });

    module.exports = FavoriteList;

  })
;