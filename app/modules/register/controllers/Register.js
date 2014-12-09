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
        this._form('#J_Form')._validate()._init({
           onAfterSave : function(response){
             if(response.attributes.success == false ){
               ctx.refreshCode();
               return true;
             }
             BaseUtils.tip('请验证邮箱后再登录!');
             window.location.href = '/member/modules/login/login.html';
           }
        });
        return this;
      },
      events : {
        'click .refreshCode': 'refreshCode',
        'blur #model-username' : 'model_username',
        'blur #model-email' : 'model_email'
      },
      refreshCode: function(){
        var $verifyPic = this.$("#verifyPic");
        $verifyPic.attr("src", $verifyPic.attr("src") + '?time=' + new Date().getTime())
      },
      model_username : function(){
        var form=this;
        var bField = form.formValidate.getField('valiValue');
        bField.set('remote',{
          url : CONST.API+"/user/validate?valiType=username",
          dataType:'json',//默认为字符串
          callback : function(data){
            if(data.success){
              return '..';
            }else{
              return data.msg;
            }
          }
        });

      },
      model_email : function(){
         var form=this;
         var bField = form.formValidate.getField('valikey');
         bField.set('remote',{
             url : CONST.API+"/user/validate?valiType=email",
             dataType:'json',//默认为字符串
             callback : function(data){
             if(data.success){
                 return '..';
             }else{
                return data.msg;
             }
             }
         });

      }
    });
    module.exports = Register;


  });