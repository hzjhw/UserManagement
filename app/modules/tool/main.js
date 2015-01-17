/**
 * @description main
 * @class main
 * @author yongjin<zjut_wyj@163.com> 2015/1/16
 */
app.addRoute('tool', function () {
  seajs.use(['ToolList'], function (ToolList) {
    app.addPanel('main', {
      el: '#jhw-main',
      template: '<div class="jhw-panel"></div>'
    }).addView('toolPanel', new ToolList({
      el: '.jhw-panel',
      viewId: 'toolPanel',
      items: [
        {id: '1', url: CONST.DOMAIN +  '/vipsite/seo_v2/viewTemplate', name: 'Seo模板', intro: '包括(首页,产品页，自定义页等的设置)，可批量导入',
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
        {id: '7', url: CONST.DOMAIN + 'http/user_v2/keywords/createKeywords.html', name: '长尾关键词', intro: '组合不同描述的关键词, 提升网站的收录量',
          src: 'http://i04.c.aliimg.com/cms/upload/2014/244/512/2215442_790723559.png'},
        {id: '8', url: CONST.DOMAIN + '/user_v2/tools/code.jsp', name: '二维码生成器', intro: '在线生成二维码， 打造属于您自己的个性化二维码',
          src: 'http://i00.c.aliimg.com/cms/upload/2014/554/412/2214455_790723559.png'},
      ]
    }));
  });
});
app.addModule('ToolList', 'modules/tool/controllers/ToolList.js');
app.addTemplate('template/tool_list', function (require, exports, module) {
  module.exports = require('modules/tool/views/tool_list.html');
});
app.addTemplate('template/tool_item', function (require, exports, module) {
  module.exports = require('modules/tool/views/tool_item.html');
});