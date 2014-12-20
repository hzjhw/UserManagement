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
        'click .img-name': 'picUpload'
      },
      initialize: function(){
        this._initialize({
          viewId: 'picturePick',
          template: itemTemp
        });
      },
      picUpload: function(){
        var doResult = function(result){
          alert(result.length);
        }
        BaseUtils.openUpload({
          id: 'uploadDialog',
          albumId: app.getData('curAlbumId'),
          username: app.getData('user') && app.getData('user').username,
          auto: true,
          oniframeload: function(){
            this.iframeNode.contentWindow.uploadCallback = doResult;
          },
          success: function(){
            alert(this.iframeNode.contentWindow.app.getView('picSource').getItems().length);
          }
        });
      },
      render: function(){
        this._render();
      }
    });

    PicturePick = BaseList.extend({
      initialize: function(){
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
      }
    });

    module.exports = PicturePick;
});