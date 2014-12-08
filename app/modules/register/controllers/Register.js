/**
 * @description Register js
 * @namespace Register
 * @author jihui-wxw on 14-11-17
 */

define('Register', ['jquery', 'RegisterModel', 'HandlebarsHelper', 'BaseDetail','template/register_detail'],
  function (require, exports, module) {
    var Register, RegisterModel, HandlebarsHelper, BaseDetail, template;

    RegisterModel = require('RegisterModel');
    HandlebarsHelper = require('HandlebarsHelper');
    BaseDetail = require('BaseDetail');
    template = require('template/register_detail');

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
             ///window.location.href = '/member/modules/login/login.html';
           }
        });
        return this;
      },
      events : {
        'click .refreshCode': 'refreshCode'
      },
      refreshCode: function(){
        var $verifyPic = this.$("#verifyPic");
        $verifyPic.attr("src", $verifyPic.attr("src") + '?time=' + new Date().getTime())
      }

    });
    module.exports = Register;


  });