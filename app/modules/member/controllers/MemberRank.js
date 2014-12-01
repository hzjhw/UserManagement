/**
 * @description ProductList
 * @namespace ProductList
 * @author yongjin on 2014/11/16
 */
define('MemberRank', ['jquery', 'MemberModel', 'BaseCollection', 'BaseItem', 'BaseList', 'HandlebarsHelper',
    'template/member_rank', 'template/member_rank_detail', 'Est','template/member_edit'],
  function (require, exports, module) {
    var MemberModel, BaseCollection, BaseItem, BaseList, HandlebarsHelper, Est, MemberRank, MemberRankDetail, MemberRankCollection, member_rank, member_rank_detail;

    MemberModel = require('MemberModel');
    BaseCollection = require('BaseCollection');
    BaseItem = require('BaseItem');
    BaseList = require('BaseList');
    HandlebarsHelper = require('HandlebarsHelper');
    member_rank = require('template/member_rank');
    member_rank_detail = require('template/member_rank_detail');
    Est = require('Est');
    //member_edit = require('template/member_edit');

    /**
     * 集合类
     */
    MemberRankCollection = BaseCollection.extend({
      url: global.API + '/member/rank/list',
      model: MemberModel,
      initialize: function () {
        this._initialize();
      }
    });
    /**
     * 单视图
     */
    MemberRankDetail = BaseItem.extend({
      tagName: 'tr',
      className: 'bui-grid-row',
      events: {
        'click .name': 'editName',
        'click .edit': 'editItem',
        'click .delete': '_del'
      },
      // 初始化
      initialize: function () {
        this._initialize({ template: member_rank_detail });
      },
      // 渲染
      render: function () {
        this._render();
      },
      // 编辑会员
      editItem: function () {
        var url = global.HOST + '/modules/member/member_edit.html?rankId='
          + this.model.id;
        var options = { title: '会员修改', url: url }
        this._edit(options);
      },
      // 编辑名称
      editName: function () {
        var options = { title: '修改名称', field: 'name', target: '.name' };
        this._editField(options, this);
      }
    });
    /**
     * 列表视图
     */
    MemberRank = BaseList.extend({
      el: '#member-list',
      events: {
        'click #toggle-all': '_toggleAllChecked',
        'click .product-add': 'openAddDialog'
      },
      // 初始化
      initialize: function () {
        var options = {
          render: '#member_rank_detail',
          template: member_rank,
          model: MemberModel,
          collection: MemberRankCollection,
          item: MemberRankDetail
        }
        this._initialize(options).then(function (context) {
          // 加载分页
          context._initPagination(options);
          // 加载数据
          context._load(options);
        });
      },
      // 添加会员对话框
      openAddDialog: function () {
        var url = global.HOST + '/modules/member/member_rank.html?uId='
          + Est.nextUid();
        this._detail({ title: '会员等级添加', url: url });
      }
    });

    module.exports = MemberRank;
  });