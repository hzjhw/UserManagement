/**
 * @description PaginationView
 * @namespace PaginationView
 * @author yongjin on 2014/11/6
 */
define('PaginationView', ['jquery', 'underscore', 'backbone', 'HandlebarsHelper', 'Est'],
    function (require, exports, module) {

        var Backbone = require('backbone');
        var Est = require('Est');
        var HandlebarsHelper = require('HandlebarsHelper');
        var template = require('http://jihui88.com/member/common/pagination/pagination.html') || 'pagination.html[404]';

        //分页模板
        var PaginationView = Backbone.View.extend({

            el: "#pagination-container",
            tagName: "div",
            template: HandlebarsHelper.compile(template),

            initialize: function () {
                console.log('8.PaginationView.initialize');
                this.render();
            },

            render: function () {
                console.log('9.PaginationView.render');
                var ctx = this;

                this.model.set('totalPage', Est.getMaxPage(this.model.get('count'), this.model.get('pageSize')));
                var $html = $(this.template(this.model.toJSON()));

                $(".danaiPageNum", $html).bind('click', function () {
                    var num = $(this).attr('data-page');
                    ctx.toPage(num);
                });

                this.$el.html($html);
                return this;
            },

            toPage: function (num) {
                this.model.set('page', num);
                this.model.trigger('reloadList', this.model);
            }
        });
        module.exports = PaginationView;
    });
