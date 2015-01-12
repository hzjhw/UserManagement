/**
 * @description DepositList
 * @namespace DepositList
 * @author wxw<zjut_wyj@163.com> 2015/1/12
 */
define('DepositList', ['BaseList', 'BaseView', 'BaseCollection', 'BaseItem', 'BaseModel', 'template/deposit_item'
    , 'template/deposit_list','DepositModel'],
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
      initialize: function () {
        this._initialize({
          model: DepositModel
        });
      }
    });

    item = BaseItem.extend({
      tagName: 'tr',
      events: {
        'click .delete': '_del',
        'click .edit': 'edit'
      },
      initialize: function () {
        this._initialize({
          template: itemTemp
        });
      },
      render: function () {
        this.render();
      },
      edit: function(){
        var ctx=this;
        seajs.use(['jquery', 'DepositSend'], function (jquery, DepositSend) {
          app.addPanel('main', {
            el: '#main',
            template: '<div class="main-inner"></div>'
          }).addView('depositSend', new DepositSend({
            el: '.main-inner',
            id: ctx.model.get('depositId'),
            depositType: 'detail',
            data: {
              depositType: 'detail'
            }
          }));
        });
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
        this.render();
      },
      render: function () {
        this._render();
      }
    });

    module.exports = DepositList;
  });