/**
 * @description MemberAttribute
 * @namespace MemberAttribute
 * @author wxw on 2014/12/16
 */
define('MemberAttribute', ['jquery', 'MemberAttributeModel', 'BaseCollection', 'BaseItem', 'BaseList', 'HandlebarsHelper',
    'template/member_category','template/member_attribute','template/member_attribute_item'],
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
        'click .edit': '_edit',
        'click .delete': '_del'
      },
      // 初始化
      initialize: function () {
        this._initialize({
          template: memberAttributeItem,
          detail: CONST.HOST + '/modules/member/member_detail.html'
        });
      },
      // 渲染文档
      render: function () {
        this._render();
      }
    });
    /**
     * 列表视图
     */
    MemberAttribute = BaseList.extend({
      el: '#member-data-ul',
      events: {
        'click #toggle-all': '_toggleAllChecked',
        'click .btn-batch-del': '_batchDel',
        'click .memberAttribute-add': '_detail'
      },
      initialize: function () {
        this._initialize({
          render: '#member-list-ul',
          enterRender: '.btn-search',
          template: memberAttribute,
          model: MemberAttributeModel,
          collection: MemberAttributeCollection,
          item: MemberAttributeItem,
          detail: CONST.HOST + '/modules/member/member_detail.html'
        }).then(function (thisCtx) {
          thisCtx._initPagination(thisCtx._options);
          thisCtx._load(thisCtx._options);
        });
      },
      render : function(){
        this._render();
      }
    });

    module.exports = MemberAttribute;
  });