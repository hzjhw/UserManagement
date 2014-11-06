/**
 * @description PaginationView
 * @namespace PaginationView
 * @author yongjin on 2014/11/6
 */
define('PaginationView', ['jquery', 'underscore', 'backbone', 'handlebars', 'Est'],
    function (require, exports, module) {

        var Backbone = require('backbone');
        var Handlebars = require('handlebars');
        var Est = require('Est');

        Handlebars.registerHelper('pagination', function (page, totalPage, block) {
            var accum = '';
            var pages = Est.getPaginationNumber(page, totalPage, 9);
            for (var i = 0, len = pages.length; i < len; i++) {
                accum += block.fn(pages[i]);
            }
            return accum;
        });

        //分页模板
        var PaginationView = Backbone.View.extend({

            el: "#pagination-container",
            tagName: "div",
            template: Handlebars.compile(document.getElementById('pagination-template').innerHTML),

            initialize: function () {
                this.render();
            },

            render: function () {
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
