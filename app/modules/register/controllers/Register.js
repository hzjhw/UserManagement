/**
 * @description Register js
 * @namespace Register
 * @author jihui-wxw on 14-11-17
 */

define('Register', ['jquery', 'RegisterModel', 'HandlebarsHelper', 'BaseDetail','template/register_detail', 'BaseUtils'],
  function (require, exports, module) {
    var Register, RegisterModel, BaseUtils,HandlebarsHelper, BaseDetail,template;

    RegisterModel = require('RegisterModel');
    HandlebarsHelper = require('HandlebarsHelper');
    BaseDetail = require('BaseDetail');
    template = require('template/register_detail');
    BaseUtils = require('BaseUtils');

    Register = BaseDetail.extend({
      el: '#jhw-register',
      initialize: function () {
        console.log('2.Register.initialize');
        this._initialize({
          template: template,
          model: RegisterModel
        });
      },
      render: function () {
        var ctx=this;
        console.log('4.Register.render');
        this._render();
        this._form('#J_Form')._validate({
          url: CONST.API + '/user/validate',
          fields: ['vali-username', 'vali-email']
        })._init({
          onAfterSave : function(response){
            if(response.attributes.success == false ){
              ctx.refreshCode();
              return true;
            }
            this.$("#register-success").show();
            //BaseUtils.dialog('请验证邮箱后再登录![登录我的邮箱]');
            //window.location.href = '/member/modules/register/register_successful.html';
          }
        });
        return this;
      },
      events : {
        'click .refreshCode': 'refreshCode',
        'click .toMail': 'toMail'
      },
      toMail: function(){
        val = this.model.get('email');
        var houzhui = val.split('@')[1]; //后缀名
        if (houzhui.indexOf("gmail") != -1) { //谷歌
          window.open("http://mail.google.com");
        }
        else if (houzhui.indexOf("hotmail") != -1 || houzhui.indexOf("msn") != -1) {//微软
          window.open("http://mail.live.com");
        } else {
          window.open("http://mail." +houzhui);
        }
      },
      refreshCode: function(){
        var $verifyPic = this.$("#verifyPic");
        $verifyPic.attr("src", $verifyPic.attr("src") + '?time=' + new Date().getTime())
      }
    });
    module.exports = Register;


  });