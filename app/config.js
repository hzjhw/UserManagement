/**
 * @description config
 * @namespace config
 * @author yongjin on 2014/7/18
 */
/**
 * 全局常量
 * */
window.CONST = {
  HOST: 'http://jihui88.com/member',
  API: 'http://jihui88.com/rest/api',
  DOMAIN: 'http://jihui88.com',
  SEP: '/',
  ENTER_KEY: 13,
  COLLAPSE_SPEED: 50,
  DEBUG: true,
  ENTER_KEY: 13
}
// 所有实例化对象的容器
window.APP = {
  debug: true
}

/**
 * 视图管理容器
 * */
window.app = new Application(CONST);
app.setData('loginViewList', [
  {text: '访问者可见', value: '1'},
  {text: '登录后可见', value: '0'}
]);
app.setData('adsList', [
  {text: '广告产品', value: '2'},
  {text: '是', value: '1'},
  {text: '否', value: '0'}
]);
/**
 * seajs 配置
 * */
seajs.config({

  // Sea.js 的基础路径
  base: CONST.HOST,

  // 别名配置
  alias: {
    'jquery': 'vendor/jquery/jquery-1.10.2.js',
    'underscore': 'vendor/underscore/underscore-debug.js',
    'backbone': 'vendor/backbone/backbone-debug.js',
    'localStorage': 'vendor/backbone/backbone.localStorage-debug.js',
    'dialog': 'vendor/artDialog_v6/dialog.js',
    'dialog-plus': 'vendor/artDialog_v6/dialog-plus.js',
    'datetimepicker': 'vendor/jquery-datetimepicker/jquery.datetimepicker.js',
    'DatetimePicker': 'common/datetimepicker/scripts/DatetimePicker.js',
    'xheditor': 'vendor/xheditor/xheditor.js',
    'marionette': 'vendor/backbone/backbone.marionette.js',
    'handlebars': 'vendor/handlebars/handlebars-debug.js',
    'HandlebarsHelper': 'scripts/helper/HandlebarsHelper.js',
    'BaseView': 'base/BaseView.js',
    'BaseCollection': 'base/BaseCollection.js',
    'BaseModel': 'base/BaseModel.js',
    'BaseItem': 'base/BaseItem.js',
    'BaseDetail': 'base/BaseDetail.js',
    'BaseList': 'base/BaseList.js',
    'BaseRoot': 'base/BaseRoot',
    'BaseUtils': 'base/BaseUtils',
    'BaseComposite': 'base/BaseComposite',

    // common
    'Pagination': 'common/pagination/Pagination.js',
    'PaginationModel': 'common/pagination/PaginationModel.js',
    'AttributesAdd': 'common/attributes/AttributesAdd.js',
    'AttributesShow': 'common/attributes/AttributesShow.js',
    'Tag': 'common/tag/Tag.js',
    'Picture': 'common/picture/Picture.js',
    'Select': 'common/select/Select.js',

    // index
    'TopView': 'modules/index/controllers/TopView.js',
    'LeftView': 'modules/index/controllers/LeftView.js',
    'Main': 'modules/index/controllers/Main.js',

    // user
    'UserModel': 'models/UserModel.js',
    'LoginModel': 'models/LoginModel.js',
    'Login': 'modules/login/controllers/Login.js',

    // register
    'RegisterModel': 'models/RegisterModel.js',
    'Register': 'modules/register/controllers/Register.js',

    // todo
    'TodoModel': 'demo/todo/models/TodoModel.js',
    'TodoView': 'demo/todo/views/TodoView.js',
    'TodoItem': 'demo/todo/views/TodoItem.js',
    'TodosCollection': 'demo/todo/collections/TodosCollection.js',

    // category
    'CategoryModel': 'models/CategoryModel.js',
    'ProductCategoryList': 'modules/category/controllers/ProductCategoryList.js',
    'ProductCategoryDetail': 'modules/category/controllers/ProductCategoryDetail.js',
    'NewsCategoryList': 'modules/category/controllers/NewsCategoryList.js',
    'NewsCategoryDetail': 'modules/category/controllers/NewsCategoryDetail.js',

    // attributes
    'AttributesModel': 'models/AttributesModel.js',
    'AttributesList': 'modules/attributes/controllers/AttributesList.js',
    'AttributesDetail': 'modules/attributes/controllers/AttributesDetail.js',

    // product
    'ProductModel': 'models/ProductModel.js',
    'ProductList': 'modules/product/controllers/ProductList.js',
    'ProductDetail': 'modules/product/controllers/ProductDetail.js',

    // mews
    'NewsModel': 'models/NewsModel.js',
    'NewsList': 'modules/news/controllers/NewsList.js',
    'NewsDetail': 'modules/news/controllers/NewsDetail.js',

    // member
    'MemberModel': 'models/MemberModel.js',
    'MemberCategory': 'modules/member/controllers/MemberCategory.js',
    'MemberList': 'modules/member/controllers/MemberList.js',
    'MemberRank': 'modules/member/controllers/MemberRank.js',
    'MemberDetail': 'modules/member/controllers/MemberDetail.js'
  },

  // 路径配置
  paths: {
    bui: CONST.HOST + '/vendor/bui'
  },

  // 变量配置
  vars: {
    'locale': 'zh-cn'
  },

  // 映射配置
  map: [
    //[/bui\/(.*).js/, 'bui/$1-min.js'], //['.js', '-min.js'] ,仅bui目录下使用-min.js
    ['http://example.com/js/app/', 'http://localhost/js/app/'],
    ['.js', '.js?20141105']
  ],

  // 调试模式
  debug: true,

  // 文件编码
  charset: 'utf-8'
});

/**
 * 注册模板
 * */

define('template/layout_left', function(require, exports, module){
  module.exports = require('modules/index/views/layout_left.html');
});
define('template/layout_top', function(require, exports, module){
  module.exports = require('modules/index/views/layout_top.html');
});
define('template/main', function (require, exports, module) {
  module.exports = require('modules/index/views/main.html');
});


define('template/product_item', function (require, exports, module) {
  module.exports = require('modules/product/views/product_item.html');
});
define('template/product_list', function (require, exports, module) {
  module.exports = require('modules/product/views/product_list.html');
});
define('template/pagination', function (require, exports, module) {
  module.exports = require('common/pagination/pagination.html');
});
define('template/product_detail', function (require, exports, module) {
  module.exports = require('modules/product/views/product_detail.html');
});
define('template/product_transfer', function(require, exports, module){
  module.exports = require('modules/product/views/product_transfer.html');
});
define('template/product_sort', function(require, exports, module){
  module.exports = require('modules/product/views/product_sort.html');
});

//news
define('template/news_item', function (require, exports, module) {
  module.exports = require('modules/news/views/news_item.html');
});
define('template/news_list', function (require, exports, module) {
  module.exports = require('modules/news/views/news_list.html');
});
define('template/news_detail', function (require, exports, module) {
  module.exports = require('modules/news/views/news_detail.html');
});
define('template/news_search', function(require, exports, module){
  module.exports = require('modules/news/views/news_search.html');
});
define('template/news_sort', function(require, exports, module){
  module.exports = require('modules/news/views/news_sort.html');
});
define('template/news_transfer', function(require, exports, module){
  module.exports = require('modules/news/views/news_transfer.html');
});


define('template/attributes_show_item', function (require, exports, module) {
  module.exports = require('common/attributes/attributes_show_item.html');
});

define('template/category_product_item', function (require, exports, module) {
  module.exports = require('modules/category/views/category_product_item.html');
});
define('template/category_product_list', function (require, exports, module) {
  module.exports = require('modules/category/views/category_product_list.html');
});
define('template/category_news_item', function (require, exports, module) {
  module.exports = require('modules/category/views/category_news_item.html');
});
define('template/category_news_list', function (require, exports, module) {
  module.exports = require('modules/category/views/category_news_list.html');
});
define('template/product_search', function(require, exports, module){
  module.exports = require('modules/product/views/product_search.html');
});
define('template/attributes_item', function (require, exports, module) {
  module.exports = require('modules/attributes/views/attributes_item.html');
});
define('template/attributes_list', function (require, exports, module) {
  module.exports = require('modules/attributes/views/attributes_list.html');
});
define('template/tag_view', function (require, exports, module) {
  module.exports = require('common/tag/views/tag_view.html');
});
define('template/tag_view_item', function (require, exports, module) {
  module.exports = require('common/tag/views/tag_view_item.html');
});
define('template/tag_picker_item', function (require, exports, module) {
  module.exports = require('common/tag/views/tag_picker_item.html');
});

define('template/picture_view', function (require, exports, module) {
  module.exports = require('common/picture/views/picture_view.html');
});
define('template/attributes_option_template', function (require, exports, module) {
  module.exports = require('common/attributes/attributes_option_template.html');
});
define('template/attributes_option_item', function (require, exports, module) {
  module.exports = require('common/attributes/attributes_option_item.html');
});

define('template/picture_item', function (require, exports, module) {
  module.exports = require('common/picture/views/picture_item.html');
});
define('template/login', function (require, exports, module) {
  module.exports = require('modules/login/login.html');
});
define('template/register', function (require, exports, module) {
  module.exports = require('modules/register/register.html');
});
define('template/register_detail', function (require, exports, module) {
  module.exports = require('modules/register/views/register_detail.html');
});
/* member */
define('template/member', function (require, exports, module) {
  module.exports = require('modules/member/member.html');
});
define('template/member_list', function (require, exports, module) {
  module.exports = require('modules/member/views/member_list.html');
});
define('template/member_list_detail', function (require, exports, module) {
  module.exports = require('modules/member/views/member_list_detail.html');
});
define('template/member_rank', function (require, exports, module) {
  module.exports = require('modules/member/views/member_rank.html');
});
define('template/member_rank_detail', function (require, exports, module) {
  module.exports = require('modules/member/views/member_rank_detail.html');
});
define('template/member_attribute', function (require, exports, module) {
  module.exports = require('modules/member/views/member_attribute.html');
});
define('template/member_category', function (require, exports, module) {
  module.exports = require('modules/member/views/member_category.html');
});
/*select*/
define('template/select_list', function(require, exports, module){
  module.exports = require('common/select/select_list.html');
});
define('template/select_item', function(require, exports, module){
  module.exports = require('common/select/select_item.html');
});
/**
 * Backbone路由
 * */
seajs.use(['jquery', 'underscore', 'backbone'],
  function ($, _, Backbone) {
    var router = Backbone.Router.extend({
      routes: {
        '': 'index',
        'product': 'product',
        'category/product': 'productCategory',
        'news': 'news',
        'category/news': 'newsCategory',
        'attributes': 'attributes',
        'member': 'member',
        '*other': 'default'
      },
      index: function () {
        seajs.use(['jquery', 'Main'], function (jquery, Main) {
          app.addView('main', new Main);
        });
      },
      login: function () {
        seajs.use(['jquery', 'Login'], function (jquery, Login) {
          app.addView('login', new Login);
        });
      },
      register: function () {
        seajs.use(['jquery', 'Register'], function (jquery, Register) {
          app.addView('register', new Register);
        });
      },
      product: function () {
        seajs.use(['jquery', 'ProductList'], function (jquery, ProductList) {
          app.addView('productList', new ProductList);
        });
      },
      productCategory: function () {
        seajs.use(['jquery', 'ProductCategoryList'], function (jquery, ProductCategoryList) {
          app.addView('productCategoryPage', new ProductCategoryList);
        });
      },
      news: function () {
        seajs.use(['jquery', 'NewsList'], function (jquery, NewsList) {
          app.addView('newsList', new NewsList);
        });
      },
      newsCategory: function () {
        seajs.use(['jquery', 'NewsCategoryList'], function (jquery, NewsCategoryList) {
          app.addView('newsCategoryPage', new NewsCategoryList);
        });
      },
      attributes: function () {
        seajs.use(['jquery', 'AttributesList'], function (jquery, AttributesList) {
          app.addView('attributesList', new AttributesList);
        });
      },
      member: function () {
        seajs.use(['jquery', 'MemberCategory'], function (jquery, MemberCategory) {
          app.addView('memberCategory', new MemberCategory);
        });
      },
      default: function () {
        //$(document.body).append("This route is not hanled.. you tried to access: " + other);

      }
    });
    new router;
    Backbone.history.start();
  });

window.debug = function (str, options) {
  if (CONST.DEBUG) {
    console.log(str);
  }
}