/**
 * @description HandlebarsHelper帮助类
 * @namespace HandlebarsHelper
 * @author yongjin on 2014/11/11
 */

define('HandlebarsHelper', ['handlebars'], function (require, exports, module) {
  var Handlebars;

  Handlebars = require('handlebars');

  /**
   * 分页
   * @author wyj
   * @time 2014-03-27
   * @example
   *      {{#pagination page totalPage}}
   <li class="bui-bar-item bui-button-number bui-inline-block {{#compare ../page this operator='!=='}}danaiPageNum{{else}}active{{/compare}}" data-page="{{this}}" aria-disabled="false" id="{{this}}" aria-pressed="false"><a href="javascript:;">{{this}}</a></li>
   {{/pagination}}
   */
  Handlebars.registerHelper('pagination', function (page, totalPage, block) {
    var accum = '';
    var pages = Est.getPaginationNumber(page, totalPage, 9);
    for (var i = 0, len = pages.length; i < len; i++) {
      accum += block.fn(pages[i]);
    }
    return accum;
  });

  /**
   * 比较
   * @author wyj
   * @time 2014-03-27
   * @example
   *      {{#compare ../page '!==' this}}danaiPageNum{{else}}active{{/compare}}
   */
  Handlebars.registerHelper('compare', function (v1, operator, v2, options) {
    if (arguments.length < 3)
      throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
    try {
      switch (operator.toString()) {
        case '==':
          return (v1 == v2) ? options.fn(this) :
            options.inverse(this);
        case '!=':
          return (v1 != v2) ? options.fn(this) :
            options.inverse(this);
        case '===':
          return (v1 === v2) ? options.fn(this) :
            options.inverse(this);
        case '!==':
          return (v1 !== v2) ? options.fn(this) :
            options.inverse(this);
        case '<':
          return (v1 < v2) ? options.fn(this) :
            options.inverse(this);
        case '<=':
          return (v1 <= v2) ? options.fn(this) :
            options.inverse(this);
        case '>':
          return (v1 > v2) ? options.fn(this) :
            options.inverse(this);
        case '>=':
          return (v1 >= v2) ? options.fn(this) :
            options.inverse(this);
        case '&&':
          return (v1 && v2) ? options.fn(this) :
            options.inverse(this);
        case '||':
          return (v1 || v2) ? options.fn(this) :
            options.inverse(this);
        default:
          return options.inverse(this);
      }
    } catch (e) {
      console.log('【Errow】: hbs.compare v1=' + v1 + ';v2=' + v2 + e);
    }
  });

  /**
   * 时间格式化
   * @author wyj
   * @time 2014-03-27
   * @example
   *      {{dateFormat $.detail_news.add_time $.lan.news.format}}
   */
  Handlebars.registerHelper('dateFormat', function (date, fmt, options) {
    return Est.dateFormat(date, fmt);
  });

  /**
   * 判断字符串是否包含
   * @author wyj 14.11.17
   * @example
   *      {{#contains ../element this}}checked="checked"{{/contains}}
   */
  Handlebars.registerHelper('contains', function (target, thisVal, options) {
    if (Est.isEmpty(target)) return;
    return Est.contains(target, thisVal) ? options.fn(this) : options.inverse(this);
  });

  /**
   * 两数相加
   * @author wyj
   * @time 2014-03-27
   */
  Handlebars.registerHelper('add', function (num1, num2, opts) {
    return parseInt(num1, 10) + parseInt(num2, 10);
  });
  /**
   * 两数相减
   * @author wyj
   * @time 2014-03-27
   */
  Handlebars.registerHelper('minus', function (num1, num2, opts) {
    return parseInt(num1, 10) - parseInt(num2, 10);
  });

  module.exports = Handlebars;

});