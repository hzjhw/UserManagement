/**
 * @description Index
 * @namespace Index
 * @author yongjin on 2014/11/18
 */
define('Main', ['jquery', 'underscore', 'backbone', 'HandlebarsHelper'], function(require, exports, module){
  var Main, Backbone, template, HandlebarsHelper;

  Backbone = require('backbone');
  HandlebarsHelper = require('HandlebarsHelper');
  template = require('http://jihui88.com/member/modules/index/views/main.html');


  Main = Backbone.View.extend({
    el: '#jhw-main',
    template: HandlebarsHelper.compile(template),
    initialize: function(){
      this.$el.html(this.template({}));
      this.initCombox();
    },
    initCombox: function(){
      var container = {};
      BUI.use('bui/select', function (Select) {
        container['#test1'] = new Select.Combox({
          render: '#test1',
          showTag: true,
          valueField: '#value1',
          elCls: 'bui-tag-follow',
          width: 400,
          items: ['1', '2']
        });
        container['#test1'].render();
      })

      BUI.use('bui/select', function (Select) {
        var indexSelect = new Select.Select({
          render: '#index-s1',
          valueField: '#index-hide',
          width: 400,
          items: ['1', '2', '3', '4']
        });
        indexSelect.render();
      })
    },
    render: function(){
      //this.$el.html(this.template({}));
      return this;
    }
  });

  module.exports = Main;
});