/**
 * @description PhotoList
 * @namespace PhotoList
 * @author yongjin<zjut_wyj@163.com> 2014/12/16
 */
define('PhotoList', ['BaseCollection', 'BaseItem', 'BaseList', 'HandlebarsHelper', 'PhotoModel', 'Utils', 'template/photo_list', 'template/photo_item', 'ZeroClipboard', 'template/photo_copy'],
  function (require, exports, module) {
    var PhotoList, PhotoCollection, PhotoItem, BaseCollection, BaseItem, PhotoModel, HandlebarsHelper, BaseList, listTemp, itemTemp, Utils, copyDetail, ZeroClipboard;

    BaseCollection = require('BaseCollection');
    BaseItem = require('BaseItem');
    BaseList = require('BaseList');
    listTemp = require('template/photo_list');
    itemTemp = require('template/photo_item');
    PhotoModel = require('PhotoModel');
    Utils = require('Utils');
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
      className: 'pic-item item ui-widget-content',
      events: {
        'click .toggle': '_toggleChecked',
        'click .delete': '_del',
        'click .img-name': 'editName',
        'click .copy-pic': 'copy',
        'click .pic-replace': 'replace',
        'dblclick img': 'show'
      },
      initialize: function () {
        this._initialize({
          template: itemTemp
        });
      },
      // 查看图片
      show: function () {
        Utils.dialog({
          id: 'imgShow',
          width: 800,
          content: '<img src="' + CONST.PIC_URL + '/' + Est.picUrl(this.model.get('serverPath'), 3) + '" />'
        });
        return false;
      },
      // 修改图片名称
      editName: function (e) {
        e.stopImmediatePropagation();
        this._editField({
          target: '.img-name',
          title: '修改名称',
          field: 'filename'
        });
      },
      // 图片替换
      replace: function (e) {
        e.stopImmediatePropagation();
        var id = this.model.get('id');
        var ctx = this;
        Utils.openUpload({
          id: 'replaceDialog' + id,
          title: '图片替换',
          albumId: app.getData('curAlbumId'),
          username: app.getData('user').username,
          replace: true,
          attId: this.model.get('attId'),
          oniframeload: function () {
            this.iframeNode.contentWindow.uploadCallback = function (result) {
              ctx.model.set('uploadTime', new Date().getTime());
              window['replaceDialog' + id].close().remove();
            };
          }
        });
      },
      // 图片复制
      copy: function (e) {
        e.stopImmediatePropagation();
        if (!this.copyDetail)
          this.copyDetail = HandlebarsHelper.compile(copyDetail);
        var dialogId = 'copy' + this.model.get('id');
        Utils.dialog({
          id: 'copy' + dialogId,
          title: '图片复制',
          width: 800,
          content: this.copyDetail({
            filename: this.model.get('filename'),
            serverPath: this.model.get('serverPath')
          }),
          onshow: function () {
            Utils.initCopy('#photo-copy-dialog', {
              success: function () {
                if (window['copy' + dialogId]) {
                  window['copy' + dialogId].close().remove();
                }
              }
            });
          }
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
          collection: PhotoCollection,
          model: PhotoModel,
          item: PhotoItem,
          pagination: true,
          pageSize: 16,
          beforeLoad: function () {
            var curAlbumId = app.getData('curAlbumId');
            if (!curAlbumId || curAlbumId === 'all') {
              this.collection._setItemId('all');
              app.addData('curAlbumId', 'all');
            }
          }
        });
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
        this._clear();
        this.collection._setItemId(id);
        this.collection.paginationModel.set('page', 1);
        this._load(this._options);
      },
      search: function (searchKey, searchType) {
        if (Est.isEmpty(searchKey)) {
          this._load({ page: 1, pageSize: 16 });
        } else {
          var key = searchType === 'name'? 'filename': 'serverPath';
          this._search({
            filter: [
              { key: key, value: searchKey }
            ]});
        }
      },
      render: function () {
        this._render();
      }
    });

    module.exports = PhotoList;
  });