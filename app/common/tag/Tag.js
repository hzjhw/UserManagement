/**
 * @description 标签
 * @namespace Tag
 * @author yongjin on 2014/11/18
 */

define('Tag', ['jquery', 'BaseModel', 'BaseCollection', 'BaseItem', 'BaseList', 'HandlebarsHelper', 'Est',
    'template/tag_view', 'template/tag_view_item', 'template/tag_picker_item'],
  function(require, exports, module){
    var Tag, TagList,TagItem, BaseModel, BaseCollection, BaseItem, BaseList, HandlebarsHelper,
      Est, model, collection, item, tagView, tagViewItem, tagPickerItem;

    BaseModel = require('BaseModel');
    BaseCollection = require('BaseCollection');
    BaseItem = require('BaseItem');
    BaseList = require('BaseList');
    HandlebarsHelper = require('HandlebarsHelper');
    Est = require('Est');
    tagView = require('template/tag_view');
    tagViewItem = require('template/tag_view_item');
    tagPickerItem = require('template/tag_picker_item');

    model = BaseModel.extend({
      baseId: 'tagId',
      defaults: {
        name: '默认标签'
      },
      url: function(){
        return Global.API + '/tag/detail'+ (model.itemId ? '/' + model.itemId : '') +
          (this.id ? '/' + this.id : '');
      },
      initialize: function(){
        this.hideTip = true;
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
      template: HandlebarsHelper.compile(tagViewItem),
      events: {
        'click span':'del'
      }
    });

    TagItem = BaseItem.extend({
      tagName: 'li',
      className: 'bui-list-item',
      template: HandlebarsHelper.compile(tagPickerItem),
      events: {
        'click .bui-list-item': 'select',
        'mouseover .bui-list-item': 'mouseover',
        'mouseout .bui-list-item': 'mouseout'
      },
      select: function(){
        $(".bui-combox-input-hid").val(this.model.get('name')).click();
        $("#tag-list-picker").hide();
      },
      mouseover: function(){
        this.$el.addClass('bui-list-item-hover');
      },
      mouseout:function(){
        this.$el.removeClass('bui-list-item-hover');
      }
    });
    TagList = BaseList.extend({
      el: '#tag-list-picker',
      initialize: function(options){
        var ctx = this;
        this.list = $("#tag-list-picker-ul")
        this.initCollection(collection, TagItem, ctx, {
          beforeLoad: function(){
            this.setTagType(options.tagType || 'product');
          }
        }).then(function(options){
          ctx.load(options);
        });
        return this;
      }

    });

    Tag = BaseList.extend({
      events: {
        'keyup .tag-combox-input': 'add',
        'click .tag-combox-input': 'showPicker',
        'click .tag-combox-input-hid': 'addHid'
      },
      initialize: function(options){
        var ctx = this; this.options = options || {};
        model.itemId = options.itemId || null;
        options._isAdd = options._isAdd || false;

        // 初始化视图
        this.initView({
          viewTemp: tagView,
          collectionId: '#tag-list-ul'
        });
        // 初始化容器
        this.initCollection(collection, item, this, {
          beforeLoad: function () {
            this.setItemId(ctx.options.itemId || null);
            this.setTagType(ctx.options.tagType || 'product');
          }
        }).then(function (options) {
          if (!ctx.options._isAdd){
            ctx.load(options);
          }
        });
        // 输入框
        this.$input = this.$(".tag-combox-input");
        this.$inputHid = this.$(".tag-combox-input-hid");
        this.$picker = this.$("#tag-list-picker");

        return this;
      },
      setOption: function(options){

      },
      add: function(e){
        if (e.keyCode === 13){
          this.insert(this.$input.val());
        } return false;
      },
      addHid: function(){
        this.insert(this.$inputHid.val());
      },
      insert: function(inputVal){
        var ctx = this;
        var newModel, filter;

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
        this.hidePicker();
      },
      hidePicker: function(){
        $("#tag-list-picker").hide();
      },
      showPicker: function(){
        if (!this.tagList){
          this.tagList = new TagList(this.options, this);
        }
        this.$picker.css({
          left: this.$input.offset().left,
          top: this.$input.offset().top + 37
        }).show();
      }
    });

    module.exports = Tag;
});
