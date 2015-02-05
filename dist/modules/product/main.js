/**
 * @description config
 * @namespace config
 * @author yongjin<zjut_wyj@163.com> 2014/12/11
 */
/*产品列表*/
app.addModule('ProductModel', 'models/ProductModel.js');
app.addModule('ProductList', 'modules/product/controllers/ProductList.js');
app.addTemplate('template/product_item', function (require, exports, module) {
  module.exports = require('modules/product/views/product_item.html');
});
app.addTemplate('template/product_list', function (require, exports, module) {
  module.exports = require('modules/product/views/product_list.html');
});
app.addTemplate('template/product_transfer', function (require, exports, module) {
  module.exports = require('modules/product/views/product_transfer.html');
});
app.addTemplate('template/product_sort', function (require, exports, module) {
  module.exports = require('modules/product/views/product_sort.html');
});
app.addTemplate('template/product_search', function (require, exports, module) {
  module.exports = require('modules/product/views/product_search.html');
});

app.addRoute('product', function () {
  seajs.use(['jquery', 'ProductList'], function (jquery, ProductList) {
    app.addPanel('main', {
      el: '#jhw-main',
      template: '<div class="jhw-panel"></div>'
    }).addView('productList', new ProductList({
      el: '.jhw-panel',
      viewId: 'productList',
      page: parseInt(Est.cookie('productList_page')) || 1,
      pageSize: parseInt(Est.cookie('productList_pageSize')) || 16
    }));
  });
});

/*产品详细页面*/
app.addModule('ProductDetail', 'modules/product/controllers/ProductDetail.js');
app.addTemplate('template/product_detail', function (require, exports, module) {
  module.exports = require('modules/product/views/product_detail.html');
});
function productDetail(id) {
  seajs.use(['ProductDetail'], function (ProductDetail) {
    app.addPanel('main', {
      el: '#jhw-main',
      template: '<div class="jhw-panel"></div>'
    }).addView('productDetail', new ProductDetail({
      el: '.jhw-panel',
      viewId: 'productDetail',
      id: id
    }));
  });
}
app.addRoute('product/:id', function (id) {
  productDetail(Est.decodeId(id, 'Product_', 32));
});
app.addRoute('product_add', function () {
  productDetail();
});

