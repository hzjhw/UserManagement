/**
 * @description MemberLeftNav
 * @namespace MemberLeftNav
 * @author yongjin<zjut_wyj@163.com> 2015/1/7
 */
define('MemberLeftNav', ['backbone', 'BaseList', 'BaseModel', 'BaseItem', 'BaseCollection', 'template/member_left_nav_item',
    'template/member_left_nav'],
  function (require, exports, module) {
    var MemberLeftNav, BaseList, BaseModel, Backbone, BaseItem, BaseCollection, model, collection, item, itemTemp, listTemp;

    BaseList = require('BaseList');
    BaseModel = require('BaseModel');
    BaseItem = require('BaseItem');
    BaseCollection = require('BaseCollection');
    itemTemp = require('template/member_left_nav_item');
    listTemp = require('template/member_left_nav');
    Backbone = require('backbone');

    model = BaseModel.extend({
      defaults: Est.extend({

      }, BaseModel.prototype.defaults),
      initialize: function () {
        this._initialize();
      }
    });

    collection = BaseCollection.extend({
      initialize: function () {
        this._initialize({
          model: model
        });
      }
    });

    item = BaseItem.extend({
      tagName: 'li',
      events: {
        'click a': 'toPage'
      },
      initialize: function () {
        this._initialize({
          template: itemTemp
        });
      },
      toPage: function () {
        this.$el.removeClass('hover');
        Backbone.history.navigate(this.model.get('url'), true);
      },
      showBread: function () {

      },
      render: function () {
        this._render();
      }
    });

    MemberLeftNav = BaseList.extend({
      initialize: function () {
        this._initialize({
          model: model,
          collection: collection,
          item: item,
          template: listTemp,
          render: '.nav-list-ul',
          subRender: '.node-tree',
          extend: true,
          items: [
            {name: '交易信息', url: '#/order', className: 'order', isroot: true, children: [
              {name: '我的订单', url: '#/order', className: '', children: []}
            ]},
            {name: '我的收藏', url: '#/favorite', className: 'category favorite', isroot: true, children: [
              {name: '商品收藏', url: '#/favorite', className: 'menu-category', children: []}
            ]},
            {name: '我的消息', url: '#/message_view', className: 'message', isroot: true, children: [
              {name: '发送消息', url: '#/message_send', className: '', children: []},
              {name: '收件箱', url: '#/message_view', className: '', children: []},
              {name: '发件箱', url: '#/message_list', className: '', children: []},
            ]},
            {name: '个人资料', url: '#/userinfo', className: 'profile', isroot: true, children: [
              {name: '个人信息', url: '#/userinfo', className: '', children: []},
              {name: '收货地址', url: '#/address', className: '', children: []}
            ]},
            {name: '我的预存款', url: '#/deposit', className: 'deposit', isroot: true, children: [
              {name: '我的预存款', url: '#/deposit', className: '', children: []},
              {name: '预存款充值', url: '#/deposit_add', className: '', children: []}
            ]}
          ]
        });
      },
      render: function () {
        this._render();
      }
    });

    module.exports = MemberLeftNav;
  });