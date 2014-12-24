/**
 * @description WwyPicturePick
 * @namespace WwyPicturePick
 * @author yongjin<zjut_wyj@163.com> 2014/12/24
 */
define('WwyPicturePick', ['BaseModel', 'BaseCollection', 'BaseItem', 'BaseList', 'BaseUtils', 'template/wwy_picture_pick_list', 'template/wwy_picture_pick_item'],
  function (require, exports, module) {
    var WwyPicturePick, BaseModel, BaseCollection, BaseItem, BaseUtils, BaseList, model, collection, item, itemTemp, listTemp;

    BaseModel = require('BaseModel');
    BaseCollection = require('BaseCollection');
    BaseItem = require('BaseItem');
    BaseList = require('BaseList');
    BaseUtils = require('BaseUtils');
    itemTemp = require('template/wwy_picture_pick_item');
    listTemp = require('template/wwy_picture_pick_list');

    model = BaseModel.extend({
      defaults: Est.extend({

      }, BaseModel.prototype.defaults),
      initialize: function () {
        this._initialize();
      }
    });

    collection = BaseCollection.extend({
      model: model,
      initialize: function () {
        this._initialize();
      }
    });

    item = BaseItem.extend({
      tagName: 'div',
      className: 'item',
      events: {
        'click .delete': '_del', // 删除
        'click .move-up': '_moveUp', // 上移
        'click .move-down': '_moveDown', // 下移
        'click .img-name': 'picUpload',
        'click .upload-local': 'picUpload',
        'click .upload-source': 'picUploadSource'
      },
      initialize: function(){
        this._initialize({
          template: itemTemp
        });
      },
      picUpload: function(type){
        var ctx = this;
        type = type || 'local';
        BaseUtils.openUpload({
          id: 'uploadDialog',
          type: type,
          albumId: app.getData('curAlbumId'),
          username: app.getData('user') && app.getData('user').username,
          auto: true,
          oniframeload: function(){
            this.iframeNode.contentWindow.uploadCallback = function(result){
              ctx.addItems(result);
            };
          },
          success: function(){
            var result = this.iframeNode.contentWindow.app.getView('picSource').getItems();
            ctx.addItems(result);
          }
        });
      },
      addItems: function(result){
        if (result.length > 0){
          this.model.set('attId', result[0]['attId']);
          this.model.set('serverPath', result[0]['serverPath']);
          this.model.set('title', '重新上传');
          this.model.set('isAddBtn', false);
          if (!this.model.get('hasPic')){
            this.model.set('hasPic', true);
            app.getView(this._options.viewId).addOne();
          }
        }
        window['uploadDialog'].close().remove();
      },
      picUploadSource: function(){
        this.picUpload('sourceUpload');
      },
      render: function(){
        this._render();
      }
    });

    WwyPicturePick = BaseList.extend({
      initialize: function(){
        this._initialize({
          collection: collection,
          model: model,
          item: item,
          template: listTemp,
          checkAppend: false
        }).then(function(thisCtx){
          if (thisCtx.collection.models.length === 1 ||
            !thisCtx.options._isAdd){
            thisCtx.addOne();
          }
        });
      },
      addOne: function(){
        this.collection.push(new model({
          serverPath: CONST.PIC_NONE,
          attId: '',
          title: '上传图片',
          isAddBtn: true
        }));
      },
      render: function(){
        this._render();
      },
      append: function(node){
        this.collection.add(node);
        BaseUtils.resetIframe();
      },
      getItems: function(){
        var result = [];
        Est.each(this.collection.models, function(item){
          if (!item.get('isAddBtn') && !Est.isEmpty(item.get('attId'))){
            result.push({
              attId: item.get('attId'),
              serverPath: item.get('serverPath')
            });
          }
        });
        return result;
      }
    });

    module.exports = WwyPicturePick;
  });