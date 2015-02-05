/**
 * @description main
 * @namespace main
 * @author yongjin<zjut_wyj@163.com> 2015/1/7
 */

app.addRoute('favorite', function () {
  seajs.use(['FavoriteList'], function (FavoriteList) {
    app.addPanel('main', {
      el: '#main',
      template: '<div class="main-inner"></div>'
    }).addView('favoriteList', new FavoriteList({
      el: '.main-inner',
      viewId: 'favoriteList',
      page: parseInt(Est.cookie('favoriteList_page')) || 1,
      pageSize: parseInt(Est.cookie('favoriteList_pageSize')) || 10,
      pagination: true
    }));
    app.getView('breadcrumb').reload('商品收藏');
  });
});

app.addModule('FavoriteModel', 'modules/member/management/favorite/models/FavoriteModel.js');
app.addModule('FavoriteList', 'modules/member/management/favorite/controllers/FavoriteList.js');
app.addTemplate('template/favorite_list', function (require, exports, module) {
  module.exports = require('modules/member/management/favorite/views/favorite_list.html');
});
app.addTemplate('template/favorite_item', function (require, exports, module) {
  module.exports = require('modules/member/management/favorite/views/favorite_item.html');
});