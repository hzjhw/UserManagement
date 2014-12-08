/**
 * @description Index
 * @namespace Index
 * @author yongjin on 2014/11/18
 */
define('Main', ['BaseView', 'template/main'], function(require, exports, module){
  var Main, BaseView, template;

  BaseView = require('BaseView');
  template = require('template/main');


  Main = BaseView.extend({
    el: '#jhw-main',
    initialize: function(){
      this._initialize({
        template: template,
        data: {
          src: 'images/main.jpg'
        }
      });
    },
    render: function(){
      this._render();
      return this;
    }
  });

  module.exports = Main;
});