/**
 * @description Index
 * @namespace Index
 * @author yongjin on 2014/11/18
 */
define('Main', ['BaseView', 'UserModel', 'template/main', 'BaseService', 'IndexModel', 'UserModel', 'HelpList'],
  function (require, exports, module) {
    var Main, BaseView, template, BaseService, IndexModel, UserModel, HelpList;

    BaseView = require('BaseView');
    template = require('template/main');
    BaseService = require('BaseService');
    IndexModel = require('IndexModel');
    UserModel = require('UserModel');
    HelpList = require('HelpList');

    Main = BaseView.extend({
      initialize: function () {
        BaseService.initUser(UserModel);
        BaseService.initIndex(IndexModel);
        this._initialize({
          template: template,
          data: {
            user: app.getData('user'),
            index: app.getData('index')
          }
        });
        this.render();
      },
      render: function () {
        this._render();
        this.help = new HelpList({
          el: '.bodyContContent02',
          items: [
            {title: '01月14日更新：新用户后台上线', url: '#/index'},
            {title: '01月10日更新：新增商城管理系统', url: '#/shop'},
            {title: '01月05日更新：新增会员管理系统', url: '#/member'},
            {title: '01月01日更新：新增微网页管理系统', url: '#/wwy'},
            {title: '12月28日更新：新增产品管理系统', url: '#/product'},
            {title: '12月20日更新：新增新闻管理系统', url: '#/news'},
            {title: '12月15日更新：新增站点管理系统', url: '#/static'},
            {title: '12月10日更新：新增留言管理系统', url: '#/message'},
            {title: '12月05日更新：新增证书管理系统', url: '#/cert'},
            {title: '12月01日更新：新增新闻/产品分类管理系统', url: '#/cert'}
          ]
        });
        $("#jhw .module01 .bodyContTitle span.qiehuan001").css({"color": "#646464", "background": "#fafafa", "border-bottom": "1px solid #fafafa"});
         $("#jhw .module01 .bodyContTitle span.qiehuan001").mouseover(function () {
         $("#jhw .module01 .bodyContContent01").show();
         $("#jhw .module01 .bodyContContent02,#jhw .module01 .bodyContContent03").hide();
         $("#jhw .module01 .bodyContTitle span.qiehuan001").css({"color": "#646464", "background": "#fafafa", "border-bottom": "1px solid #fafafa"});
         $("#jhw .module01 .bodyContTitle span.qiehuan002,#jhw .module01 .bodyContTitle span.qiehuan003").css({"color": "#646464", "background": "#fff", "border": "1px solid #e7e7e7"});
         });
         $("#jhw .module01 .bodyContTitle span.qiehuan002").mouseover(function () {
         $("#jhw .module01 .bodyContContent02").show();
         $("#jhw .module01 .bodyContContent01,#jhw .module01 .bodyContContent03").hide();
         $("#jhw .module01 .bodyContTitle span.qiehuan002").css({"color": "#646464", "background": "#fafafa", "border-bottom": "1px solid #fafafa"});
         $("#jhw .module01 .bodyContTitle span.qiehuan001,#jhw .module01 .bodyContTitle span.qiehuan003").css({"color": "#646464", "background": "#fff", "border": "1px solid #e7e7e7"});
         });
         $("#jhw .module01 .bodyContTitle span.qiehuan003").mouseover(function () {
         $("#jhw .module01 .bodyContContent03").show();
         $("#jhw .module01 .bodyContContent01,#jhw .module01 .bodyContContent02").hide();
         $("#jhw .module01 .bodyContTitle span.qiehuan003").css({"color": "#646464", "background": "#fafafa", "border-bottom": "1px solid #fafafa"});
         $("#jhw .module01 .bodyContTitle span.qiehuan001,#jhw .module01 .bodyContTitle span.qiehuan002").css({"color": "#646464", "background": "#fff", "border": "1px solid #e7e7e7"});
         });
        return this;
      }
    });

    module.exports = Main;
  });
