/**
 * @description Picture
 * @namespace Picture
 * @author yongjin on 2014/11/19
 */
define('Picture', ['jquery', 'BaseModel', 'BaseCollection', 'BaseItem', 'BaseList', 'HandlebarsHelper', 'Est', 'template/picture_view', 'template/picture_item'],
  function(require, exports, module){
  var BaseModel, BaseCollection, BaseItem, BaseList, HandlebarsHelper, Est, Picture, model, item, collection, pictureView, pictureItem;

    BaseModel = require('BaseModel');
    BaseCollection = require('BaseCollection');
    BaseItem = require('BaseItem');
    BaseList = require('BaseList');
    HandlebarsHelper = require('HandlebarsHelper');
    pictureView = require('template/picture_view');
    pictureItem = require('template/picture_item');
    Est = require('Est');

    model = BaseModel.extend({
      defaults: {
        src: '',
        name: ''
      },
      validate: function(){
        this._validate();
      }
    });

    collection = BaseCollection.extend({
      model: model,
      url: ''
    });

    item = BaseItem.extend({
      tagName: 'li',
      template: HandlebarsHelper.compile(pictureItem),
      events: {
        'click .del':'_del'
      }
    });

    Picture = BaseList.extend({
      events: {

      },
      initialize: function(options){
        var ctx = this; this.options = options || {};
        model.itemId = options.itemId || null;
        options._isAdd = options._isAdd || false;
        this._initialize({
          template: pictureView,
          render: '#multimage-gallery-ul',
          item: item,
          model: model
        });
        // 输入框
        this.$input = this.$(".tag-combox-input");
        this.$inputHid = this.$(".tag-combox-input-hid");
        this.$picker = this.$("#tag-list-picker");

        return this;
      }
    });

    module.exports = Picture;
});