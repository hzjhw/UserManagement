/**
 * @description PhotoList
 * @namespace PhotoList
 * @author yongjin<zjut_wyj@163.com> 2014/12/16
 */
define('PhotoList', ['BaseCollection', 'BaseItem', 'BaseList', 'PhotoModel', 'template/photo_list', 'template/photo_item'],
  function (require, exports, module) {
    var PhotoList, PhotoCollectoin, PhotoItem, BaseCollection, BaseItem, PhotoModel, BaseList, listTemp, itemTemp;

    BaseCollection = require('BaseCollection');
    BaseItem = require('BaseItem');
    BaseList = require('BaseList');
    listTemp = require('template/photo_list');
    itemTemp = require('template/photo_item');
    PhotoModel = require('PhotoModel');

    PhotoCollecton = BaseCollection.extend({
      url: CONST.API + '/album/attr/list',
      initialize: function () {
        this._initialize();
      },
      setItemId: function (itemId) {
        this.itemId = itemId;
      }
    });

    PhotoItem = BaseItem.extend({
      tagName: 'div',
      className: 'item ui-widget-content',
      events: {
        'click .toggle': '_toggleChecked'
      },
      initialize: function () {
        this._initialize({
          template: itemTemp
        });
      },
      render: function () {
        this._render();
      }
    });

    PhotoList = BaseList.extend({
      el: '.album_right',
      events: {
        'click #toggle-all': 'toggleAllChecked', // 选择框
        'click .btn-batch-del': '_batchDel', // 批量删除
        'click .product-add': '_detail' // 添加页面
      },
      initialize: function () {
        this._initialize({
          template: listTemp,
          render: '.photo-list',
          collection: PhotoCollecton,
          model: PhotoModel,
          item: PhotoItem
        }).then(function (thisCtx) {
          thisCtx._initPagination(thisCtx._options);
          thisCtx._load(thisCtx._options);
        });
      },
      render: function () {
        this._render();
      },
      toggleAllChecked: function () {
        var checked = this.allCheckbox.checked;
        this._toggleAllChecked();
        if (!checked) {
          this.$('.item').removeClass('item-active');
        } else {
          this.$('.item').addClass('item-active');
        }
      },
      reLoad: function (id) {
        this.collection.setItemId(id);
        this._load(this._options);
      }
    });


    module.exports = PhotoList;
  });