/**
 * @description 属性列表显示
 * @namespace AttributesList
 * @author yongjin on 2014/11/16
 */

define('AttributesShow', ['jquery', 'HandlebarsHelper', 'BaseCollection', 'BaseItem', 'BaseList', 'BaseModel', 'template/attributes_show_item'],
  function (require, exports, module) {
    var AttributesShow, model, item, collection, HandlebarsHelper, BaseCollection, BaseItem, BaseList, BaseModel, itemTemp;

    HandlebarsHelper = require('HandlebarsHelper');
    BaseCollection = require('BaseCollection');
    BaseItem = require('BaseItem');
    BaseList = require('BaseList');
    BaseModel = require('BaseModel');
    itemTemp = require('template/attributes_show_item');

    model = BaseModel.extend({
      defaults: Est.extend({ key: '选项', value: '' }, BaseModel.prototype.defaults),
      baseId: 'attId'
    });

    collection = BaseCollection.extend({
      url: function () {
        return CONST.API + '/attr/list/' + this.getCategoryId();
      },
      model: model,
      initialize: function(){
        this._initialize();
      },
      setCategoryId: function (categoryId) {
        this.categoryId = categoryId;
      },
      getCategoryId: function () {
        return this.categoryId;
      }
    });

    item = BaseItem.extend({
      tagName: 'div',
      className: 'control-group',
      events: {
        'change input': 'update',
        'click input[type=checkbox]': 'resetCheckbox'
      },
      initialize: function () {
        this._initialize({
          template: itemTemp
        });
      },
      render: function () {
        this._render();
      },
      resetCheckbox: function () {
        var array = [];
        $("input[type=checkbox]:checked", this.$el).each(function () {
          array.push($(this).val());
        });
        $('input[type=hidden]', this.$el).val(array.join(","));
      },
      update: function () {
        //this.model.set(this.$('input').attr("name").replace('attr-', ''), this.$('input').val());
      }
    });

    AttributesShow = BaseList.extend({
      events: {
        'click .option-add': 'add',
        'click .option-remove': 'remove',
        'click .getItemsBtn': 'getItems'
      },
      initialize: function (options) {
        this.options = options || {};
        if (options.items) {
          this._initialize({
            render: options.render,
            item: item, model: model, collection: collection
          }).then(function (context) {
              Est.each(options.items, function (item) {
                var fields = item.productAttribute;
                fields.element = item.element.substring(1, item.element.length - 1);
                context.collection.push(new model(fields));
              }, this);
            });
        }
        else {
          var opts = {
            render: options.render,
            collection: collection,
            item: item,
            model: model
          }
          this._initialize(opts).then(function (baseListCtx) {
            baseListCtx._initPagination(opts);
            baseListCtx._load({
              beforeLoad: function(collection){
                collection.setCategoryId(options.categoryId);
              }
            });
          });
        }
        return this;
      },
      add: function () {
        this.collection.push(new model());
        if (typeof this.options.add !== 'undefined') {
          this.options.add.call(this);
        }
      },
      remove: function () {
        this.collection.pop();
        this.render();
      },
      reload: function(categoryId){
        this._load({
          beforeLoad: function(){
            this.setCategoryId(categoryId);
          }
        });
      },
      getItems: function () {
        // 转换成[{key: '', value: ''}, ... ] 数组格式
        return Est.pluck(this.collection.models, 'attributes');
      }
    });

    module.exports = AttributesShow;

  });