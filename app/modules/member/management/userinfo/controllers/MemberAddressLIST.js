/**
 * @description MemberAddressList
 * @class MemberAddressList
 * @author yongjin<zjut_wyj@163.com> 2015/1/11
 */
define('MemberAddressList', ['BaseList', 'BaseItem', 'BaseCollection', 'MemberAddressDetail', 'MemberAddressModel', 'template/member_address_list',
    'template/member_address_item'],
  function (require, exports, module) {
    var MemberAddressList, BaseList, BaseItem, BaseCollection, MemberAddressModel, MemberAddressDetail, collection, item, item_temp, list_temp;

    BaseList = require('BaseList');
    BaseItem = require('BaseItem');
    BaseCollection = require('BaseCollection');
    MemberAddressModel = require('MemberAddressModel');
    item_temp = require('template/member_address_item');
    list_temp = require('template/member_address_list');
    MemberAddressDetail = require('MemberAddressDetail');

    collection = BaseCollection.extend({
      url: CONST.API + '/shop/receiver/list',
      model: MemberAddressModel,
      initialize: function () {
        this._initialize();
      }
    });

    item = BaseItem.extend({
      tagName: 'tr',
      events: {
        'click .btn-del': '_del'
      },
      initialize: function () {
        this._initialize({
          template: item_temp
        });
      },
      render: function () {
        this._render();
      }
    });

    MemberAddressList = BaseList.extend({
      events: {
        'click .addButton': 'add'
      },
      initialize: function () {
        this._initialize({
          model: MemberAddressModel,
          item: item,
          collection: collection,
          template: list_temp,
          render: '.address-tbody'
        });
      },
      add: function () {
        app.addPanel('main', {
          el: '#main',
          template: '<div class="main-inner"></div>'
        }).addView('memberAddressDetail', new MemberAddressDetail({
          el: '.main-inner',
          viewId: 'memberAddressDetail'
        }));
      },
      render: function () {
        this._render();
      }
    });

    module.exports = MemberAddressList;
  });