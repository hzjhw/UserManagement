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
                var ctx = this;
                this.$el.html(this.template(this.model.toJSON()));
                this.form('#J_Form').validate().init();
                return this;
            },
            events : {
                "click input[type=button]" : "click_login"
            },
            click_login : function(event){

            }
        });
        module.exports = Login;
    });