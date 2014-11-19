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
        name: '默认标签'
      },
      url: function(){
        return Global.API + '/tag/detail'+ (model.itemId ? '/' + model.itemId : '');
      }
    });

    collection = BaseCollection.extend({
      model: model,
      url: function(){
        return this.itemId ? Global.API +
          Global.SEP+ this.tagType + '/detail/' + this.itemId + '/tag?pageSize=1000' :
          Global.API +  '/tag/' + this.tagType + '?pageSize=1000';
      },
      setItemId: function(itemId){
        this.itemId = itemId;
      },
      setTagType: function(tagType){
        this.tagType = tagType;
      }
    });

    item = BaseItem.extend({
      tagName: 'li',
      className: 'bui-list-item',
      template: HandlebarsHelper.compile($("#tag-item-template").html()),
      events: {
        'click button':'del'
      }
    });

    Tag = BaseList.extend({
      el: '#tag-box',
      events: {
        'keyup .bui-combox-input': 'add'
      },
      initialize: function(options){
        var ctx = this; options = options || {};
        model.itemId = options.itemId || null;

        // 初始化视图
        this.initView({
          viewTemp: $("#tag-template").html(),
          collectionId: '#tag-list-ul'
        });
        // 初始化容器
        this.initCollection(collection, item, this, {
          beforeLoad: function () {
            this.setItemId(options.itemId || null);
            this.setTagType(options.tagType || 'product');
          }
        }).then(function (options) {
          ctx.load(options);
        });
        // 输入框
        this.$input = this.$(".bui-combox-input");

        return this;
      },
      setOption: function(options){

      },
      add: function(e){
        var ctx = this;
        var inputVal, newModel, filter;
        if (e.keyCode === 13){
          inputVal = this.$input.val();
          if (Est.isEmpty(Est.trim(inputVal))) return;
          filter = this.collection.filter(function(model){
            return model.get('name') === inputVal;
          });
          if (filter.length > 0) {
            filter[0].view.$el.addClass('bui-list-item-active');
            setTimeout(function(){
              filter[0].view.$el.removeClass('bui-list-item-active');
            }, 800);
            this.$input.val('');
            return;
          };
          newModel = new model({
            name: inputVal
          });
          newModel.save(null, {
            wait: true,
            success: function(){
              ctx.collection.push(newModel);
            }
          });
          this.$input.val('');
        }

        return false;
      }
    });

    module.exports = Tag;
});
