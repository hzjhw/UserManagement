/**
 * @description MemberList
 * @namespace MemberList
 * @author jihui-wxw on 2014/11/16
 */
define('MemberList', ['jquery', 'MemberModel', 'BaseCollection', 'BaseItem', 'BaseList', 'HandlebarsHelper','template/member_list','template/member_item'],
  function (require, exports, module) {
    var MemberModel, BaseCollection, BaseItem, BaseList, HandlebarsHelper, MemberList, MemberItem, MemberCollection, listTemp, itemTemp;

    MemberModel = require('MemberModel');
    BaseCollection = require('BaseCollection');
    BaseItem = require('BaseItem');
    BaseList = require('BaseList');
    HandlebarsHelper = require('HandlebarsHelper');
    listTemp = require('template/member_list');
    itemTemp = require('template/member_item');

    MemberCollection = BaseCollection.extend({
      url: 'http://jihui88.com/rest/api/member/list',
      model: MemberModel
    });

    MemberItem = BaseItem.extend({
      tagName: 'li',
      template: HandlebarsHelper.compile(itemTemp),
      events: {
        'click .name': 'editName',
        'click .edit': 'editItem',
        'click .delete': '_del'
      },
      initialize: function () {
        this._initialize();
      },
      render: function () {
        this._render();
      },
      editItem: function () {
        this._edit({
          title: '产品修改',
          url: global.HOST + '/modules/member/member_detail.html?id=' + this.model.id
        });
      },

      editName: function () {
        this._editField({
          title: '修改名称',
          field: 'name',
          target: '.name'
        }, this);
      }

    });

    MemberList = BaseList.extend({
      el: '#jhw-main',
      events: {
        'click #toggle-all': 'toggleAllChecked',
        'click .member-add': 'openAddDialog'
      },
      initialize: function () {
        var ctx = this;

        // 初始化视图
        this.initView({
          viewTemp: listTemp,
          collectionId: '#member-list-ul'
        });

        // 初始化集合类
        this.initCollection(MemberCollection, {
          template: listTemp,
          render: '#member-list-ul',
          item: MemberItem,
          model: MemberModel
        }).then(function (options) {
          ctx.initPagination(options);
          ctx.load(options);
        });

        return this;
      },
      openAddDialog: function () {
        this.detail({
          title: '会员添加',
          url: 'http://jihui88.com/member/modules/member/member_detail.html?time=' + new Date().getTime()
        });
      }
    });
    module.exports = MemberList;
  });