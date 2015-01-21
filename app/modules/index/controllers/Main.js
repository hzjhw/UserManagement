/**
 * @description Index
 * @namespace Index
 * @author yongjin on 2014/11/18
 */
define('Main', ['BaseView', 'UserModel', 'ToolList', 'template/main', 'BaseService', 'IndexModel', 'UserModel', 'HelpList'],
  function (require, exports, module) {
    var Main, BaseView, template, BaseService, IndexModel, ToolList, UserModel, HelpList;

    BaseView = require('BaseView');
    template = require('template/main');
    BaseService = require('BaseService');
    IndexModel = require('IndexModel');
    UserModel = require('UserModel');
    HelpList = require('HelpList');
    ToolList = require('ToolList');

    Main = BaseView.extend({
      initialize: function () {
        var ctx = this;
        BaseService.initUser(UserModel);
        BaseService.initIndex(IndexModel).done(function () {
          ctx._initialize({
            template: template,
            data: {
              user: app.getData('user'),
              index: app.getData('index')
            }
          });
          ctx.render();
        });
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
        this.tool = new ToolList({
          el: '.module04',
          viewId: 'toolList',
          items: [
            {id: '1', url: CONST.DOMAIN + '/vipsite/seo_v2/viewTemplate', name: 'Seo模板', intro: '包括(首页,产品页，自定义页等的设置)，可批量导入',
              src: 'http://i02.c.aliimg.com/cms/upload/2014/834/112/2211438_790723559.png'},
            {id: '2', url: CONST.DOMAIN + '/rest/group/seo_v2/seobatch.html', name: 'Seo批量提交', intro: '批量提交到百度,谷歌等知名搜索引擎',
              src: 'http://i00.c.aliimg.com/cms/upload/2014/344/512/2215443_790723559.png'},
            {id: '3', url: CONST.DOMAIN + '/rest/seotools/view', name: 'SiteMap生成', intro: '提供给搜索引擎一个网站地图，被收录更全',
              src: 'http://i04.c.aliimg.com/cms/upload/2014/944/602/2206449_790723559.png'},
            {id: '4', url: CONST.DOMAIN + '/user_v2/keywords/listInnerLinksKeywords.html', name: '内部链接设置', intro: '可以极大地提升网站的SEO效果，加快收录、优化排名',
              src: 'http://i04.c.aliimg.com/cms/upload/2014/134/402/2204431_790723559.png'},
            {id: '5', url: CONST.DOMAIN + '/rest/group/account_v2/list.html', name: '便捷入口', intro: '百度,cnzz,51la,51yes,优酷账号的管理',
              src: 'http://i04.c.aliimg.com/cms/upload/2014/184/502/2205481_790723559.png'},
            {id: '6', url: CONST.DOMAIN + '/user_v2/keywords/keywordslistStore.html', name: '关键词库', intro: '在需要填关键词时方便SEO关键词选取',
              src: 'http://i02.c.aliimg.com/cms/upload/2014/584/502/2205485_790723559.png'},
            {id: '7', url: CONST.DOMAIN + '/user_v2/keywords/createKeywords.html', name: '长尾关键词', intro: '组合不同描述的关键词, 提升网站的收录量',
              src: 'http://i04.c.aliimg.com/cms/upload/2014/244/512/2215442_790723559.png'},
            {id: '8', url: CONST.DOMAIN + '/user_v2/tools/code.jsp', name: '二维码生成器', intro: '在线生成二维码， 打造属于您自己的个性化二维码',
              src: 'http://i00.c.aliimg.com/cms/upload/2014/554/412/2214455_790723559.png'},
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
