/**
 * @description MemberLeftNav
 * @namespace MemberLeftNav
 * @author yongjin<zjut_wyj@163.com> 2015/1/7
 */
define('MemberLeftNav', ['BaseList', 'BaseModel', 'BaseItem', 'BaseCollection', 'template/member_left_nav_item',
    'template/member_left_nav'],
  function (require, exports, module) {
    var MemberLeftNav, BaseList, BaseModel, BaseItem, BaseCollection, model, collection, item, itemTemp, listTemp;

    BaseList = require('BaseList');
    BaseModel = require('BaseModel');
    BaseItem = require('BaseItem');
    BaseCollection = require('BaseCollection');
    itemTemp = require('template/member_left_nav_item');
    listTemp = require('template/member_left_nav');

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
        'click a': 'showBread'
      },
      initialize: function () {
        this._initialize({
          template: itemTemp
        });
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
            {name: '交易信息', url: '#', className: 'order', isroot: true, children: [
              {name: '我的订单', url: '#', className: '', children: []}
            ]},
            {name: '我的收藏', url: '#', className: 'category favorite', isroot: true, children: [
              {name: '商品收藏', url: '#/product_add', className: 'menu-category', children: []}
            ]},
            {name: '我的消息', url: '#', className: 'message', isroot: true, children: [
              {name: '发送消息', url: '#', className: '', children: []},
              {name: '收件箱', url: '#', className: '', children: []},
              {name: '发件箱', url: '#', className: '', children: []},
            ]},
            {name: '个人资料', url: '#', className: 'profile', isroot: true, children: [
              {name: '个人信息', url: '#', className: '', children: []},
              {name: '收货地址', url: '#', className: '', children: []}
            ]},
            {name: '我的预存款', url: '#', className: 'deposit', isroot: true, children: [
              {name: '我的预存款', url: '#', className: '', children: []},
              {name: '预存款充值', url: '#', className: '', children: []}
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