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
        'click .toggle': 'itemClick',
        'click .delete': '_del',
        'click .move-up': '_moveUp',
        'click .move-down': '_moveDown',
        'click .edit': 'editName'
      },
      initialize: function(){
        this._initialize({
          viewId: 'albumList',
          template: itemTemp
        });
      },
      itemClick: function(e){
        e.stopImmediatePropagation();
        this.loadPhoto();
        this._toggleChecked(e);
      },
      editName: function(e){
        e.stopImmediatePropagation();
        this._editField({
          target: '.album-name',
          title: '修改相册名称',
          field: 'name'
        });
      },
      render: function(){
        this._render();
      },
      loadPhoto: function(){
        app.addData('curAlbumId', this.model.get('albumId'));
        if (app.getView('albumList')){
          app.getView('albumList').doClickFn(this.model.get('albumId'));
        }
      }
    });

    AlbumList = BaseList.extend({
      events: {
        'click #toggle-all': '_toggleAllChecked', // 选择框
        'click .album-add': '_detail' // 添加页面
      },
      initialize: function(){
        this._initialize({
          instance: this.options['instance'] || 'albumList',
          template: listTemp,
          render: '.album-cate-ul',
          collection: AlbumCollection,
          model: AlbumModel,
          item: AlbumItem,
          checkAppend: false,
          detail: CONST.HOST + '/modules/album/album_detail.html',

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
      },
      doClickFn: function(albumId){
        this.options.callback &&
        this.options.callback.call(this, albumId);
      }
    });

  module.exports = AlbumList;

  });