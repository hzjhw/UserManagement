/**
 * @description Login js
 * @namespace Login
 * @author jihui-wxw on 14-11-17
 */

define('Login', ['jquery', 'LoginModel', 'HandlebarsHelper', 'Est', 'BaseDetail','template/login'],
    function (require, exports, module) {
        var Login, LoginModel, HandlebarsHelper, Est, BaseDetail, template;

        LoginModel = require('LoginModel');
        HandlebarsHelper = require('HandlebarsHelper');
        Est = require('Est');
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
                console.log('4.Login.render');
                this._render();
                this._form('#J_Form')._validate()._init(function(){

                });
                return this;
            },
            events : {
                'click .refreshCode': 'refreshCode'
            },
            save: function(){
                this._saveItem(function () {
                    window.location.href = '/member/index.html';
                }, this);
            },
            refreshCode: function(){
                var $verifyPic = this.$("#verifyPic");
                $verifyPic.attr("src", $verifyPic.attr("src") + '?time=' + new Date().getTime())
            }
        });
        module.exports = Login;


    });