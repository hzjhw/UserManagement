/**
 * @description PhotoList
 * @namespace PhotoList
 * @author yongjin<zjut_wyj@163.com> 2014/12/16
 */
define('PhotoList', ['BaseCollection', 'BaseItem', 'BaseList','HandlebarsHelper', 'PhotoModel', 'BaseUtils','template/photo_list', 'template/photo_item', 'ZeroClipboard', 'template/photo_copy'],
  function (require, exports, module) {
    var PhotoList, PhotoCollection, PhotoItem, BaseCollection, BaseItem, PhotoModel,HandlebarsHelper, BaseList, listTemp, itemTemp, BaseUtils, copyDetail, ZeroClipboard;

    BaseCollection = require('BaseCollection');
    BaseItem = require('BaseItem');
    BaseList = require('BaseList');
    listTemp = require('template/photo_list');
    itemTemp = require('template/photo_item');
    PhotoModel = require('PhotoModel');
    BaseUtils = require('BaseUtils');
    copyDetail = require('template/photo_copy');
    HandlebarsHelper = require('HandlebarsHelper');

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
        'click .toggle': '_toggleChecked',
        'click .delete': '_del',
        'click .img-name': 'editName',
        'click .copy-pic': 'copy',
        'click .copy-link': 'copyLink'
      },
      initialize: function () {
        this._initialize({
          template: itemTemp
        });
      },
      render: function () {
        this._render();
      },
      editName: function (e) {
        e.stopImmediatePropagation();
        this._editField({
          target: '.img-name',
          title: '修改名称',
          field: 'filename'
        });
      },
      copy: function(e){
        e.stopImmediatePropagation();
        if (!this.copyDetail)
            this.copyDetail = HandlebarsHelper.compile(copyDetail);
        BaseUtils.dialog({
          id: 'copyDialog',
          title: '复制图片',
          width: 800,
          content: this.copyDetail({
            filename: this.model.get('filename'),
            serverPath: this.model.get('serverPath')
          })
        });
        BaseUtils.initCopy('#photo-copy-dialog', {
          success: function(){
            window.copyDialog.close();
          }
        });
      },
      copyLink: function(){

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
          collection: PhotoCollection,
          model: PhotoModel,
          item: PhotoItem
        }).then(function (thisCtx) {
          thisCtx.collection._setItemId('all');
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
        this.collection._setItemId(id);
        this._load(this._options);
      },
      search: function (searchKey) {
        this._search({
          filter: [
            { key: 'filename', value: searchKey }
          ]});
      }
    });


    module.exports = PhotoList;
  });