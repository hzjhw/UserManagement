/**
 * @description PicturePick
 * @namespace PicturePick
 * @author yongjin<zjut_wyj@163.com> 2014/12/19
 */
define('PicturePick', ['BaseModel', 'BaseCollection', 'BaseItem', 'BaseList', 'template/picture_pick_list', 'template/picture_pick_item', 'BaseUtils'],
  function(require, exports, module){
    var PicturePick, BaseModel, BaseCollection, BaseItem, BaseList, model, collection, item, itemTemp, listTemp, BaseUtils;

    BaseModel = require('BaseModel');
    BaseList = require('BaseList');
    BaseItem = require('BaseItem');
    BaseCollection = require('BaseCollection');
    itemTemp = require('template/picture_pick_item');
    listTemp = require('template/picture_pick_list');
    BaseUtils = require('BaseUtils');

    model = BaseModel.extend({
      defaults: Est.extend({

      }, BaseModel.prototype.defaults),
      initialize: function(){
        this._initialize();
      }
    });

    collection = BaseCollection.extend({
      model: model,
      initialize: function(){
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
          viewId: 'picturePick',
          template: itemTemp
        });
      },
      picUpload: function(type){
        var ctx = this;
        var doResult = function(result){
          alert(result.length);
        }
        type = type || 'local';
        BaseUtils.openUpload({
          id: 'uploadDialog',
          type: type,
          albumId: app.getData('curAlbumId'),
          username: app.getData('user') && app.getData('user').username,
          auto: true,
          oniframeload: function(){
            this.iframeNode.contentWindow.uploadCallback = doResult;
          },
          success: function(){
            var result = this.iframeNode.contentWindow.app.getView('picSource').getItems();
            console.log(result);
            if (result.length > 0){
              ctx.model.set('attId', result[0]['attId']);
              ctx.model.set('serverPath', result[0]['serverPath']);
              ctx.model.set('title', '重新上传');
              ctx.model.set('isAddBtn', false);
              if (!ctx.model.get('hasPic')){
                ctx.model.set('hasPic', true);
                console.log(ctx.model);
                app.getView(ctx._options.viewId).append(new model({
                  serverPath: CONST.PIC_NONE,
                  attId: '',
                  title: '上传图片',
                  isAddBtn: true
                }));
              }
            }
          }
        });
      },
      picUploadSource: function(){
        this.picUpload('sourceUpload');
      },
      render: function(){
        this._render();
      }
    });

    PicturePick = BaseList.extend({
      initialize: function(){
        if (this.options.items.length === 0){
          this.options.items.push({
            attId: '',
            serverPath: CONST.PIC_NONE,
            title: '上传图片',
            isAddBtn: true
          });
        }
        this._initialize({
          collection: collection,
          model: model,
          item: item,
          template: listTemp,
          checkAppend: false,
          render: this.options.render || '.photo-list'
        });
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

    module.exports = PicturePick;
});