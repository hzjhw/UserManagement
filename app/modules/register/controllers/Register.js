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
            BaseUtils.tip('请验证邮箱后再登录!');
            window.location.href = '/member/modules/login/login.html';
          }
        });
        this.validate();
        return this;
      },
      events : {
        'click .refreshCode': 'refreshCode',
        'blur #model-username' : 'validatea',
        'blur #model-email' : 'validatea'
      },
      refreshCode: function(){
        var $verifyPic = this.$("#verifyPic");
        $verifyPic.attr("src", $verifyPic.attr("src") + '?time=' + new Date().getTime())
      },
      validate : function(){
        BUI.use('bui/form',function(Form) {
          var form = new Form.Form({
            srcNode: '#J_Form'
          }).render();
          var emailField = form.getField('vali-email'),
            usernameField = form.getField('vali-username');
          emailField.set('remote', {
            url: 'http://jihui88.com/rest/api/user/validate',
            dataType: 'json',//默认为字符串
            callback: function (data) {
              if (data.success) {
                return '';
              } else {
                return data.msg;
              }
            }
          });
          usernameField.on('remotestart', function (ev) { //异步校验前触发，可以附加参数
          });
        });
      }
    });
    module.exports = Register;


  });