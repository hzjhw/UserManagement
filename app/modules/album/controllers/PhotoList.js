/**
 * @description PhotoList
 * @namespace PhotoList
 * @author yongjin<zjut_wyj@163.com> 2014/12/16
 */
define('PhotoList', ['BaseCollection', 'BaseItem', 'BaseList', 'PhotoModel', 'template/photo_list', 'template/photo_item'],
  function (require, exports, module) {
    var PhotoList, PhotoCollectoin, PhotoItem, BaseCollection, BaseItem,PhotoModel,  BaseList, listTemp, itemTemp;

    BaseCollection = require('BaseCollection');
    BaseItem = require('BaseItem');
    BaseList = require('BaseList');
    listTemp = require('template/photo_list');
    itemTemp = require('template/photo_item');
    PhotoModel = require('PhotoModel');

    PhotoCollecton = BaseCollection.extend({
      url: function(){
        var end = '';
        if (!Est.isEmpty(this.itemId)) end = '/' + this.itemId;
       return CONST.API + '/album/attr' + end;
      },
      initialize: function(){
        this._initialize();
      },
      setItemId : function(itemId){
        this.itemId = itemId;
      }
    });

    PhotoItem = BaseItem.extend({
      tagName: 'div',
      className: '.photo-container',
      events: {

      },
      initialize: function(){
        this._initialize({
          template: itemTemp
        });
      },
      render: function(){
        this._render();
      }
    });

    PhotoList = BaseList.extend({
      el: '.album_right',
      events: {

      },
      initialize: function(){
        this._initialize({
          template: listTemp,
          render: '.album_right',
          collection: PhotoCollecton,
          model: PhotoModel,
          item: PhotoItem
        });
      },
      render: function(){
        this._render();
      }
    });


    module.exports = PhotoList;
  });