/**
 * @description PhotoSelect
 * @namespace PhotoSelect
 * @author yongjin<zjut_wyj@163.com> 2014/12/19
 */
define('PhotoSelect', ['PhotoModel', 'BaseCollection', 'BaseList', 'BaseItem', 'AlbumList', 'template/photo_select_item', 'template/photo_select_list'],
  function (require, exports, module) {
    var PhotoSelect, PhotoModel, BaseList, BaseCollection, BaseItem, AlbumList, PhotoCollection, PhotoItem, itemTemp, listTemp;

    BaseCollection = require('BaseCollection');
    BaseList = require('BaseList');
    BaseItem = require('BaseItem');
    AlbumList = require('AlbumList');
    PhotoModel = require('PhotoModel');
    itemTemp = require('template/photo_select_item');
    listTemp = require('template/photo_select_list');

    PhotoCollection = BaseCollection.extend({
      url: CONST.API + '/album/attr/list',
      model: PhotoModel,
      initialize: function () {
        this._initialize();
      }
    });

    PhotoItem = BaseItem.extend({
      tagName: 'div',
      className: 'item ui-widget-content',
      events: {
        'click .toggle': '_toggleChecked'
      },
      initialize: function(){
        this._initialize({
          template: itemTemp,
          model: PhotoModel
        });
      },
      render: function(){
        this._render();
      }
    });

    PhotoSelect = BaseList.extend({
      el: '#pic-source-list',
      events: {
        'click #toggle-all': 'toggleAllChecked', // 选择框
        'click .btn-batch-del': '_batchDel', // 批量删除
        'click .product-add': '_detail' // 添加页面
      },
      initialize: function(){
        this._initialize({
          template: listTemp,
          render: '.photo-list',
          collection: PhotoCollection,
          model: PhotoModel,
          item: PhotoItem,
          pagination: true
        }).then(function (thisCtx) {
          thisCtx.collection._setItemId('all');
          thisCtx._initPagination(thisCtx._options);
          thisCtx._load(thisCtx._options);
        });
      },
      render: function(){
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
        this.collection._setItemId(id);
        this._load(this._options);
      },
      getItems: function(){
        var result = Est.pluck(this.collection.models, function(item){
          return item.attributes.serverPath;
        });
        return result;
      },
      search: function (searchKey) {
        if (Est.isEmpty(searchKey)) {
          this._load({ page: 1, pageSize: 16 });
        } else {
        this._search({
          filter: [
            { key: 'filename', value: searchKey }
          ]});
      }}
    });

    module.exports = PhotoSelect;

  });