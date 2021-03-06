/**
 * @description config
 * @namespace config
 * @author yongjin<zjut_wyj@163.com> 2014/12/11
 */
// 产品分类
app.addRoute('category/product', function () {
  seajs.use(['jquery', 'ProductCategoryList'], function (jquery, ProductCategoryList) {
    app.addPanel('main', {
      el: '#jhw-main',
      template: '<div class="jhw-main-inner"></div>'
    }).addView('productCategoryPage', new ProductCategoryList({
      viewId: 'productCategoryPage',
      el: '.jhw-main-inner'
    }));
  });
});
// 新闻分类
app.addRoute('category/news', function () {
  seajs.use(['jquery', 'NewsCategoryList'], function (jquery, NewsCategoryList) {
    app.addPanel('main', {
      el: '#jhw-main',
      template: '<div class="jhw-main-inner"></div>'
    }).addView('newsCategoryPage', new NewsCategoryList({
      viewId: 'newsCategoryPage',
      el: '.jhw-main-inner'
    }));
  });
});

app.addModule('ProductCategoryList', 'modules/category/controllers/ProductCategoryList.js');
app.addModule('ProductCategoryDetail', 'modules/category/controllers/ProductCategoryDetail.js');
app.addModule('NewsCategoryList', 'modules/category/controllers/NewsCategoryList.js');
app.addModule('NewsCategoryDetail', 'modules/category/controllers/NewsCategoryDetail.js');
app.addModule('CategoryModel', 'models/CategoryModel.js');
app.addTemplate('template/category_product_item', function (require, exports, module) {
  module.exports = require('modules/category/views/category_product_item.html');
});
app.addTemplate('template/category_product_list', function (require, exports, module) {
  module.exports = require('modules/category/views/category_product_list.html');
});
app.addTemplate('template/category_news_item', function (require, exports, module) {
  module.exports = require('modules/category/views/category_news_item.html');
});
app.addTemplate('template/category_news_list', function (require, exports, module) {
  module.exports = require('modules/category/views/category_news_list.html');
});
app.addTemplate('template/category_product_detail', function(require, exports, module){
  module.exports = require('modules/category/views/category_product_detail.html');
});
app.addTemplate('template/category_news_detail', function(require, exports, module){
  module.exports = require('modules/category/views/category_news_detail.html');
});