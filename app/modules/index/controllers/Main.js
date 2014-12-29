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
        $("#jhw .module01 .bodyContTitle span.qiehuan001").css({"color":"#646464","background":"#fafafa","border-bottom":"1px solid #fafafa"});
        $("#jhw .module01 .bodyContTitle span.qiehuan001").mouseover(function(){
            $("#jhw .module01 .bodyContContent01").show();
            $("#jhw .module01 .bodyContContent02,#jhw .module01 .bodyContContent03").hide();
            $("#jhw .module01 .bodyContTitle span.qiehuan001").css({"color":"#646464","background":"#fafafa","border-bottom":"1px solid #fafafa"});
            $("#jhw .module01 .bodyContTitle span.qiehuan002,#jhw .module01 .bodyContTitle span.qiehuan003").css({"color":"#646464","background":"#fff","border":"1px solid #e7e7e7"});
        });
        $("#jhw .module01 .bodyContTitle span.qiehuan002").mouseover(function(){
            $("#jhw .module01 .bodyContContent02").show();
            $("#jhw .module01 .bodyContContent01,#jhw .module01 .bodyContContent03").hide();
            $("#jhw .module01 .bodyContTitle span.qiehuan002").css({"color":"#646464","background":"#fafafa","border-bottom":"1px solid #fafafa"});
            $("#jhw .module01 .bodyContTitle span.qiehuan001,#jhw .module01 .bodyContTitle span.qiehuan003").css({"color":"#646464","background":"#fff","border":"1px solid #e7e7e7"});
        });
        $("#jhw .module01 .bodyContTitle span.qiehuan003").mouseover(function(){
            $("#jhw .module01 .bodyContContent03").show();
            $("#jhw .module01 .bodyContContent01,#jhw .module01 .bodyContContent02").hide();
            $("#jhw .module01 .bodyContTitle span.qiehuan003").css({"color":"#646464","background":"#fafafa","border-bottom":"1px solid #fafafa"});
            $("#jhw .module01 .bodyContTitle span.qiehuan001,#jhw .module01 .bodyContTitle span.qiehuan002").css({"color":"#646464","background":"#fff","border":"1px solid #e7e7e7"});
        });
      return this;
    }
  });

  module.exports = Main;
});
