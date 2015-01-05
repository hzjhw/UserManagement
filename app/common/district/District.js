/**
 * @description Districk
 * @namespace Districk
 * @author yongjin<zjut_wyj@163.com> 2015/1/5
 */
define('District', ['BaseModel', 'BaseCollection', 'BaseItem', 'BaseList', 'template/district_item'],
  function (require, exports, module) {
    var District, BaseModel, BaseCollection, BaseItem, BaseList, model, item, collection, itemTemp;

    BaseModel = require('BaseModel');
    BaseCollection = require('BaseCollection');
    BaseItem = require('BaseItem');
    BaseList = require('BaseList');
    itemTemp = require('template/district_item');

    model = BaseModel.extend({
      defaults: Est.extend({}, BaseModel.prototype.defaults),
      initialize: function(){
        this._initialize();
      }
    });

    collection  = BaseCollection.extend({
      url: CONST.API + '/area/list',
      initialize: function(){
        this._initialize({
          model: model
        });
      }
    });

    item = BaseItem.extend({
      tagName: 'li',
      initialize: function(){
        this._initialize({
          template: itemTemp
        });
      },
      render: function(){
        this._render();
      }
    });


    District = BaseList.extend({
      initialize: function(){
        this._initialize({
          model: model,
          collection: collection,
          item: item
        });
      },
      render: function(){
        this._render();
      }
    });

    module.exports = District;
  });