/**
 * @description MemberRank
 * @namespace MemberRank
 * @author wxw on 2014/12/16
 */
define('MemberRank', ['jquery', 'MemberRankModel', 'BaseCollection', 'BaseItem', 'BaseList', 'HandlebarsHelper',
    'template/member_rank','template/member_rank_item'],
  function (require, exports, module) {
    var MemberRankModel, BaseCollection, BaseItem, BaseList, HandlebarsHelper, MemberRankCollection
      , MemberRank , memberRank, memberRankItem ,MemberRankItem;

    MemberRankModel = require('MemberRankModel');
    BaseCollection = require('BaseCollection');
    BaseItem = require('BaseItem');
    BaseList = require('BaseList');
    HandlebarsHelper = require('HandlebarsHelper');
    //分类
    memberRank = require('template/member_rank');
    memberRankItem = require('template/member_rank_item');
    /**
     * 集合类
     */
    MemberRankCollection = BaseCollection.extend({
      url: CONST.API + '/member/rank/list',
      model: MemberRankModel,
      initialize: function () {
        this._initialize();
      }
    });
    /**
     * 单视图
     */
    MemberRankItem = BaseItem.extend({
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
          template: memberRankItem,
          detail: CONST.HOST + '/modules/member/member_rank_detail.html'
        });
      },
      edit: function () {
        this._navigate('#/member_rank_edit/' + this.model.get('id'), true);
      },
      // 渲染文档
      render: function () {
        this._render();
      }
    });
    /**
     * 列表视图
     */
    MemberRank = BaseList.extend({
      events: {
        'click #toggle-all': '_toggleAllChecked',
        'click .btn-batch-del': '_batchDel',
        'click .member-rank-add': 'add',
        'click .btn-search': 'search'
      },
      initialize: function () {
        this._initialize({
          render: '#member-list-ul',
          enterRender: '.btn-search',
          template: memberRank,
          model: MemberRankModel,
          collection: MemberRankCollection,
          item: MemberRankItem,
          detail: CONST.HOST + '/modules/member/member_rank_detail.html'
        });
      },
      add: function () {
        this._navigate('#/member_rank_add', true);
      },
      render : function(){
        this._render({
          height:300
        });
      }
    });

    module.exports = MemberRank;
  });