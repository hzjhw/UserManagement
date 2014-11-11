/**
 * @description HandlebarsHelper帮助类
 * @namespace HandlebarsHelper
 * @author yongjin on 2014/11/11
 */

define('HandlebarsHelper', ['handlebars', 'Est'], function (require, exports, module) {
    var Handlebars, Est;

    Handlebars = require('handlebars');
    Est = require('Est');

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
     *      {{#compare ../page this operator='!=='}}danaiPageNum{{else}}active{{/compare}}
     */
    Handlebars.registerHelper('compare', function (lvalue, rvalue, options) {
        if (arguments.length < 3)
            throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
        var operator = options.hash.operator || "==";
        var operators = {
            '==': function (l, r) {
                return l == r;
            },
            '===': function (l, r) {
                return l === r;
            },
            '!=': function (l, r) {
                return l != r;
            },
            '!==': function (l, r) {
                return l !== r
            },
            '<': function (l, r) {
                return l < r;
            },
            '>': function (l, r) {
                return l > r;
            },
            '<=': function (l, r) {
                return l <= r;
            },
            '>=': function (l, r) {
                return l >= r;
            },
            'typeof': function (l, r) {
                return typeof l == r;
            }
        }
        if (!operators[operator])
            throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);
        var result = operators[operator](lvalue, rvalue);
        if (options.hash.debug) {
            console.log("value1 :" + lvalue + "; value2 :" + rvalue + "; result : " + result);
        }
        if (result) {
            return options.fn(this);
        } else {
            return options.inverse(this);
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

    module.exports = Handlebars;

});