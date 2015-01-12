/**
 * @description DepositRecharge
 * @namespace DepositRecharge
 * @author wxw on 15-1-17
 */
define('DepositRecharge', ['BaseList', 'BaseView', 'BaseCollection', 'BaseItem', 'BaseModel', 'template/deposit_recharge'
    , 'template/deposit_list','DepositModel'],
  function (require, exports, module) {
    var DepositRecharge, BaseList, BaseView, itemTemp,BaseCollection, BaseItem, item, collection,
      BaseModel, DepositModel;

    BaseView = require('BaseView');
    itemTemp = require('template/deposit_recharge');
    BaseList = require('BaseList');
    BaseModel = require('BaseModel');
    DepositModel = require('DepositModel');
    BaseCollection = require('BaseCollection');
    BaseItem = require('BaseItem');

    collection = BaseCollection.extend({
      url: CONST.API + '/shop/deposit/recharge',
      initialize: function () {
        this._initialize({
          model: DepositModel
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
    DepositRecharge = BaseList.extend({
      initialize: function () {
        this._initialize({
          model: DepositModel,
          collection: collection,
          item: item,
          template: itemTemp,
          render: '.order-tbody'
        });
        this.render();
      },
      render: function () {
        this._render();
      }
    });

    module.exports = DepositRecharge;
  });