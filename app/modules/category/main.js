/**
 * @description config
 * @namespace config
 * @author yongjin<zjut_wyj@163.com> 2014/12/11
 */
// 产品分类
app.addRoute('category/product', function () {
  seajs.use(['jquery', 'BaseView', 'ProductCategoryList', 'template/category_panel'],
    function (jquery, BaseView, ProductCategoryList, template) {
      var ProductCategoryPanel = BaseView.extend({
        initialize: function () {
          this._initialize({
            template: template
          });
        },
        render: function () {
          this._render();
        }
      });
      app.addPanel('productCategory', new ProductCategoryPanel({
        el: '#jhw-main'
      })).on('after', function () {
        app.addView('productCategoryPage', new ProductCategoryList({
          el: '.jhw-main-inner'
        }));
      }).render();
    });
});
// 新闻分类
app.addRoute('category/news', function () {
  seajs.use(['jquery', 'BaseView', 'NewsCategoryList', 'template/category_panel'],
    function (jquery, BaseView, NewsCategoryList, template) {
      var CategoryPanel = BaseView.extend({
        initialize: function () {
          this._initialize({
            template: template
          });
        },
        render: function () {
          this._render();
        }
      });
      app.addPanel('category', new CategoryPanel({
        el: '#jhw-main'
      })).on('after', function () {
        app.addView('newsCategoryPage', new NewsCategoryList({
          el: '.jhw-main-inner'
        }));
      }).render();
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
app.addTemplate('template/category_panel', function (require, exports, module) {
  module.exports = require('modules/category/views/category_panel.html');
});