/**
 * @description TopView
 * @namespace TopView
 * @author yongjin on 2014/11/12
 */
define('TopView', ['jquery', 'underscore', 'backbone', 'HandlebarsHelper', 'UserModel'],
    function(require, exports, module){
        var TopView, Backbone, HandlebarsHelper, UserModel;

        Backbone = require('backbone');
        HandlebarsHelper = require('HandlebarsHelper');
        UserModel = require('UserModel');

        TopView = Backbone.View.extend({
            el: '#left-bar',
            template: HandlebarsHelper.compile($("#left-bar-template").html()),
            events: {
                'click #product': 'toProduct'
            },

            initalize: function(){
                var userModel = new UserModel();
                userModel.fetch();
                console.log(this.model);

            },

            render: function(){
                this.el.html(this.template(this.model.toJSON()));
                return this;
            }

        });

        module.exports = TopView;
    });