/**
 * @description Login
 * @namespace Login
 * @author Administrator on 14-11-17
 */

define('Login', ['jquery', 'UserModel', 'HandlebarsHelper', 'Est', 'BaseDetail'],
    function (require, exports, module) {
        var Login, UserModel, HandlebarsHelper, Est, BaseDetail, template;

        UserModel = require('UserModel');
        HandlebarsHelper = require('HandlebarsHelper');
        Est = require('Est');
        BaseDetail = require('BaseDetail');

        Login = BaseDetail.extend({
            el: '#jhw-login',
            template: HandlebarsHelper.compile($('#login_template').html()),
            initialize: function () {
                console.log('2.Login.initialize');
                this.initModel(UserModel, this);
            },
            render: function () {
                console.log('4.Login.render');
                this.$el.html(this.template(this.model.toJSON()));
                this.form('#J_Form').validate().init();
                return this;
            },
            events : {
                "click input[type=button]" : "click_login",
                'click .refreshCode': 'refreshCode'
            },
            click_login : function(event){

            },
            refreshCode: function(){
                var $verifyPic = this.$("#verifyPic");
                $verifyPic.attr("src", $verifyPic.attr("src") + '?time=' + new Date().getTime())
            }
        });
        module.exports = Login;
    });