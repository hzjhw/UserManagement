/**
 * @description config
 * @namespace config
 * @author wxw<zjut_wyj@163.com> 2014/12/11
 */
/**
 * 路由
 * */
app.addRoute('news', function () {
  seajs.use(['jquery', 'NewsList'], function (jquery, NewsList) {
    app.addPanel('main', {
      el: '#jhw-main',
      template: '<div class="jhw-panel"></div>'
    }).addView('newsList', new NewsList({
      el: '.jhw-panel'
    }));
  });
});
function newsDetail(id) {
  seajs.use(['NewsDetail'], function(NewsDetail){
    app.addPanel('main', {
      el: '#jhw-main',
      template: '<div class="jhw-panel"></div>'
    }).addView('newsDetail', new NewsDetail({
      el: '.jhw-panel',
      viewId: 'newsDetail',
      id : id
    }));
  });
}
app.addRoute('news/:id', function (id) {
  newsDetail(Est.decodeId(id, 'News_', 32));
});
app.addRoute('news_add', function () {
  newsDetail();
});

/**
 * 模块
 * */
app.addModule('NewsModel', 'models/NewsModel.js');
app.addModule('NewsList', 'modules/news/controllers/NewsList.js');
app.addModule('NewsDetail', 'modules/news/controllers/NewsDetail.js');

/**
 * 模板
 * */
app.addTemplate('template/news_item', function (require, exports, module) {
  module.exports = require('modules/news/views/news_item.html');
});
app.addTemplate('template/news_list', function (require, exports, module) {
  module.exports = require('modules/news/views/news_list.html');
});
app.addTemplate('template/news_detail', function (require, exports, module) {
  module.exports = require('modules/news/views/news_detail.html');
});
app.addTemplate('template/news_transfer', function (require, exports, module) {
  module.exports = require('modules/news/views/news_transfer.html');
});
app.addTemplate('template/news_sort', function (require, exports, module) {
  module.exports = require('modules/news/views/news_sort.html');
});
app.addTemplate('template/news_search', function (require, exports, module) {
  module.exports = require('modules/news/views/news_search.html');
});
