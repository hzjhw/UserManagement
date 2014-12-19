/**
 * @description 分类属性列表视图
 * @namespace CategoryAttrView
 * @author yongjin on 2014/11/13
 */
define('AttributesList', ['jquery', 'AttributesModel','AttributesShow', 'BaseCollection', 'BaseItem', 'BaseList', 'HandlebarsHelper', 'template/attributes_list', 'template/attributes_item'],
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
      url: function(){
        var url = CONST.API + '/attr/list';
        if (Est.isEmpty(app.getData('attrCategoryId'))){
          return url;
        }
        return CONST.API + '/attr/list/' + app.getData('attrCategoryId');
      },
      model: AttributesModel,
      initialize: function(){
        this._initialize();
      }
    });

    AttributesItem = BaseItem.extend({
      tagName: 'tr',
      className: 'bui-grid-row',
      events: {
        'click .toggle': '_toggleChecked',
        'click .edit': '_edit',
        'click .delete': '_del',
        'click .move-up': '_moveUp',
        'click .move-down': '_moveDown',
        'click .name': 'editName',
        'change .input-sort': 'changeSort'
      },
      initialize: function () {
        this._initialize({
          template: itemTemp,
          itemId: 'attributesList',
          detail: CONST.HOST + '/modules/attributes/attributes_detail.html'
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
      }
    });

    AttributesList = BaseList.extend({
      el: '#jhw-main',
      events: {
        'click #toggle-all': '_toggleAllChecked',
        'click .attributes-add': 'openAddDialog',
        'click .attributes-show': 'attributesShow'
      },
      initialize: function () {
        //app.addView('attributesShow', new AttributesShow({ render: '#attributes-list-ul', categoryId:Est.getUrlParam('id', window.location.href)}));
        app.setData('attrCategoryId', Est.getUrlParam('id', window.location.href));
        this._initialize({
          template: listTemp,
          render: '#attributes-list-ul',
          item: AttributesItem,
          model: AttributesModel,
          collection: AttributesCollection
        }).then(function(thisCtx){
          thisCtx._initPagination(thisCtx._options);
          thisCtx._load(thisCtx._options);
        });
      },
      render: function () {
        this._render();
      },
      attributesShow: function(){
        this._detail({
          title: '效果浏览',
          url: CONST.HOST + '/modules/attributes/attributes_show.html?categoryId=' + app.getData('attrCategoryId'),
          hideSaveBtn: true,
          hideResetBtn: true
        });
      },
      openAddDialog: function () {
        this._detail({
          title: '属性添加',
          height: 300,
          url: CONST.HOST + '/modules/attributes/attributes_detail.html?categoryId=' + app.getData('attrCategoryId')
        });
      }
    });

    module.exports = AttributesList;
  });