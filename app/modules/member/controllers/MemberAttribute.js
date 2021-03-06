/**
 * @description MemberAttribute
 * @namespace MemberAttribute
 * @author wxw on 2014/12/16
 */
define('MemberAttribute', ['jquery', 'MemberAttributeModel', 'BaseCollection', 'BaseItem', 'BaseList', 'HandlebarsHelper',
    'template/member_attribute','template/member_attribute_item'],
  function (require, exports, module) {
    var MemberAttributeModel, BaseCollection, BaseItem, BaseList, HandlebarsHelper, MemberAttributeCollection
      , MemberAttribute , memberAttribute, memberAttributeItem ,MemberAttributeItem;

    MemberAttributeModel = require('MemberAttributeModel');
    BaseCollection = require('BaseCollection');
    BaseItem = require('BaseItem');
    BaseList = require('BaseList');
    HandlebarsHelper = require('HandlebarsHelper');
    //分类
    memberAttribute = require('template/member_attribute');
    memberAttributeItem = require('template/member_attribute_item');
    /**
     * 集合类
     */
    MemberAttributeCollection = BaseCollection.extend({
      url: CONST.API + '/member/attr/list',
      model: MemberAttributeModel,
      initialize: function () {
        this._initialize();
      }
    });
    /**
     * 单视图
     */
    MemberAttributeItem = BaseItem.extend({
      tagName: 'tr',
      className: 'bui-grid-row',
      events: {
        'click .toggle': '_toggleChecked',
        'click .edit': 'edit',
        'click .delete': '_del',
        'click .member-attr-add': 'detail'
      },
      // 初始化
      initialize: function () {
        this._initialize({
          template: memberAttributeItem,
          detail: CONST.HOST + '/modules/member/member_attribute_detail.html'
        });
      },
      edit: function () {
        this._navigate('#/member_attr_edit/' + this.model.get('id'), true);
      },
      // 渲染文档
      render: function () {
        this._render();
      },
      detail : function(){
        this._detail({

        })
      }
    });
    /**
     * 列表视图
     */
    MemberAttribute = BaseList.extend({
      events: {
        'click #toggle-all': '_toggleAllChecked',
        'click .member-attr-add': 'add',
        'click .btn-batch-del': '_batchDel'

      },
      initialize: function () {
        this._initialize({
          render: '#member-list-ul',
          enterRender: '.btn-search',
          template: memberAttribute,
          model: MemberAttributeModel,
          collection: MemberAttributeCollection,
          item: MemberAttributeItem,
          detail: CONST.HOST + '/modules/member/member_attribute_detail.html'
        });
      },
      add: function () {
        this._navigate('#/member_attr_add', true);
      },
      render : function(){
        this._render();
      },
      detail : function(){
        this._detail({
          height:350
        })
      }
    });

    module.exports = MemberAttribute;
  });