/**
 * @description config
 * @namespace config
 * @author yongjin<zjut_wyj@163.com> 2014/12/11
 */
/**
 * 路由
 * */
app.addRoute('product', function () {
  seajs.use(['jquery', 'BaseView', 'ProductList', 'template/product_panel'],
    function (jquery, BaseView, ProductList, template) {
      var ProductPanel = BaseView.extend({
        initialize: function () {
          this._initialize({
            template: template
          });
        },
        render: function () {
          this._render();
        }
      });
      app.addPanel('product', new ProductPanel({
        el: '#jhw-main'
      })).on('after', function () {
        app.addView('productList', new ProductList({
          el: '.jhw-main-inner',
          viewId: 'productList'
        }));
      }).render();
    });
});
/**
 * 模块
 * */
app.addModule('ProductModel', 'models/ProductModel.js');
app.addModule('ProductList', 'modules/product/controllers/ProductList.js');
app.addModule('ProductDetail', 'modules/product/controllers/ProductDetail.js');

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
app.addTemplate('template/product_transfer', function (require, exports, module) {
  module.exports = require('modules/product/views/product_transfer.html');
});
app.addTemplate('template/product_sort', function (require, exports, module) {
  module.exports = require('modules/product/views/product_sort.html');
});
app.addTemplate('template/product_search', function (require, exports, module) {
  module.exports = require('modules/product/views/product_search.html');
});
app.addTemplate('template/product_panel', function (require, exports, module) {
  module.exports = require('modules/product/views/product_panel.html');
});
