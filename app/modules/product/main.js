/**
 * @description config
 * @namespace config
 * @author yongjin<zjut_wyj@163.com> 2014/12/11
 */
/**
 * 模块
 * */
app.addModule('ProductModel', 'models/ProductModel.js');
app.addModule('ProductList', 'modules/product/controllers/ProductList.js');
app.addModule('ProductDetail', 'modules/product/controllers/ProductDetail.js');

/**
 * 路由
 * */
app.addRoute('product', function(){
  seajs.use(['jquery', 'ProductList'], function (jquery, ProductList) {
    app.addView('productList', new ProductList());
  });
});

/**
 * 模板
 * */
app.addTemplate('template/product_item', function (require, exports, module) {
  module.exports = require('modules/product/views/product_item.html');
});
app.addTemplate('template/product_list', function (require, exports, module) {
  module.exports = require('modules/product/views/product_list.html');
});
app.addTemplate('template/product_detail', function (require, exports, module) {
  module.exports = require('modules/product/views/product_detail.html');
});
app.addTemplate('template/product_transfer', function(require, exports, module){
  module.exports = require('modules/product/views/product_transfer.html');
});
app.addTemplate('template/product_sort', function(require, exports, module){
  module.exports = require('modules/product/views/product_sort.html');
});
app.addTemplate('template/product_search', function (require, exports, module) {
  module.exports = require('modules/product/views/product_search.html');
});