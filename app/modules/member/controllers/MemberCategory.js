/**
 * @description MemberCategory
 * @namespace MemberCategory
 * @author jihui-wxw on 14-12-1
 */
define('MemberCategory', ['jquery', 'MemberModel', 'BaseCollection', 'BaseItem', 'BaseList', 'HandlebarsHelper','template/member_category','template/member_list','template/member_rank'],
  function (require, exports, module) {
    var MemberModel, BaseCollection, BaseItem, BaseList, HandlebarsHelper, MemberCategory, MemberCollection
      , membercategory, memberlist, memberrank;

    MemberModel = require('MemberModel');
    BaseCollection = require('BaseCollection');
    BaseItem = require('BaseItem');
    BaseList = require('BaseList');
    HandlebarsHelper = require('HandlebarsHelper');
    //三分类
    membercategory = require('template/member_category');
    memberlist = require('template/member_list');
    memberrank = require('template/member_rank');

    /**
     * 集合类
     */
    MemberCollection = BaseCollection.extend({
      url: CONST.API + '/member/list',
      model: MemberModel,
      initialize: function () {
        this._initialize();
      }
    });
    /**
     * 单视图
     */
    Memberlist = BaseItem.extend({
      tagName: 'div',
      className: 'bui-grid-row',
      events: {
        'click .name': 'editName',
        'click .edit': 'editItem',
        'click .delete': '_del'
      },
      // 初始化
      initialize: function () {
        this._initialize({ template: memberlist });
      },
      // 渲染
      render: function () {
        this._render();
      },
      // 编辑产品
      editItem: function () {
        var url = CONST.HOST + '/modules/member/member_detail.html?id='
          + this.model.id;
        var options = { title: '会员编辑', url: url }
        this._edit(options);
      },
      // 编辑名称
      editName: function () {
        var options = { title: '修改名称', field: 'name', target: '.name' };
        this._editField(options, this);
      }
    });
    /**
     * 三个列表视图
     */
    MemberCategory = BaseList.extend({
      el: '#jhw-main',
      // 初始化
      initialize: function () {
        var options = {
          render: '#member-category',
          template: membercategory,
          model: MemberModel,
          collection: MemberCollection,
          item: Memberlist
        }
        this._initialize(options).then(function (context) {
          // 加载分页
          context._initPagination(options);
          // 加载数据
          context._load(options);
        });
      },
      // 添加产品对话框
      openAddDialog: function () {
        var url = CONST.HOST + '/modules/member/member_detail.html?uId='
          + Est.nextUid();
        this._detail({ title: '产品添加', url: url });
      },
      events: {
        'click #member_list': 'member_list',
        'click #member_rank': 'member_rank'
      }
    });
    module.exports = MemberCategory;

  })