/**
 * @description 配置文件
 * @class config
 * @author yongjin on 2015/2/3
 */

/**
 * seajs 配置
 * */
seajs.config({

  // Sea.js 的基础路径
  base: CONST.HOST,

  // 别名配置
  alias: Application.extend({
    'Zepto': CONST.HOST + '/vendor/zepto/zepto.min.js',
    'jquery': CONST.HOST + '/vendor/jquery/jquery-1.10.2.js',
    'handlebars': CONST.HOST + '/vendor/handlebars/handlebars-min.js',
    'HandlebarsHelper': CONST.HOST + '/scripts/helper/HandlebarsHelper.js',
    'FullPage': CONST.HOST + '/vendor/FullPage/FullPage.js',
    'WwyLeafletFullPage': CONST.HOST + '/modules/wwy/leaflet/modules/FullPage/WwyLeafletFullPage.js'
  }, app.getModules()),

  // 路径配置
  paths: {
    //bui: CONST.HOST + '/vendor/bui'
  },

  // 变量配置
  vars: {
    'locale': 'zh-cn'
  },

  // 映射配置
  map: [
    [/lib\/(.*).js/, CONST.LIB_FORDER + '/$1.js'], //['.js', '-min.js'] ,
    [ /^(.*\.(?:css|js|html))(.*)$/i, '$1?' + CONST.APP_VERSION]
  ],

  // 调试模式
  debug: typeof CONST.DEBUG_SEAJS === 'undefined' ? false :
    CONST.DEBUG_SEAJS,

  // 文件编码
  charset: 'utf-8'
});

/**
 * 注册模板
 * */
Application.each(app.getTemplates(), function (value, key) {
  define(key, value);
});