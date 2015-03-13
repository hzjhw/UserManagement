/**
 * @description LeftView
 * @namespace LeftView
 * @author yongjin on 2014/11/12
 */

define('LeftView', ['BaseView', 'Utils', 'backbone', 'template/layout_left', 'Service', 'BaseModel',
    'BaseCollection', 'BaseList', 'BaseItem', 'template/nav_item'],
  function (require, exports, module) {
    var LeftView, BaseView, Utils, leftTemp, BaseCollection, Backbone, BaseModel, BaseItem, BaseList,
      Service, model, collection, item, navTemp;

    BaseView = require('BaseView');
    leftTemp = require('template/layout_left');
    Utils = require('Utils');
    Service = require('Service');
    BaseList = require('BaseList');
    BaseCollection = require('BaseCollection');
    BaseItem = require('BaseItem');
    navTemp = require('template/nav_item');
    BaseModel = require('BaseModel');
    Backbone = require('backbone');

    model = BaseModel.extend({
      defaults: Est.extend({
      }, BaseModel.prototype.defaults),
      initialize: function () {
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
        'mouseover a': 'setChildPos',
        'click a': 'toPage'
      },
      initialize: function () {
        this._initialize({
          template: navTemp
        });
      },
      render: function () {
        this._render();
      },
      toPage: function (e) {
        e.stopImmediatePropagation();
        this.$el.removeClass('hover');
        this.$el.parents('li:first').removeClass('hover');
        // 清空所有有关分页的cookie
        var cookies = app.getCookies();
        Est.each(cookies, function (name) {
          Est.cookie(name, null);
        });
        cookies.length = 0;
        if (this.model.get('url').indexOf('#') !== 0) {
          window.open(this.model.get('url'));
        }
        Backbone.history.navigate(this.model.get('url'), true);
        return false;
      },
      setChildPos: function () {
        this.$('.node-tree').css({
          top: -2,
          left: this.$el.width() - 2
        });
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
          viewId: 'leftView',
          collection: collection,
          render: '#left-bar-ul',
          data: {},
          items: [
            {name: '首页', url: '#', className: 'menu-index', children: []},
            {name: '图片管理', url: '#/album', className: 'menu-album'},
            {name: '产品管理', url: '#/product', className: 'menu-product', children: [
              {name: '产品添加', url: '#/product_add', className: 'menu-category', children: []},
              {name: '分类管理', url: '#/category/product', className: 'menu-category', children: []},
              {name: '产品导入', url: '#/product_import', className: 'menu-category', children: []}
            ]},
            {name: '新闻管理', url: '#/news', className: 'menu-news', children: [
              {name: '新闻添加', url: '#/news_add', className: 'menu-category', children: []},
              {name: '分类管理', url: '#/category/news', className: 'menu-category', children: []}
            ]},
            {name: '商城管理', url: '#/shop', className: 'menu-mall', children: [
              {name: '支付方式管理', url: '#/shop/pay_type', className: 'menu-category', children: []},
              {name: '配送方式管理', url: '#/shop/delivery_type', className: 'menu-category', children: []},
              {name: '物流公司管理', url: '#/shop/delivery_corp', className: 'menu-category', children: []}
            ]},
            {name: '会员管理', url: '#/member', className: 'menu-member', children: [
              {name: '会员等级管理', url: '#/member/rank', className: 'menu-category', children: []},
              {name: '会员属性管理', url: '#/member/attr', className: 'menu-category', children: []}
            ]},
            {name: '微网页', url: '#/wwy', className: 'menu-microweb', children: [
              {name: '微传单', url: '#/wwy', className: 'menu-invitation'},
              {name: '微邀请', url: '#/wwy_invitation', className: 'menu-invitation'}
            ]},
            {name: '站点管理', url: '#/static', className: 'menu-static', children: [
              {name: '自定义模块管理', url: '#/userdefined', className: 'menu-category', children: []},
              {name: '我的网站', url: 'http://' + app.getData('user')['username'] + '.' + CONST.DOMAIN_TAIL, className: 'menu-website', children: []},
              {name: '外观设计', url: this.getDesignUrl(), className: 'menu-design', children: []},
              {name: '地图定位', url: CONST.DOMAIN + '/user/platform/include/mapbar/map.jsp', className: 'menu-map', children: []}
            ]},
            {name: '手机网站', url: '#/mobile', className: 'menu-mobile', children: [
              {name: '自定义模块管理', url: '#/userdefined_mobile', className: 'menu-category', children: []},
              {name: '我的网站', url: 'http://m.' + app.getData('user')['username'] + '.' + CONST.DOMAIN_TAIL, className: 'menu-website', children: []},
              {name: '外观设计', url: this.getMobileDesignUrl(), className: 'menu-design', children: []},
              {name: '地图定位', url: CONST.DOMAIN + '/user/platform/include/mapbar/map.jsp', className: 'menu-map', children: []}
            ]},
            {name: '留言管理', url: '#/message', className: 'menu-message'},
            /* {name: '证书管理', url: '#/certificate', className: 'menu-certificate'},
             {name: '我的工具', url: '#/tool', className: 'menu-tool'},*/
            {name: '退出登录', url: '#/logout', className: 'menu-login'}
          ],
          subRender: '.node-tree'
        });
      },
      getDesignUrl: function () {
        return Utils.getDesignUrl();
      },
      getMobileDesignUrl: function(){
        return Utils.getMobileDesignUrl();
      },
      render: function () {
        this._render();
      },
      logout: function () {
        Service.logout();
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
