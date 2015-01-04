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
  /**
   * 字符串截取
   * @author wyj
   * @time 2014-03-27
   * @example
   *    {{cutByte name 5 end='...'}}
   */
  Handlebars.registerHelper('cutByte', function (str, len, options) {
    return Est.cutByte(str, len, options.hash.end || '...');
  });

  /**
   * 证书分类
   * @author wyj
   * @time 2014-03-27
   * @example
   *
   */
  Handlebars.registerHelper('certType', function (str, options) {
    var result = '';
    switch (str) {
      case '01':
        result = '基本证书';
        break;
      case '02':
        result = '一般证书';
        break;
      case '03':
        result = '税务证书';
        break;
      case '04':
        result = '荣誉证书';
        break;
      case '05':
        result = '其它证书';
        break;
    }
    return result;
  });

  /**
   * 订单状态
   * @author wyj
   * @time 2014-03-27
   * @example
   *
   */
  Handlebars.registerHelper('orderStatus', function (str, options) {
    var result = '';
    switch (str) {
      case 'unprocessed':
        result = '<span style="color: red;">未处理</span>';
        break;
      case 'processed':
        result = '<span style="color: orange;">已处理</span>';
        break;
      case 'completed':
        result = '<span style="color: #008000;">已支付</span>';
        break;
      case 'invalid':
        result = '<span style="color: gray;">已作废</span>';
        break;
      default:
        result = '无状态';
    }
    return result;
  });


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
  /**
   * 复杂条件
   *
   * @author wyj 14.12.31
   * @example
   *  {{#xif "this.orderStatus != 'completed' && this.orderStatus != 'invalid' && this.paymentStatus == 'unpaid' &&
        this.shippingStatus == 'unshipped'"}}disabled{{/xif}}
   *
   */
  Handlebars.registerHelper("xif", function (expression, options) {
    return Handlebars.helpers["x"].apply(this, [expression, options]) ? options.fn(this) : options.inverse(this);
  });
  Handlebars.registerHelper('condition', function (str, options) {
    return Est.template('{{' + str + '}}', this) ? options.fn(this) :
      options.inverse(this);
  });
  /**
   * 付款状态
   * @author wyj
   * @time 2014-03-27
   * @example
   *
   */
  Handlebars.registerHelper('paymentStatus', function (str, options) {
    var result = '';
    switch (str) {
      case 'unpaid':
        result = '<span style="color: red;">未支付</span>';
        break;
      case 'partPayment':
        result = '<span style="color: orange;">部分支付</span>';
        break;
      case 'paid':
        result = '<span style="color: green;">已支付</span>';
        break;
      case 'partRefund':
        result = '<span style="color: orange;">部分退款</span>';
        break;
      case 'refunded':
        result = '全额退款';
        break;
      default:
        result = '无记录';
    }
    return result;
  });
  /**
   * 配送状态
   * @author wyj
   * @time 2014-03-27
   * @example
   *
   */
  Handlebars.registerHelper('shippingStatus', function (str, options) {
    var result = '';
    switch (str) {
      case 'unshipped':
        result = '<span style="color: red;">未发货</span>';
        break;
      case 'partShipped':
        result = '<span style="color: orange;">部分发贫</span>';
        break;
      case 'shipped':
        result = '<span style="color: green;">已发货</span>';
        break;
      case 'partReshiped':
        result = '部分退货';
        break;
      case 'reshiped':
        result = '已退货';
        break;
      default:
        result = '无记录';
    }
    return result;
  });

  /**
   * 返回整数
   * @author wxw
   * @time 2014-12-16
   * @example
   *
   */
  Handlebars.registerHelper('parseInt', function (result, options) {
    return parseInt(result, 10);
  });

  /**
   * 返回全局常量
   * @author wyj 14.12.17
   */
  Handlebars.registerHelper('CONST', function (name, options) {
    return Est.getValue(CONST, name);
  });

  /**
   * 判断是否为空
   * @author wyj 14.12.27
   */
  Handlebars.registerHelper('isEmpty', function (value, options) {
    return Est.isEmpty(value) ? options.fn(this) :
      options.inverse(this);
  });

  /**
   * 图片尺寸
   * @author wyj
   * @time 2014-03-31
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
   * 属性项类型
   * @author wyj
   * @time 2014-03-31
   */
  Handlebars.registerHelper('attributeType', function (str, options) {
    var result = '';
    switch (str) {
      case 'text':
        result = '文本';
        break;
      case 'number':
        result = '数字';
        break;
      case 'alphaint':
        result = '字母';
        break;
      case 'select':
        result = '单选项';
        break;
      case 'checkbox':
        result = '多选项';
        break;
      case 'date':
        result = '日期';
        break;
    }
    return result;
  });

  module.exports = Handlebars;

});