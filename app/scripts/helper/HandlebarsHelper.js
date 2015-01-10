/**
 * @description HandlebarsHelper模板引擎帮助类
 * @class HandlebarsHelper - 标签库
 * @author yongjin on 2014/11/11
 */

define('HandlebarsHelper', ['handlebars'], function (require, exports, module) {
  var Handlebars;

  Handlebars = require('handlebars');

  /**
   * 分页
   * @method [分页] - pagination
   * @author wyj 2014-03-27
   * @example
   *        {{#pagination page totalPage}}
   <li class="bui-bar-item bui-button-number bui-inline-block {{#compare ../page this operator='!=='}}danaiPageNum
   {{else}}active{{/compare}}" data-page="{{this}}" aria-disabled="false" id="{{this}}" aria-pressed="false">
   <a href="javascript:;">{{this}}</a></li>
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
   * @method [判断] - compare
   * @author wyj 2014-03-27
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
        case 'indexOf':
          return (v1.indexOf(v2) > -1) ? options.fn(this) :
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
   * @method [时间] - dateFormat
   * @author wyj 2014-03-27
   * @example
   *      {{dateFormat $.detail_news.add_time $.lan.news.format}}
   */
  Handlebars.registerHelper('dateFormat', function (date, fmt, options) {
    return Est.dateFormat(date, fmt);
  });

  /**
   * 判断字符串是否包含
   * @method [判断] - contains
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
   * @method [运算] - plus
   * @author wyj 2014-03-27
   * @example
   *      {{plus 1 2}} => 3
   */
  Handlebars.registerHelper('plus', function (num1, num2, opts) {
    return parseInt(num1, 10) + parseInt(num2, 10);
  });
  /**
   * 两数相减
   * @method [运算] - minus
   * @author wyj 2014-03-27
   * @example
   *        {{minus 10 5}} => 5
   */
  Handlebars.registerHelper('minus', function (num1, num2, opts) {
    return parseInt(num1, 10) - parseInt(num2, 10);
  });

  /**
   * 字符串截取
   * @method [字符串] - cutByte
   * @author wyj 2014-03-27
   * @example
   *      {{cutByte name 5 end='...'}}
   */
  Handlebars.registerHelper('cutByte', function (str, len, options) {
    return Est.cutByte(str, len, options.hash.end || '...');
  });

  /**
   * 复杂条件
   * @method [判断] - xif
   * @author wyj 14.12.31
   * @example
   *      {{#xif "this.orderStatus != 'completed' && this.orderStatus != 'invalid' && this.paymentStatus == 'unpaid' &&
              this.shippingStatus == 'unshipped'"}}disabled{{/xif}}
   *
   */
  Handlebars.registerHelper("x", function (expression, options) {
    var fn = function () {
    }, result;
    try {
      fn = Function.apply(this,
        [ 'window', 'return ' + expression + ';' ]);
    } catch (e) {
      console.warn('[warning] {{x ' + expression + '}} is invalid javascript', e);
    }
    try {
      result = fn.bind(this)(window);
    } catch (e) {
      console.warn('[warning] {{x ' + expression + '}} runtime error', e);
    }
    return result;
  });
  Handlebars.registerHelper("xif", function (expression, options) {
    return Handlebars.helpers["x"].apply(this, [expression, options]) ? options.fn(this) : options.inverse(this);
  });

  /**
   * 所有状态
   * @method [状态] - status
   * @author wyj 15.1.7
   */
  Est.each(app.getAllStatus(), function (val, key) {
    Handlebars.registerHelper(key, function (str, options) {
      var result = '';
      if (Est.isEmpty(options)) {
        return this[key];
      }
      Est.each(val, function (item) {
        if (item.value === str) {
          result = Est.isEmpty(item.html) ? item.text : item.html;
          return false;
        }
      });
      return result;
    });
  });

  /**
   * 返回整数
   *@method [数字] - parseInt
   * @author wxw 2014-12-16
   * @example
   *      {{parseInt 01}}
   */
  Handlebars.registerHelper('parseInt', function (result, options) {
    return parseInt(result, 10);
  });

  /**
   * 返回全局常量
   * @method [常量] - CONST
   * @author wyj 14.12.17
   * @example
   *        {{CONST 'HOST'}}
   */
  Handlebars.registerHelper('CONST', function (name, options) {
    return Est.getValue(CONST, name);
  });

  /**
   * 判断是否为空
   * @method [判断] - isEmpty
   * @author wyj 14.12.27
   * @example
   *      {{#isEmpty image}}<img src='...'></img>{{/isEmpty}}
   */
  Handlebars.registerHelper('isEmpty', function (value, options) {
    return Est.isEmpty(value) ? options.fn(this) :
      options.inverse(this);
  });

  /**
   * 图片尺寸
   * @method [图片] - picUrl
   * @author wyj 2014-03-31
   * @example
   *      <img src="{{CONST 'PIC_URL'}}/{{picUrl picPath 6}}" width="52" height="52">
   */
  Handlebars.registerHelper('picUrl', function (src, number, opts) {
    var url = src;
    if (arguments.length < 3) {
      return src || 'upload/no-pic.jpg';
    }
    if (src == null || src.length == 0) {
      return "";
    }
    var url2 = url.substring(url.lastIndexOf(".") + 1, url.length);
    url = url.substring(0, url.lastIndexOf(".")) + "_" + number + "." + url2;
    return url ? url : '';
  });

  /**
   * radio标签
   *
   * @method [表单] - radio
   * @author wyj 15.1.7
   * @example
   *        {{{radio name='isBest' value=isBest option='{"是": "01", "否": "00"}' }}}
   */
  Handlebars.registerHelper('radio', function (options) {
    var result = [];
    Est.each(JSON.parse(options.hash.option), function (val, key, list, index) {
      var checked = options.hash.value === val ? 'checked' : '';
      result.push('<label><input id="model' + index + '-' + options.hash.name + '" type="radio" name="' + options.hash.name + '" value="' + val + '" ' + checked + '>' + key + '</label>&nbsp;&nbsp;');
    });
    return result.join('');
  });

  module.exports = Handlebars;
});