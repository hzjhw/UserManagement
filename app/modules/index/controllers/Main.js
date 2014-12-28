/**
 * @description Index
 * @namespace Index
 * @author yongjin on 2014/11/18
 */
define('Main', ['BaseView', 'UserModel', 'template/main'], function(require, exports, module){
  var Main, BaseView, template;

  BaseView = require('BaseView');
  template = require('template/main');


  Main = BaseView.extend({
    initialize: function(){
      this._initialize({
        template: template,
        data: app.getData('user')
      });
      this.render();
    },
    render: function(){
      this._render();
      return this;
    }
  });

  module.exports = Main;
});
$(function(){
    $("#jhw .module01 .bodyContTitle span.zxgg").css({"color":"#646464","background":"#fafafa","border-bottom":"1px solid #fafafa"});
    $("#jhw .module01 .bodyContTitle span.zxgg").mouseover(function(){
        $("#jhw .module01 .bodyContContent01").show();
        $("#jhw .module01 .bodyContContent02").hide();
        $("#jhw .module01 .bodyContTitle span.zxgg").css({"color":"#646464","background":"#fafafa","border-bottom":"1px solid #fafafa"});
        $("#jhw .module01 .bodyContTitle span.czzn").css({"color":"#646464","background":"#fff","border":"1px solid #e7e7e7"});
    });
    $("#jhw .module01 .bodyContTitle span.czzn").mouseover(function(){
        $("#jhw .module01 .bodyContContent02").show();
        $("#jhw .module01 .bodyContContent01").hide();
        $("#jhw .module01 .bodyContTitle span.czzn").css({"color":"#646464","background":"#fafafa","border-bottom":"1px solid #fafafa"});
        $("#jhw .module01 .bodyContTitle span.zxgg").css({"color":"#646464","background":"#fff","border":"1px solid #e7e7e7"});
    });
})