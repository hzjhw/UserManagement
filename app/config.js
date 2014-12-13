/**
 * @description config
 * @namespace config
 * @author yongjin on 2014/7/18
 */
/**
 * seajs 配置
 * */
seajs.config({

  // Sea.js 的基础路径
  base: CONST.HOST,

  // 别名配置
  alias: Est.extend({
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
    'BaseComposite': 'base/BaseComposite'
  }, app.getModules()),

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
    [/base\/(.*).js/, 'dist/base/$1-min.js'], //['.js', '-min.js'] ,
    ['.js', '.js?20141105']
  ],

  // 调试模式
  debug: false,

  // 文件编码
  charset: 'utf-8'
});

/**
 * 注册模板
 * */
Est.each(app.getTemplates(), function (value, key) {
  define(key, value);
});

/**
 * 路由
 * */
seajs.use(['jquery', 'underscore', 'backbone'],
  function ($, _, Backbone) {
    var b_routes = { routes: { '': 'index'},defaults: function () {
      //$(document.body).append("This route is not hanled.. you tried to access: " + other);
    } };
    Est.each(app.getRoutes(), function (value, key) {
      var fnName = key.replace(/\//g, '');
      b_routes.routes[key] = fnName;
      b_routes[fnName] = value;
    });
    var router = Backbone.Router.extend(b_routes);
    new router;
    Backbone.history.start();
  });

/**
 * 调试
 * */
window.debug = function (str, options) {
  if (CONST.DEBUG) {
    console.log(str);
  }
}