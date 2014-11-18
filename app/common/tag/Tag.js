/**
 * @description 标签
 * @namespace Tag
 * @author yongjin on 2014/11/18
 */

define('Tag', ['jquery', 'BaseModel', 'BaseCollection', 'BaseItem', 'BaseList', 'HandlebarsHelper', 'Est'],
  function(require, exports, module){
    var Tag, BaseModel, BaseCollection, BaseItem, BaseList, HandlebarsHelper, Est, model, collection, item;

    BaseModel = require('BaseModel');
    BaseCollection = require('BaseCollection');
    BaseItem = require('BaseItem');
    BaseList = require('BaseList');
    HandlebarsHelper = require('HandlebarsHelper');
    Est = require('Est');

    model = BaseModel.extend({
      baseId: 'tagId',
      defaults: {
        name: '默认标签',
        tagId: ''
      },
      url: 'http://jihui88.com/rest/api/tag/detail'
    });

    collection = BaseCollection.extend({
      url: 'http://jihui88.com/rest/api/tag/product',
      model: model
    });

    item = BaseItem.extend({
      tagName: 'li',
      className: 'bui-list-item',
      template: HandlebarsHelper.compile($("#tag-item-template").html()),
      events: { }
    });

    Tag = BaseList.extend({
      el: '#tag-box',
      events: {
        'keyup .bui-combox-input': 'add'
      },
      initialize: function(){
        var ctx = this;
        this.initView({
          viewTemp: $("#tag-template").html(),
          collectionId: '#tag-list-ul'
        });
        this.initCollection(collection, item, this, {})
          .then(function (options) {
            ctx.load(options);
          });
        return this;
      },
      add: function(e){
        if (e.keyCode === 13){
          console.dir('e');
        }
        return false;
      }
    });

    module.exports = Tag;
});
