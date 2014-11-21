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
      events: {
        'click .name': 'editName',
        'click .edit': 'editItem',
        'click .delete': '_del'
      },
      initialize: function () {
        this._initialize({
          template : itemTemp,
          model :BaseItem
        });
      },
      render: function () {
        this._render();
      },
      editItem: function () {
        this._edit({
          title: '会员编辑',
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

        var options ={
          template: listTemp,
          render: '#member-list-ul',
          item: MemberItem,
          model: MemberModel,
          collection: MemberCollection
        }
        this._initialize(options).then(function (context) {
          context._initPagination(options);
          context._load(options);
        });
      return this;
      },
      render:function(){
        this._render();
        return this;
      },
      openAddDialog: function () {
        this._detail({
          title: '会员添加',
          url: 'http://jihui88.com/member/modules/member/member_detail.html?time=' + new Date().getTime()
        });
      }
    });
    module.exports = MemberList;
  });