/**
 * @description 请贴列表
 * @class InvitationList
 * @author yongjin<zjut_wyj@163.com> 2015/1/28
 */
define('InvitationList', ['BaseList', 'BaseItem', 'InvitationModel', 'BaseCollection', 'template/invitation_list', 'template/invitation_item'], function (require, exports, module) {
  var InvitationList, InvitationModel, BaseList, BaseItem, BaseCollection, listTemp, itemTemp, InvitationCollection, InvitationItem;

  BaseList = require('BaseList');
  BaseItem = require('BaseItem');
  BaseCollection = require('BaseCollection');
  listTemp = require('template/invitation_list');
  itemTemp = require('template/invitation_item');
  InvitationModel = require('InvitationModel');

  InvitationCollection = BaseCollection.extend({
    url: CONST.API + '/wqt/list',
    model: InvitationModel,
    initialize: function () {
      this._initialize();
    }
  });

  InvitationItem = BaseItem.extend({
    tagName: 'tr',
    className: 'bui-grid-row',
    events: {
      'click .btn-edit': 'edit',
      'click .btn-del': '_del'
    },
    initialize: function () {
      this._initialize({
        template: itemTemp
      })
    },
    edit: function () {
      this._navigate('wwy_invitation/' + this.model.get('id'), true);
    },
    render: function () {
      this._render();
    }
  });

  InvitationList = BaseList.extend({
    events: {
      'click .btn-add': 'add'
    },
    initialize: function () {
      this._initialize({
        model: InvitationModel,
        collection: InvitationCollection,
        item: InvitationItem,
        template: listTemp,
        render: '#invitation-list-ul'
      });
    },
    add: function () {
      this._dialog({
        moduleId: 'InvitationPre',
        title: '添加邀请'
      });
    },
    render: function () {
      this._render();
    }
  });

  module.exports = InvitationList;
});