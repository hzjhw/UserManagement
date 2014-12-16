/**
 * @description MemberList
 * @namespace MemberList
 * @author WXW on 2014/12/16
 */
define('MemberList', ['jquery', 'MemberListModel', 'BaseCollection', 'BaseItem', 'BaseList', 'HandlebarsHelper',
    'template/member_category','template/member_list','template/member_list_item'],
  function (require, exports, module) {
    var MemberListModel, BaseCollection, BaseItem, BaseList, HandlebarsHelper, MemberListCollection
      , MemberList , memberCategory, memberList, memberListItem ,MemberListItem;

    MemberListModel = require('MemberListModel');
    BaseCollection = require('BaseCollection');
    BaseItem = require('BaseItem');
    BaseList = require('BaseList');
    HandlebarsHelper = require('HandlebarsHelper');
    //三分类
    memberCategory = require('template/member_category');
    memberList = require('template/member_list');
    memberListItem = require('template/member_list_item');
    /**
     * 集合类
     */
    MemberListCollection = BaseCollection.extend({
      url: CONST.API + '/member/list',
      model: MemberListModel,
      initialize: function () {
        this._initialize();
      }
    });
    /**
     * 单视图
     */
    MemberListItem = BaseItem.extend({
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
          template: memberListItem,
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
    MemberList = BaseList.extend({
      el: '#member-data-ul',
      events: {
        'click #toggle-all': '_toggleAllChecked',
        'click .btn-batch-del': '_batchDel',
        'click .member-add': '_detail',
        'click .btn-search': 'search'
      },
      initialize: function () {
        this._initialize({
          render: '#member-list-ul',
          enterRender: '.btn-search',
          template: memberList,
          model: MemberListModel,
          collection: MemberListCollection,
          item: MemberListItem,
          detail: CONST.HOST + '/modules/member/member_detail.html'
        }).then(function (thisCtx) {
          thisCtx._initPagination(thisCtx._options);
          thisCtx._load(thisCtx._options);
        });
      },
      render : function(){
        this._render();
      },
      // 简单搜索
      search: function () {
        this.searchKey = Est.trim(this.$('.search-text').val());
        if (Est.isEmpty(this.searchKey)) {
          this._load({ page: 1, pageSize: 16 });
        } else {
          this._search({
            filter: [
              {key: 'name', value: this.searchKey }
            ]
          });
        }
      },
    });

    module.exports = MemberList;
  });