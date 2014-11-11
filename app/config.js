/**
 * @description config
 * @namespace config
 * @author yongjin on 2014/7/18
 */

var host = 'http://jihui88.com/member';

seajs.config({

    // Sea.js 的基础路径
    base: host,

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
        'marionette': 'vendor/backbone/backbone.marionette.js',
        'handlebars': 'vendor/handlebars/handlebars-debug.js',
        'HandlebarsHelper': 'scripts/helper/HandlebarsHelper.js',
        'BaseCollection': 'base/BaseCollection.js',
        'BaseModel': 'base/BaseModel.js',
        'BaseRoot': 'base/BaseRoot',
        // user
        'AbcUser': 'models/AbcUser.js',

        // common
        'PaginationModel': 'common/pagination/PaginationModel.js',
        'PaginationView': 'common/pagination/PaginationView.js',

        // todo
        'TodoModel': 'demo/todo/models/TodoModel.js',
        'TodoView': 'demo/todo/views/TodoView.js',
        'TodoItem': 'demo/todo/views/TodoItem.js',
        'TodosCollection': 'demo/todo/collections/TodosCollection.js',

        // category
        'CategoryModel': 'models/CategoryModel.js',

        // product
        'ProductModel': 'models/ProductModel.js',
        'ProductTypeModel': 'models/ProductTypeModel.js',
        'ProductCollection': 'modules/product/collections/ProductCollection.js',
        'ProductCategoryCollection': 'modules/product/collections/ProductCategoryCollection.js',
        'ProductTypeCollection': 'modules/product/collections/ProductTypeCollection.js',
        'ProductItem': 'modules/product/views/ProductItem.js',
        'ProductCategoryItem': 'modules/product/views/ProductCategoryItem.js',
        'ProductTypeItem': 'modules/product/views/ProductTypeItem.js',
        'ProductView': 'modules/product/views/ProductView.js',
        'ProductCategoryView': 'modules/product/views/ProductCategoryView.js',
        'ProductTypeView': 'modules/product/views/ProductTypeView.js',
        'ProductDetail': 'modules/product/views/ProductDetail.js',
        'ProductCategoryDetail': 'modules/product/views/ProductCategoryDetail.js',
        'ProductTypeDetail': 'modules/product/views/ProductTypeDetail.js'
    },

    // 路径配置
    paths: {
        bui : host + '/vendor/bui'
    },

    // 变量配置
    vars: {
        'locale': 'zh-cn'
    },

    // 映射配置
    map: [
        [/bui\/(.*).js/,'bui/$1-min.js'], //['.js', '-min.js'] ,仅bui目录下使用-min.js
        ['http://example.com/js/app/', 'http://localhost/js/app/'],
        ['.js', '.js?20141105']
    ],

    // 调试模式
    debug: true,

    // 文件编码
    charset: 'utf-8'
});



(function() {

/**
     * Sea.js mini 2.3.0 | seajs.org/LICENSE.md
     */
    var define;
    var require;
    (function(global, undefined) {

        /**
         * util-lang.js - The minimal language enhancement
         */

        function isType(type) {
            return function(obj) {
                return {}.toString.call(obj) == "[object " + type + "]"
            }
        }
        var isFunction = isType("Function")
/**
         * module.js - The core of module loader
         */

        var cachedMods = {}

        function Module() {}
        // Execute a module
        Module.prototype.exec = function() {
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
        define = function(id, deps, factory) {
            var meta = {
                id: id,
                deps: deps,
                factory: factory
            }
            Module.save(meta)
        }
        // Save meta data to cachedMods
        Module.save = function(meta) {
            var mod = Module.get(meta.id)
            mod.id = meta.id
            mod.dependencies = meta.deps
            mod.factory = meta.factory
        }
        // Get an existed module or create a new one
        Module.get = function(id) {
            return cachedMods[id] || (cachedMods[id] = new Module())
        }
        // Public API
        require = function(id) {
            var mod = Module.get(id)
            if (!mod.execed) {
                mod.exec()
            }
            return mod.exports
        }
    })(this);
    define("bui/config", [], function(require, exports, module) {
        //from seajs
        var BUI = window.BUI = window.BUI || {};
        BUI.use = seajs.use;
        BUI.config = seajs.config;
    });
    require("bui/config");
})();
if(!window.console){
    console = (function(debug){
        var instance = null;
        function Constructor(){
            if (debug){
                this.div = document.createElement("console");
                this.div.id = "console";
                this.div.style.cssText = "filter:alpha(opacity=80);padding:10px;line-height:14px;position:absolute;right:0px;top:0px;width:30%;border:1px solid #ccc;background:#eee;";
                document.body.appendChild(this.div);
            }
        }
        Constructor.prototype = {
            log : function(str){
                if (debug){
                    var p = document.createElement("p");
                    p.innerHTML = str;
                    this.div.appendChild(p);
                }
            }
        }
        function getInstance(){
            if(instance == null){
                instance =  new Constructor();
            }
            return instance;
        }
        return getInstance();
    })(false)
}