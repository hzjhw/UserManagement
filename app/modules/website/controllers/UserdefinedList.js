/**
 * @description UserdefinedList
 * @namespace UserdefinedList
 * @author yongjin<zjut_wyj@163.com> 2014/12/26
 */
define('UserdefinedList', ['jquery', 'UserdefinedModel', 'BaseCollection', 'BaseItem', 'BaseList', 'HandlebarsHelper', 'template/userdefined_list', 'template/userdefined_item'],
  function (require, exports, module) {
    var UserdefinedModel, BaseCollection, UserdefinedCollection, UserdefinedItem, BaseItem, HandlebarsHelper, UserdefinedList, BaseList, listTemp, itemTemp;

    UserdefinedModel = require('UserdefinedModel');
    BaseCollection = require('BaseCollection');
    BaseItem = require('BaseItem');
    BaseList = require('BaseList');
    HandlebarsHelper = require('HandlebarsHelper');
    listTemp = require('template/userdefined_list');
    itemTemp = require('template/userdefined_item');

    UserdefinedCollection = BaseCollection.extend({
      url: function(){
        var url = CONST.API + '/userdefined02/list';
        if (Est.isEmpty(this.options.data.page)){
          return url;
        }
        return url + '?searchPage=' + this.options.data.page;
      },
      model: UserdefinedModel,
      initialize: function(){
        this._initialize();
      }
    });

    UserdefinedItem = BaseItem.extend({
      tagName: 'tr',
      className: 'bui-grid-row',
      events: {
        'click .toggle': '_toggleChecked',
        'click .edit': '_edit',
        'click .delete': '_del',
        'click .name': 'editName',
        'change .input-sort': 'changeSort'
      },
      initialize: function () {
        this._initialize({
          template: itemTemp,
          model: UserdefinedModel,
          detail: CONST.HOST + '/modules/website/userdefined_detail.html'
        });
      },
      render: function () {
        this._render();
      },
      editName: function () {
        this._editField({
          title: '修改属性名称',
          field: 'name',
          target: '.name'
        }, this);
      },
      changeSort: function () {
        var ctx = this;
        var sort = this.$('.input-sort').val();
        this.model._saveField({ id: this.model.get('id'), orderList: sort
        }, ctx, { success: function () {
          ctx.model.set('orderList', sort);
        }, hideTip: true
        });
      }
    });

    UserdefinedList = BaseList.extend({
      el: '#jhw-main',
      events: {
        'click #toggle-all': '_toggleAllChecked',
        'click .attributes-add': 'openAddDialog',
        'click .attributes-show': 'attributesShow'
      },
      initialize: function () {
        this._initialize({
          template: listTemp,
          render: '#attributes-list-ul',
          item: UserdefinedItem,
          model: UserdefinedModel,
          collection: UserdefinedCollection
        }).then(function(thisCtx){
          thisCtx._load(thisCtx._options);
        });
      },
      render: function () {
        this._render();
      },
      openAddDialog: function () {
        this._detail({
          title: '属性添加',
          height: 300,
          url: CONST.HOST + '/modules/attributes/attributes_detail.html?categoryId=' + app.getData('attrCategoryId')
        });
      }
    });

    module.exports = UserdefinedList;
  });