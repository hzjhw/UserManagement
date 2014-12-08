/**
 * @description Login js
 * @namespace Login
 * @author jihui-wxw on 14-11-17
 */

define('Login', ['jquery', 'LoginModel', 'HandlebarsHelper', 'BaseDetail','template/login'],
    function (require, exports, module) {
        var Login, LoginModel, HandlebarsHelper, Est, BaseDetail, template;

        LoginModel = require('LoginModel');
        HandlebarsHelper = require('HandlebarsHelper');
        BaseDetail = require('BaseDetail');
        template = require('template/login');

      /**
       * 列表视图
       */

        Login = BaseDetail.extend({
            el: '#jhw-login',
            initialize: function () {
                console.log('2.Login.initialize');
              this._initialize({
                template: $('#login_template').html(),
                model: LoginModel
              });
            },
            render: function () {
             var ctx=this;
                console.log('4.Login.render');
                this._render();
                this._form('#J_Form')._validate()._init({
                  onAfterSave: function(response){
                    if(response.attributes.success == false ){
                      ctx.refreshCode();
                      return true;
                    }
                    window.location.href = '/member/index.html';
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
        module.exports = Login;


    });