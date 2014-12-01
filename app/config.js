/**
 * @description config
 * @namespace config
 * @author yongjin on 2014/7/18
 */


window.global = {
  HOST : 'http://jihui88.com/member',
  API: 'http://jihui88.com/rest/api',
  SEP: '/',
  debug: true
}

seajs.config({

  // Sea.js 的基础路径
  base: global.HOST,

  // 别名配置
  alias: {
    'jquery': 'vendor/jquery/jquery-1.10.2.js',
    'underscore': 'vendor/underscore/underscore-debug.js',
    'backbone': 'vendor/backbone/backbone-debug.js',
    'localStorage': 'vendor/backbone/backbone.localStorage-debug.js',
    'Est': 'vendor/Est/Est.min.js',
    'dialog': 'vendor/artDialog_v6/dialog.js',
    'dialog-plus': 'vendor/artDialog_v6/dialog-plus.js',
    'datetimepicker': 'vendor/jquery-datetimepicker/jquery.datetimepicker.js',
    'DatetimePicker': 'common/datetimepicker/scripts/DatetimePicker.js',
    'xheditor': 'vendor/xheditor/xheditor.js',
    'marionette': 'vendor/backbone/backbone.marionette.js',
    'handlebars': 'vendor/handlebars/handlebars-debug.js',
    'HandlebarsHelper': 'scripts/helper/HandlebarsHelper.js',
    'BaseCollection': 'base/BaseCollection.js',
    'BaseModel': 'base/BaseModel.js',
    'BaseItem': 'base/BaseItem.js',
    'BaseDetail': 'base/BaseDetail.js',
    'BaseList': 'base/BaseList.js',
    'BaseRoot': 'base/BaseRoot',

    // common
    'Pagination': 'common/pagination/Pagination.js',
    'PaginationModel': 'common/pagination/PaginationModel.js',
    'AttributesAdd': 'common/attributes/AttributesAdd.js',
    'AttributesShow': 'common/attributes/AttributesShow.js',
    'Tag': 'common/tag/Tag.js',
    'Picture': 'common/picture/Picture.js',

    // index
    'TopView': 'modules/index/views/TopView.js',
    'LeftView': 'modules/index/views/LeftView.js',
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

    // attributes
    'AttributesModel': 'models/AttributesModel.js',
    'AttributesList': 'modules/attributes/controllers/AttributesList.js',
    'AttributesDetail': 'modules/attributes/controllers/AttributesDetail.js',

    // product
    'ProductModel': 'models/ProductModel.js',
    'ProductList': 'modules/product/controllers/ProductList.js',
    'ProductDetail': 'modules/product/controllers/ProductDetail.js',

   // member
    'MemberModel': 'models/MemberModel.js',
    'MemberCategory': 'modules/member/controllers/MemberCategory.js',
    'MemberList': 'modules/member/controllers/MemberList.js',
    'MemberRank': 'modules/member/controllers/MemberRank.js',
    'MemberDetail': 'modules/member/controllers/MemberDetail.js'
  },

  // 路径配置
  paths: {
    bui: global.HOST + '/vendor/bui'
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

/** 注册模板*/
define('template/main', function (require, exports, module) {
  module.exports = require('modules/index/views/main.html');
});
define('template/product_item', function(require, exports, module){
  module.exports = require('modules/product/views/product_item.html');;
});
define('template/product_list', function(require, exports, module){
  module.exports = require('modules/product/views/product_list.html');
});
define('template/pagination', function(require, exports, module){
  module.exports = require('common/pagination/pagination.html');
});
define('template/product_detail', function(require, exports, module){
  module.exports = require('modules/product/views/product_detail.html');
});
define('template/attributes_show_item', function(require, exports, module){
  module.exports = require('common/attributes/attributes_show_item.html');
});
define('template/category_product_item', function(require, exports, module){
  module.exports = require('modules/category/views/category_product_item.html');
});
define('template/category_product_list', function(require, exports, module){
  module.exports = require('modules/category/views/category_product_list.html');
});
define('template/attributes_item', function(require, exports, module){
  module.exports = require('modules/attributes/views/attributes_item.html');
});
define('template/attributes_list', function(require, exports, module){
  module.exports = require('modules/attributes/views/attributes_list.html');
});
define('template/tag_view', function(require, exports, module){
  module.exports = require('common/tag/views/tag_view.html');
});
define('template/tag_view_item', function(require, exports, module){
  module.exports = require('common/tag/views/tag_view_item.html');
});
define('template/tag_picker_item', function(require, exports, module){
  module.exports = require('common/tag/views/tag_picker_item.html');
});

define('template/picture_view', function(require, exports, module){
  module.exports = require('common/picture/views/picture_view.html');
});
define('template/attributes_option_template', function(require, exports, module){
  module.exports = require('common/attributes/attributes_option_template.html');
});
define('template/attributes_option_item', function(require, exports, module){
  module.exports = require('common/attributes/attributes_option_item.html');
});

define('template/picture_item', function(require, exports, module){
  module.exports = require('common/picture/views/picture_item.html');
});
define('template/login', function (require, exports, module){
  module.exports = require('modules/login/login.html');
});
define('template/register', function (require, exports, module){
  module.exports = require('modules/register/register.html');
});
define('template/register_detail', function (require, exports, module){
  module.exports = require('modules/register/views/register_detail.html');
});
/* member */
define('template/member', function (require, exports, module){
  module.exports = require('modules/member/member.html');
});
define('template/member_list', function (require, exports, module){
  module.exports = require('modules/member/views/member_list.html');
});
define('template/member_list_detail', function (require, exports, module){
  module.exports = require('modules/member/views/member_list_detail.html');
});
define('template/member_rank', function (require, exports, module){
  module.exports = require('modules/member/views/member_rank.html');
});
define('template/member_rank_detail', function (require, exports, module){
  module.exports = require('modules/member/views/member_rank_detail.html');
});
define('template/member_attribute', function (require, exports, module){
  module.exports = require('modules/member/views/member_attribute.html');
});
define('template/member_category', function (require, exports, module){
  module.exports = require('modules/member/views/member_category.html');
});
/** Backbone路由
 * */
seajs.use(['jquery', 'underscore', 'backbone'], function ($, _, Backbone) {
  var router = Backbone.Router.extend({
    routes: {
      '': 'index',
      'login': 'login',
      'register': 'register',
      'product': 'product',
      'category/product': 'productCategory',
      'attributes': 'attributes',

      //会员
      'member': 'member',

      '*other': 'default'

    },
    index: function () {
      seajs.use(['jquery', 'Main'], function (jquery, Main) {
        new Main();
      });
    },
    login: function () {
      seajs.use(['jquery', 'Login'], function (jquery, Login) {
        new Login();
      });
    },
    register: function () {
      seajs.use(['jquery', 'Register'], function (jquery, Register) {
        new Register();
      });
    },
    product: function (id) {
      seajs.use(['jquery', 'ProductList'], function (jquery, ProductList) {
        new ProductList();
      });
    },

    productCategory: function () {
      seajs.use(['jquery', 'ProductCategoryList'], function (jquery, ProductCategoryList) {
        new ProductCategoryList();
      });
    },

    attributes: function () {
      seajs.use(['jquery', 'AttributesList'], function (jquery, AttributesList) {
        new AttributesList();
      });
    },

    //会员
    member: function (id) {
      seajs.use(['jquery', 'MemberCategory'], function (jquery, MemberCategory) {
        new MemberCategory();
      });
    },


    default: function (other) {
      //$(document.body).append("This route is not hanled.. you tried to access: " + other);

    }

  });
  new router;
  Backbone.history.start();
});

(function () {

  /**
   * Sea.js mini 2.3.0 | seajs.org/LICENSE.md
   */
  var define;
  var require;
  (function (global, undefined) {

    /**
     * util-lang.js - The minimal language enhancement
     */

    function isType(type) {
      return function (obj) {
        return {}.toString.call(obj) == "[object " + type + "]"
      }
    }

    var isFunction = isType("Function")
    /**
     * module.js - The core of module loader
     */

    var cachedMods = {}

    function Module() {
    }

    // Execute a module
    Module.prototype.exec = function () {
      var mod = this
      // When module is executed, DO NOT execute it again. When module
      // is being executed, just return `module.exports` too, for avoiding
      // circularly calling
      if (this.execed) {
        return mod.exports
      }
      this.execed = true;

      function require(id) {
        return Module.get(id).exec()
      }

      // Exec factory
      var factory = mod.factory
      var exports = isFunction(factory) ? factory(require, mod.exports = {}, mod) : factory
      if (exports === undefined) {
        exports = mod.exports
      }
      // Reduce memory leak
      delete mod.factory
      mod.exports = exports
      return exports
    }
    // Define a module
    define = function (id, deps, factory) {
      var meta = {
        id: id,
        deps: deps,
        factory: factory
      }
      Module.save(meta)
    }
    // Save meta data to cachedMods
    Module.save = function (meta) {
      var mod = Module.get(meta.id)
      mod.id = meta.id
      mod.dependencies = meta.deps
      mod.factory = meta.factory
    }
    // Get an existed module or create a new one
    Module.get = function (id) {
      return cachedMods[id] || (cachedMods[id] = new Module())
    }
    // Public API
    require = function (id) {
      var mod = Module.get(id)
      if (!mod.execed) {
        mod.exec()
      }
      return mod.exports
    }
  })(this);
  define("bui/config", [], function (require, exports, module) {
    //from seajs
    var BUI = window.BUI = window.BUI || {};
    BUI.use = seajs.use;
    BUI.config = seajs.config;
  });
  require("bui/config");
})();
if (!window.console) {
  console = (function (debug) {
    var instance = null;

    function Constructor() {
      if (debug) {
        this.div = document.createElement("console");
        this.div.id = "console";
        this.div.style.cssText = "filter:alpha(opacity=80);padding:10px;line-height:14px;position:absolute;right:0px;top:0px;width:30%;border:1px solid #ccc;background:#eee;";
        document.body.appendChild(this.div);
      }
    }

    Constructor.prototype = {
      log: function (str) {
        if (debug) {
          var p = document.createElement("p");
          p.innerHTML = str;
          this.div.appendChild(p);
        }
      }
    }
    function getInstance() {
      if (instance == null) {
        instance = new Constructor();
      }
      return instance;
    }

    return getInstance();
  })(false)
}

window.debug = function(str, options){
  if (global.debug){
    console.log(str);
  }
}