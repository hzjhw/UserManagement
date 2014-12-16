/**
 * @description AlbumList
 * @namespace AlbumList
 * @author yongjin<zjut_wyj@163.com> 2014/12/15
 */
define('AlbumList', ['BaseModel', 'BaseComposite', 'BaseList', 'BaseItem', 'template/album_list', 'template/album_item', 'AlbumModel'],
  function (require, exports, module) {
  var AlbumList, BaseModel, BaseComposite, BaseList, BaseItem, listTemp, itemTemp, AlbumCollection, AlbumModel, AlbumItem;

    BaseModel = require('BaseModel');
    BaseComposite = require('BaseCollection');
    BaseList = require('BaseList');
    BaseItem = require('BaseItem');
    listTemp = require('template/album_list');
    itemTemp = require('template/album_item');
    AlbumModel = require('AlbumModel');

    AlbumCollection = BaseComposite.extend({
      url: CONST.API + '/album/list',
      model: AlbumModel,
      initialize: function () {
        this._initialize();
      }
    });

    AlbumItem = BaseItem.extend({
      tagName: 'li',
      className: 'cate-grid-row',
      events: {
        'click .delete': '_del',
        'click .move-up': '_moveUp',
        'click .move-down': '_moveDown'
      },
      initialize: function(){
        this._initialize({
          viewId: 'albumList',
          template: itemTemp
        });
      },
      render: function(){
        this._render();
      }
    });

    AlbumList = BaseList.extend({
      el: '#jhw-main',
      events: {
        'click #toggle-all': '_toggleAllChecked', // 选择框
        'click .product-add': '_detail' // 添加页面
      },
      initialize: function(){
        this._initialize({
          template: listTemp,
          render: '.album-cate-ul',
          collection: AlbumCollection,
          model: AlbumModel,
          item: AlbumItem,

          subRender: '.album-sub',
          collapse: '.node-collapse',
          parentId: 'parentId',
          categoryId: 'albumId',
          extend: false
        }).then(function (thisCtx) {
          thisCtx._load(thisCtx._options);
        });
      },
      render: function(){
        this._render();
      }
    });

  module.exports = AlbumList;

  });