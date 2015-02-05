/**
 * @description 属性列表显示
 * @namespace MemberAttributesShow
 * @author yongjin on 2014/11/16
 */

define('MemberAttributesShow', ['jquery', 'HandlebarsHelper', 'Utils', 'BaseCollection', 'BaseItem', 'BaseList', 'BaseModel', 'template/member_attributes_show_item'],
  function (require, exports, module) {
    var MemberAttributesShow, model, item, collection, HandlebarsHelper, Utils, BaseCollection, BaseItem, BaseList, BaseModel, itemTemp;

    HandlebarsHelper = require('HandlebarsHelper');
    BaseCollection = require('BaseCollection');
    BaseItem = require('BaseItem');
    BaseList = require('BaseList');
    BaseModel = require('BaseModel');
    itemTemp = require('template/member_attributes_show_item');
    Utils = require('Utils');

    model = BaseModel.extend({
      defaults: Est.extend({ key: '选项', value: '' }, BaseModel.prototype.defaults),
      baseId: 'attId'
    });

    collection = BaseCollection.extend({
      url: CONST.API + '/member/attr/list',
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

    MemberAttributesShow = BaseList.extend({
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
              item: item,
              model: model,
              collection: collection,
              items: options.items,
              afterLoad: function () {
                this.itemRender(options);
                this.after();
              }
            }
          )
          ;
        }
        else {
          this._initialize({
            render: options.render,
            collection: collection,
            item: item,
            model: model,
            filter: [ {key: 'isEnabled', value: '01' }],
            afterLoad: function () {
              this.after();
            }
          });
        }
      },
      render: function () {
        this._render();
      },
      itemRender: function (options) {
        Est.each(options.items, function (item) {
          var fields = item.att;
          if (item.att.isEnabled === '01'){
            fields.element = item.element.substring(1, item.element.length - 1);
            this.collection.push(new model(fields));
          }
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
        var ctx = this;
        this._load({
          beforeLoad: function (collection) {
            collection.setCategoryId(categoryId);
          }
        }).then(function () {
          ctx.after();
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
    })
    ;

    module.exports = MemberAttributesShow;

  })
;