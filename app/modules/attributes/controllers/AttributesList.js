/**
 * @description 分类属性列表视图
 * @namespace CategoryAttrView
 * @author yongjin on 2014/11/13
 */
define('AttributesList', ['jquery', 'AttributesModel', 'AttributesShow', 'BaseCollection', 'BaseItem', 'BaseList', 'HandlebarsHelper', 'template/attributes_list', 'template/attributes_item'],
  function (require, exports, module) {
    var AttributesModel, BaseCollection, AttributesCollection, AttributesShow, AttributesItem, BaseItem, HandlebarsHelper, AttributesList, BaseList, listTemp, itemTemp;

    AttributesModel = require('AttributesModel');
    BaseCollection = require('BaseCollection');
    BaseItem = require('BaseItem');
    BaseList = require('BaseList');
    HandlebarsHelper = require('HandlebarsHelper');
    listTemp = require('template/attributes_list');
    itemTemp = require('template/attributes_item');
    AttributesShow = require('AttributesShow');

    AttributesCollection = BaseCollection.extend({
      url: function () {
        var url = CONST.API + '/attr/list';
        if (Est.isEmpty(app.getData('attrCategoryId'))) {
          return url;
        }
        return CONST.API + '/attr/list/' + app.getData('attrCategoryId');
      },
      model: AttributesModel,
      initialize: function () {
        this._initialize();
      }
    });

    AttributesItem = BaseItem.extend({
      tagName: 'tr',
      className: 'bui-grid-row',
      events: {
        'click .toggle': '_toggleChecked',
        'click .edit': 'edit',
        'click .delete': '_del',
        'click .move-up': '_moveUp',
        'click .move-down': '_moveDown',
        'click .name': 'editName',
        'change .input-sort': 'changeSort'
      },
      initialize: function () {
        this._initialize({
          template: itemTemp,
          itemId: 'attributesList'
        });
      },
      // 属性修改
      edit: function () {
        this._dialog({
          moduleId: 'AttributesDetail',
          title: '属性修改',
          id: this.model.get('attId'),
          width: 650,
          onClose: Est.proxy(function () {
            this.model.set(app.getModels().pop());
          }, this)
        });
      },
      editName: function () {
        this._editField({
          title: '修改属性名称',
          field: 'name',
          target: '.name'
        }, this);
      },
      changeSort: function () {
        var sort = this.$('.input-sort').val();
        this.model._saveField({ id: this.model.get('id'), orderList: sort
        }, this, { success: Est.proxy(function () {
          this.model.set('orderList', sort);
        }, this), hideTip: true
        });
      },
      moveUp: function () {
        app.getView('attributesList')._setOption({
          sortField: 'orderList'
        })._moveUp(this.model);
      },
      moveDown: function () {
        app.getView('attributesList')._setOption({
          sortField: 'orderList'
        })._moveDown(this.model);
      },
      render: function () {
        this._render();
      }
    });

    AttributesList = BaseList.extend({
      events: {
        'click #toggle-all': '_toggleAllChecked',
        'click .attributes-add': 'openAddDialog',
        'click .attributes-show': 'attributesShow'
      },
      initialize: function () {
        app.addData('attrCategoryId', Est.getUrlParam('categoryId', window.location.href));
        this._initialize({
          template: listTemp,
          render: '#attributes-list-ul',
          item: AttributesItem,
          model: AttributesModel,
          collection: AttributesCollection,
          pagination: true
        });
      },
      render: function () {
        this._render();
      },
      // 属性浏览
      attributesShow: function () {
        this._dialog({
          moduleId: 'AttributesShow',
          title: '属性浏览',
          skin: 'form-horizontal',
          categoryId: app.getData('attrCategoryId'),
          width: 800
        });
      },
      // 属性添加
      openAddDialog: function () {
        this._dialog({
          moduleId: 'AttributesDetail',
          title: '属性添加',
          categoryId: app.getData('attrCategoryId'),
          width: 650,
          onClose: Est.proxy(function () {
            this._reload();
          }, this)
        });
      }
    });

    module.exports = AttributesList;
  });