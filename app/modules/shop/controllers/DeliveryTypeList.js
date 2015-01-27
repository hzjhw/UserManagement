/**
 * @description 配送方式列表
 * @namespace DeliveryTypeList
 * @author yongjin<zjut_wyj@163.com> 2014/12/30
 */
define('DeliveryTypeList', ['BaseList', 'BaseItem', 'BaseCollection', 'DeliveryTypeModel', 'template/delivery_type_item',
    'template/delivery_type_list', 'Utils'],
  function (require, exports, module) {
    var DeliveryTypeList, BaseList, BaseItem, BaseCollection, DeliveryTypeItem, DeliveryTypeModel,
      DeliveryTypeCollection, itemTemp, listTemp, Utils;

    BaseList = require('BaseList');
    BaseItem = require('BaseItem');
    BaseCollection = require('BaseCollection');
    itemTemp = require('template/delivery_type_item');
    listTemp = require('template/delivery_type_list');
    Utils = require('Utils');
    DeliveryTypeModel = require('DeliveryTypeModel');

    DeliveryTypeCollection = BaseCollection.extend({
      url: CONST.API + '/deliverytype/list',
      model: DeliveryTypeModel,
      initialize: function () {
        this._initialize();
      }
    });

    DeliveryTypeItem = BaseItem.extend({
      tagName: 'tr',
      className: 'bui-grid-row',
      events: {
        'click .toggle': '_toggleChecked',
        'click .btn-edit': 'edit',
        'click .btn-del': '_del',
        'click .name': 'editName',
        'click .move-up': '_moveUp', // 上移
        'click .move-down': '_moveDown', // 下移
        'change .input-sort': '_saveSort' // 保存sort 注： 当字段不为sort时， 此方法不适用， 参照AttributesList中的changeSort方法
      },
      initialize: function () {
        this._initialize({
          template: itemTemp,
          detail: CONST.HOST + '/modules/shop/delivery_type_detail.html'
        });
      },
      edit: function () {
        this._navigate('#/shop/delivery_type/' + this.model.get('id'), true);
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

    DeliveryTypeList = BaseList.extend({
      events: {
        'click #toggle-all': '_toggleAllChecked',
        'click .btn-batch-del': '_batchDel',
        'click .product-add': 'add',
        'click .btn-search': 'search',
        'click .search-advance-product': 'searchAdvance',
        'click .btn-back': 'back'
      },
      initialize: function () {
        this._initialize({
          model: DeliveryTypeModel,
          item: DeliveryTypeItem,
          render: '#deliver-type-list-ul',
          collection: DeliveryTypeCollection,
          enterRender: '.btn-search',
          template: listTemp,
          pagination: true,
          detail: CONST.HOST + '/modules/shop/delivery_type_detail.html'
        });
      },
      back: function () {
        this._navigate('#/shop', true);
      },
      add: function () {
        this._navigate('#/shop/delivery_type_add', true);
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

    module.exports = DeliveryTypeList;
  });