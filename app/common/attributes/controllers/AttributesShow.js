/**
 * @description 属性列表显示
 * @namespace AttributesList
 * @author yongjin on 2014/11/16
 */

define('AttributesShow', ['jquery', 'HandlebarsHelper', 'Utils', 'BaseCollection', 'BaseItem', 'BaseList', 'BaseModel', 'template/attributes_show_item'],
  function (require, exports, module) {
    var AttributesShow, model, item, collection, HandlebarsHelper, Utils, BaseCollection, BaseItem, BaseList, BaseModel, itemTemp;

    HandlebarsHelper = require('HandlebarsHelper');
    BaseCollection = require('BaseCollection');
    BaseItem = require('BaseItem');
    BaseList = require('BaseList');
    BaseModel = require('BaseModel');
    itemTemp = require('template/attributes_show_item');
    Utils = require('Utils');

    model = BaseModel.extend({
      defaults: Est.extend({ key: '选项', value: '' }, BaseModel.prototype.defaults),
      baseId: 'attId'
    });

    collection = BaseCollection.extend({
      url: CONST.API + '/attr/list',
      /* url: function () {
       var categoryId = this._itemId ? this._itemId : 'all';
       return this.options.data.url || CONST.API + '/attr/list/' + categoryId;
       },*/
      model: model,
      initialize: function () {
        this._initialize();
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
        if (options.items) {
          /*options.defaultItems = Est.cloneDeep(options.items, function () {
           }, this);
           options.defaultItemId = options.categoryId;*/
          this._initialize({
            render: options.render,
            item: item,
            model: model,
            collection: collection,
            clearDialog: false,
            beforeLoad: function () {
              this.collection.url = null;
              this._clear();
            },
            afterLoad: function () {
              this.itemRender(options, this);
              this.after();
            }
          });
        }
        else {
          if (!this.options.categoryId) this.options.categoryId = '/';
          this._initialize({
            render: options.render,
            collection: collection,
            item: item,
            model: model,
            clearDialog: false,
            data: {
              url: this.options && this.options.url
            },
            beforeLoad: function () {
              this.collection._setItemId(this.options.categoryId);
              this._clear();
            },
            afterLoad: function () {
              this.after();
            }
          });
        }
      },
      render: function () {
        this._render();
      },
      itemRender: function (options, context) {
        Est.each(options.items, function (item) {
          var fields = item.productAttribute;
          /*if (/^\"\[.*\"\]$/.test(item.element)){
           fields.element = item.element.substring(2, item.element.length - 2);
           } else{
           fields.element = item.element;
           }*/
          fields.element = item.element.replace(/[\"\[\]]/g, '');
          context.collection.push(new model(fields));
        }, this);
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
      reload: function (categoryId) {
        /*if (this._options.defaultItemId === categoryId)
         this._options.items = Est.cloneDeep(this._options.defaultItems, function () {
         }, this);*/
        this._options.items = null;
        if (Est.typeOf(categoryId) === 'array'){
          this._options.items = categoryId;
        }
        this._clear();
        if (!categoryId) return;
        this._load({
          beforeLoad: function (collection) {
            if (categoryId && categoryId !== '/' && !this._options.items) {
              this.collection.url = CONST.API + '/attr/list';
              collection._setItemId(categoryId);
            }
          },
          afterLoad: function (result) {
            this.after();
          }
        });
      },
      after: function () {
        Utils.initDate({
          render: '.calendar',
          showTime: false
        });
        Utils.resetIframe();
      },
      getItems: function () {
        // 转换成[{key: '', value: ''}, ... ] 数组格式
        return Est.pluck(this.collection.models, 'attributes');
      }
    });

    module.exports = AttributesShow;

  });