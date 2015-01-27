/**
 * @description 物流公司列表
 * @namespace DeliveryCorpList
 * @author yongjin<zjut_wyj@163.com> 2014/12/30
 */
define('DeliveryCorpList', ['BaseList', 'BaseItem', 'BaseCollection', 'DeliveryCorpModel', 'template/delivery_corp_item',
    'template/delivery_corp_list', 'Utils'],
  function (require, exports, module) {
    var DeliveryCorpList, BaseList, BaseItem, BaseCollection, DeliveryCorpItem, DeliveryCorpModel,
      DeliveryCorpCollection, itemTemp, listTemp, Utils;

    BaseList = require('BaseList');
    BaseItem = require('BaseItem');
    BaseCollection = require('BaseCollection');
    itemTemp = require('template/delivery_corp_item');
    listTemp = require('template/delivery_corp_list');
    Utils = require('Utils');
    DeliveryCorpModel = require('DeliveryCorpModel');

    DeliveryCorpCollection = BaseCollection.extend({
      url: CONST.API + '/deliverycorp/list',
      model: DeliveryCorpModel,
      initialize: function () {
        this._initialize();
      }
    });

    DeliveryCorpItem = BaseItem.extend({
      tagName: 'tr',
      className: 'bui-grid-row',
      events: {
        'click .toggle': '_toggleChecked',
        'click .btn-edit': '_edit',
        'click .btn-del': '_del',
        'click .name': 'editName',
        'click .move-up': '_moveUp', // 上移
        'click .move-down': '_moveDown', // 下移
        'change .input-sort': '_saveSort' // 保存sort 注： 当字段不为sort时， 此方法不适用， 参照AttributesList中的changeSort方法
      },
      initialize: function () {
        this._initialize({
          template: itemTemp,
          detail: CONST.HOST + '/modules/shop/delivery_corp_detail.html'
        });
      },
      editName: function () {
        this._editField({
          target: '.pro-list-name',
          title: '修改名称',
          field: 'name'
        });
      },
      render: function () {
        this._render();
      }
    });

    DeliveryCorpList = BaseList.extend({
      events: {
        'click #toggle-all': '_toggleAllChecked',
        'click .btn-batch-del': '_batchDel',
        'click .product-add': '_detail',
        'click .btn-search': 'search',
        'click .search-advance-product': 'searchAdvance',
        'click .btn-back': 'back'
      },
      initialize: function () {
        this._initialize({
          model: DeliveryCorpModel,
          item: DeliveryCorpItem,
          render: '#deliver-corp-list-ul',
          collection: DeliveryCorpCollection,
          enterRender: '.btn-search',
          template: listTemp,
          pagination: true,
          detail: CONST.HOST + '/modules/shop/delivery_corp_detail.html'
        });
      },
      back: function () {
        this._navigate('#/shop', true);
      },
      render: function () {
        this._render();
      },
      // 简单搜索
      search: function () {
        this.searchKey = Est.trim(this.$('.search-text').val());
        if (Est.isEmpty(this.searchKey)) {
          this._load({ page: 1, pageSize: 16 });
        } else {
          this._search({
            filter: [
              {key: 'name', value: this.searchKey }
            ]
          });
        }
      }
    });

    module.exports = DeliveryCorpList;
  });