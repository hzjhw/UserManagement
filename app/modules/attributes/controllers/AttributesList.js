/**
 * @description 分类属性列表视图
 * @namespace CategoryAttrView
 * @author yongjin on 2014/11/13
 */
define('AttributesList', ['jquery', 'AttributesModel', 'BaseCollection', 'BaseItem', 'BaseList', 'HandlebarsHelper', 'template/attributes_list', 'template/attributes_item'],
  function (require, exports, module) {
    var AttributesModel, BaseCollection, AttributesCollection, AttributesItem, BaseItem, HandlebarsHelper, AttributesList, BaseList, listTemp, itemTemp;

    AttributesModel = require('AttributesModel');
    BaseCollection = require('BaseCollection');
    BaseItem = require('BaseItem');
    BaseList = require('BaseList');
    HandlebarsHelper = require('HandlebarsHelper');
    listTemp = require('template/attributes_list');
    itemTemp = require('template/attributes_item');

    AttributesCollection = BaseCollection.extend({
      url: 'http://jihui88.com/rest/api/attr/list',
      model: AttributesModel,
      initialize: function(){
        this._initialize();
      }
    });

    AttributesItem = BaseItem.extend({
      tagName: 'tr',
      className: 'bui-grid-row',
      events: {
        'click .name': 'editName',
        'click .delete': '_del',
        'click .edit': 'editItem'
      },

      initialize: function () {
        this._initialize({
          template: itemTemp
        });
      },

      render: function () {
        this._render();
      },

      editItem: function () {
        this._edit({
          title: '属性修改',
          url: CONST.HOST + '/modules/attributes/attributes_detail.html?id=' + this.model.id
        });
      },

      editName: function () {
        this._editField({
          title: '修改属性名称',
          field: 'name',
          target: '.name'
        }, this);
      }
    });

    AttributesList = BaseList.extend({
      el: '#jhw-main',
      events: {
        'click #toggle-all': 'toggleAllChecked',
        'click #attributes-add': 'openAddDialog'
      },
      initialize: function () {
        var opts = {
          template: listTemp,
          render: '#attributes-list-ul',
          item: AttributesItem,
          model: AttributesModel,
          collection: AttributesCollection
        };
        this._initialize(opts).then(function(context){
          context._initPagination(opts);
          context._load(opts);
        });
        return this;
      },
      render: function () {
        this._addAll();
      },
      openAddDialog: function () {
        this._detail({
          title: '属性添加',
          url: CONST.HOST + '/modules/attributes/attributes_detail.html?time=' + new Date().getTime()
        });
      }
    });

    module.exports = AttributesList;
  });