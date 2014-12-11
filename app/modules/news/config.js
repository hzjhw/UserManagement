/**
 * @description config
 * @namespace config
 * @author yongjin<zjut_wyj@163.com> 2014/12/11
 */

/**
 * 模块
 * */
app.addModule('NewsModel', 'models/NewsModel.js');
app.addModule('NewsList', 'modules/news/controllers/NewsList.js');
app.addModule('NewsDetail', 'modules/news/controllers/NewsDetail.js');

/**
 * 路由
 * */
app.addRoute('news', function(){
  seajs.use(['jquery', 'NewsList'], function (jquery, NewsList) {
    app.addView('newsList', new NewsList);
  });
});

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
app.addTemplate('template/news_transfer', function(require, exports, module){
  module.exports = require('modules/news/views/news_transfer.html');
});
app.addTemplate('template/news_sort', function(require, exports, module){
  module.exports = require('modules/news/views/news_sort.html');
});
app.addTemplate('template/news_search', function (require, exports, module) {
  module.exports = require('modules/news/views/news_search.html');
});
