/**
 * @description Index
 * @namespace Index
 * @author yongjin on 2014/11/18
 */
define('Main', ['jquery', 'underscore', 'backbone', 'HandlebarsHelper', 'template/main'], function(require, exports, module){
  var Main, Backbone, template, HandlebarsHelper;

  Backbone = require('backbone');
  HandlebarsHelper = require('HandlebarsHelper');
  template = require('template/main');


  Main = Backbone.View.extend({
    el: '#jhw-main',
    template: HandlebarsHelper.compile(template),
    initialize: function(){
      this.$el.html(this.template({}));
      this.initCombox();
    },
    initCombox: function(){
      var container = {};

    },
    render: function(){
      //this.$el.html(this.template({}));
      return this;
    }
  });

  module.exports = Main;
});