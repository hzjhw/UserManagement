/**
 * @description Login
 * @namespace Login
 * @author Administrator on 14-11-17
 */

define('Login', ['jquery', 'LoginModel', 'HandlebarsHelper', 'Est', 'BaseDetail'],
    function (require, exports, module) {
        var Login, LoginModel, HandlebarsHelper, Est, BaseDetail, template;

        LoginModel = require('LoginModel');
        HandlebarsHelper = require('HandlebarsHelper');
        Est = require('Est');
        BaseDetail = require('BaseDetail');

        Login = BaseDetail.extend({
            el: '#jhw-login',
            template: HandlebarsHelper.compile($('#login_template').html()),
            initialize: function () {
                console.log('2.Login.initialize');
                this.initModel(LoginModel, this);
            },
            render: function () {
                console.log('4.Login.render');
                this.$el.html(this.template(this.model.toJSON()));
                this.form('#J_Form').validate().init();
                return this;
            },
            events : {
                'click .refreshCode': 'refreshCode'
            },
            save: function(){
                this.saveItem(function () {
                    window.location.href = '/member/index.html';
                });
            },
            refreshCode: function(){
                var $verifyPic = this.$("#verifyPic");
                $verifyPic.attr("src", $verifyPic.attr("src") + '?time=' + new Date().getTime())
            }
        });
        module.exports = Login;
    });