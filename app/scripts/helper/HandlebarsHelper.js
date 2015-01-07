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
    Est.each(app.getData('orderStatus'), function(item){
      if (item.value === str){
        result = item.html;
        return false;
      }
    });
    return result;
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
    Est.each(app.getData('paymentStatus'), function(item){
      if (item.value === str){
        result = item.html;
        return false;
      }
    });
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
    Est.each(app.getData('shippingStatus'), function(item){
      if (item.value === str){
        result = item.html;
        return false;
      }
    });
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
// 订单日志类型
  Handlebars.registerHelper('orderLogType', function(str, options){
    var result  ='';
    switch(str){
      case 'create':
        result = '订单创建';break;
      case 'modify':
        result = '订单修改'; break;
      case 'payment':
        result = '订单支付';break;
      case 'refund':
        result = '订单退款';break;
      case 'shipping':
        result = '订单发货'; break;
      case 'reship':
        result = '订单退货'; break;
      case 'completed':
        result = '订单完成';break;
      case 'invlid':
        result = '订单作废'; break;
    }
    return result;
  });
  // 收款类型
  Handlebars.registerHelper('paymentType', function(str, options){
    var result  ='';
    switch(str){
      case 'recharge':
        result = '在线充值';break;
      case 'deposit':
        result = '预存款支付'; break;
      case 'online':
        result = '在线支付';break;
      case 'offline':
        result = '线下支付';break;
    }
    return result;
  });

  module.exports = Handlebars;

});