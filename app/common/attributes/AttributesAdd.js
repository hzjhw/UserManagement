/**
 * @description 添加属性
 * @namespace AttributesAdd
 * @author yongjin on 2014/11/13
 */

define('AttributesAdd', ['jquery', 'HandlebarsHelper', 'BaseCollection', 'BaseItem', 'BaseList', 'BaseModel', 'Est', 'template/attributes_option_template', 'template/attributes_option_item'],
  function (require, exports, module) {
    var AttributesAdd, model, item, collection, HandlebarsHelper, BaseCollection, BaseItem, BaseList, BaseModel, Est, optionItem, optionTemp;

    HandlebarsHelper = require('HandlebarsHelper');
    BaseCollection = require('BaseCollection');
    BaseItem = require('BaseItem');
    BaseList = require('BaseList');
    BaseModel = require('BaseModel');
    Est = require('Est');
    optionItem = require('template/attributes_option_item');
    optionTemp = require('template/attributes_option_template');

    model = BaseModel.extend({
      defaults: { key: '选项', value: '' }
    });

    collection = BaseCollection.extend({
      model: model,
      initialize: function(){
        this._initialize();
      }
    });

    item = BaseItem.extend({
      tagName: 'div',
      className: 'control-group',
      events: {
        'click .delete': '_del',
        'change input': 'update'
      },
      initialize: function () {
        this._initialize({
          template: optionItem
        });
      },
      render: function () {
        this._render();
      },
      update: function () {
        this.model.set(this.$('input').attr("name"), this.$('input').val());
      }
    });

    AttributesAdd = BaseList.extend({
      el: '#multi-attribute',
      events: {
        'click .option-add': 'add',
        'click .option-remove': 'remove'
      },
      initialize: function (options) {
        this.options = options || {};
        this._initialize({
          template: optionTemp,
          collection: collection,
          item: item,
          render: '#attributes-container',
          model: model
        });
        if (options.items) {
          Est.each(options.items, function (item) {
            this.collection.push(new model({
              key: '选项',
              value: item
            }));
          }, this);
        } else {
          this.add();
        }
        return this;
      },
      render: function(){
        this._render();
      },
      add: function () {
        this.collection.push(new model());
        if (typeof this.options.add !== 'undefined') {
          this.options.add.call(this);
        }
      },
      remove: function () {
        this.collection.pop();
        this._render();
      },
      getItems: function () {
        // 转换成[{key: '', value: ''}, ... ] 数组格式
        return Est.pluck(this.collection.models, 'attributes');
      }
    });

    module.exports = AttributesAdd;

  });