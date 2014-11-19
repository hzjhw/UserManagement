/**
 * @description Pagination
 * @namespace Pagination
 * @author yongjin on 2014/11/6
 */
define('Pagination', ['jquery', 'underscore', 'backbone', 'HandlebarsHelper', 'Est', 'template/pagination'],
  function (require, exports, module) {
    var Backbone, Est, HandlebarsHelper, Pagination, template;

    Backbone = require('backbone');
    Est = require('Est');
    HandlebarsHelper = require('HandlebarsHelper');
    template = require('template/pagination') || 'pagination.html[404]';

    //分页模板
    var Pagination = Backbone.View.extend({

      el: "#pagination-container",
      tagName: "div",
      template: HandlebarsHelper.compile(template),

      initialize: function () {
        console.log('8.Pagination.initialize');
        this.render();
      },

      render: function () {
        console.log('9.Pagination.render');
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
    module.exports = Pagination;
  });
