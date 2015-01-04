/**
 * @description LeftView
 * @namespace LeftView
 * @author yongjin on 2014/11/12
 */

define('LeftView', ['BaseView', 'BaseUtils', 'backbone', 'template/layout_left', 'BaseService', 'BaseModel', 'BaseCollection', 'BaseList', 'BaseItem', 'template/nav_item'],
  function (require, exports, module) {
    var LeftView, BaseView, BaseUtils, leftTemp, BaseCollection, Backbone, BaseModel, BaseItem, BaseList, BaseService, model, collection, item, navTemp;

    BaseView = require('BaseView');
    leftTemp = require('template/layout_left');
    BaseUtils = require('BaseUtils');
    BaseService = require('BaseService');
    BaseList = require('BaseList');
    BaseCollection = require('BaseCollection');
    BaseItem = require('BaseItem');
    navTemp = require('template/nav_item');
    BaseModel = require('BaseModel');
    Backbone = require('backbone');

    model = BaseModel.extend({
      defaults: Est.extend({
      }, BaseModel.prototype.defaults),
      initialize: function(){
        this._initialize();
      }
    });

    collection = BaseCollection.extend({
      model: model
    });

    item = BaseItem.extend({
      tagName: 'li',
      className: 'nav',
      events: {
        'click a': 'toPage'
      },
      initialize:function(){
        this._initialize({
          template: navTemp
        });
      },
      render: function(){
        this._render();
      },
      toPage: function(){
        Backbone.history.navigate(this.model.get('url'), true);
      }
    });

    LeftView = BaseList.extend({
      el: '#jhw-left-bar',
      events: {
        'click .menu-login': 'logout'
      },
      initialize: function () {
        this._initialize({
          template: leftTemp,
          model: model,
          item: item,
          collection: collection,
          render: '#left-bar-ul',
          data: {},
          items: [
            {name: '首页', url: '#', className: 'menu-index'},
            {name: '产品管理', url: '#/product', className: 'menu-product'},
            {name: '新闻管理', url: '#/news', className: 'menu-news'},
            {name: '商城管理', url: '#/shop', className: 'menu-mall'},
            {name: '微网页', url: '#/wwy', className: 'menu-microweb'},
            {name: '留言管理', url: '#/message', className: 'menu-message'},
            {name: '图片管理', url: '#/album', className: 'menu-album'},
            {name: '站点管理', url: '#/static', className: 'menu-static'},
            {name: '会员管理', url: '#/member', className: 'menu-member'},
            {name: '证书管理', url: '#/certificate', className: 'menu-certificate'},
            {name: '我的工具', url: '#/tool', className: 'menu-tool'},
            {name: '退出登录', url: '#/logout', className: 'menu-login'}
          ]
        });
      },
      render: function () {
        this._render();
      },
      logout: function () {
        BaseService.logout();
      }

    });

    $(function () {
      $("#jhw-left-bar .bottom-more").mouseover(function () {
        var ssa = $("#jhw-left-bar").height() - $("#jhw-left-bar ul").height()
        $("#jhw-left-bar .top-more").show();
        $("#jhw-left-bar .bottom-more").hide();
        $("#jhw-left-bar ul").animate({"top": ssa + 'px'}, 'fast');
      });
      $("#jhw-left-bar .top-more").mouseover(function () {
        $("#jhw-left-bar .bottom-more").show();
        $("#jhw-left-bar .top-more").hide();
        $("#jhw-left-bar ul").animate({"top": "0"}, 'fast');
      });
    })
    module.exports = LeftView;
  });
