/**
 * @description MemberList
 * @namespace MemberList
 * @author wxw on 2014/12/16
 */
define('MemberList', ['jquery', 'MemberListModel', 'BaseCollection', 'BaseItem', 'BaseList', 'HandlebarsHelper'
    , 'template/member_list', 'template/member_list_item', 'template/member_search', 'Service'],
  function (require, exports, module) {
    var MemberListModel, BaseCollection, BaseItem, BaseList, HandlebarsHelper, MemberListCollection
      , MemberList, memberList, memberListItem , MemberListItem , searchTemp , Service;

    MemberListModel = require('MemberListModel');
    BaseCollection = require('BaseCollection');
    BaseItem = require('BaseItem');
    BaseList = require('BaseList');
    HandlebarsHelper = require('HandlebarsHelper');
    searchTemp = require('template/member_search');
    memberList = require('template/member_list');
    memberListItem = require('template/member_list_item');
    Service = require('Service');
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
        'click .edit': 'edit',
        'click .delete': '_del'
      },
      // 初始化
      initialize: function () {
        this._initialize({
          template: memberListItem,
          detail: CONST.HOST + '/modules/member/member_list_detail.html'
        });
      },
      edit: function () {
        this._navigate('#/member_edit/' + this.model.get('id'), true);
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
      events: {
        'click #toggle-all': '_toggleAllChecked',
        'click .btn-batch-del': '_batchDel',
        'click .member-list-add': 'add',
        'click .btn-member-rank': 'memberRank',
        'click .btn-member-attr': 'memberAttr',
        'click .btn-search': 'search',
        'click .search-advance': 'searchAdvance'
      },
      initialize: function () {
        this._initialize({
          render: '#member-list-ul',
          enterRender: '.btn-search',
          template: memberList,
          model: MemberListModel,
          collection: MemberListCollection,
          item: MemberListItem,
          pagination: true,
          detail: CONST.HOST + '/modules/member/member_list_detail.html'
        });
      },
      add: function () {
        this._navigate('#/member_add', true);
      },
      memberRank: function () {
        this._navigate('#/member/rank', true);
      },
      memberAttr: function () {
        this._navigate('#/member/attr', true);
      },
      render: function () {
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
              {key: 'username', value: this.searchKey }
            ]
          });
        }
      },
      // 高级搜索
      searchAdvance: function () {
        var ctx = this;
        this.searchTemp = HandlebarsHelper.compile(searchTemp);
        if (!app.getData('memberCategory')) {
          Service.getMemberRankCategory({ tree: true, extend: true, select: true })
            .then(function (list) {
              app.addData('memberCategory', list);
            })
        }
        seajs.use(['dialog-plus'], function (dialog) {
          window.dialog = dialog;
          ctx.searchDialog = dialog({
            id: 'search-dialog',
            title: '高级搜索',
            width: 650,
            content: ctx.searchTemp({
              memberCategoryList: app.getData('memberCategory')
            }),
            button: [
              {
                value: '搜索',
                callback: function () {
                  ctx.searchKey = $('input[name=searchKey]').val();
                  ctx.searchMemberRank = $('select[name=searchMemberRank]').val();
                  ctx._search({
                    filter: [
                      {key: 'username', value: ctx.searchKey },
                      {key: 'memberRank.rankId', value: ctx.searchMemberRank === '/' ? '' : ctx.searchMemberRank}
                    ]
                  });
                  this.remove();
                  return false;
                },
                autofocus: true
              },
              { value: '关闭' }
            ],
            oniframeload: function () {
              this.iframeNode.contentWindow.searchDialog = ctx.searchDialog;
            },
            onclose: function () {
              this.remove();
              if (this.returnValue) {
                $('#value').html(this.returnValue);
              }
            }
          }).show(this.$('.search-advance').get(0));
        });
      }
    });

    module.exports = MemberList;
  });