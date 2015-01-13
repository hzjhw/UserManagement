/**
 * @description DepositList
 * @namespace DepositList
 * @author wxw<zjut_wyj@163.com> 2015/1/12
 */
define('DepositList', ['BaseList', 'BaseView', 'BaseCollection', 'BaseItem', 'BaseModel', 'template/deposit_item' ,
    'template/deposit_list', 'DepositModel'],
  function (require, exports, module) {
    var DepositList, BaseList, BaseView, itemTemp, listTemp, BaseCollection, BaseItem, item, collection,
      BaseModel, DepositModel;

    BaseView = require('BaseView');
    itemTemp = require('template/deposit_item');
    listTemp = require('template/deposit_list');
    BaseList = require('BaseList');
    BaseModel = require('BaseModel');
    DepositModel = require('DepositModel');
    BaseCollection = require('BaseCollection');
    BaseItem = require('BaseItem');

    collection = BaseCollection.extend({
      url: CONST.API + '/shop/deposit/list',
      model: DepositModel,
      initialize: function () {
        this._initialize();
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
    DepositList = BaseList.extend({
      initialize: function () {
        this._initialize({
          model: DepositModel,
          collection: collection,
          item: item,
          template: listTemp,
          render: '.order-tbody'
        });
      },
      render: function () {
        this._render();
      }
    });

    module.exports = DepositList;
  });