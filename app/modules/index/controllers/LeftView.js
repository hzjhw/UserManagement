/**
 * @description LeftView
 * @namespace LeftView
 * @author yongjin on 2014/11/12
 */

define('LeftView', ['jquery', 'underscore', 'backbone', 'HandlebarsHelper', 'UserModel'],
    function(require, exports, module){
    var LeftView, Backbone, HandlebarsHelper, UserModel;

        Backbone = require('backbone');
        HandlebarsHelper = require('HandlebarsHelper');
        UserModel = require('UserModel');

        LeftView = Backbone.View.extend({
            el: '#jhw-left-bar',
            template: HandlebarsHelper.compile($("#left-bar-template").html()),
            events: {
                'click #product': 'toProduct'
            },

            initialize: function(){
                var ctx = this;
                this.model = new UserModel();
                this.model.fetch({
                    async: false
                }).done(function(){
                    //console.dir(ctx.model);
                });
                this.render();

            },

            render: function(){
                try{
                    this.$el.html(this.template(this.model.toJSON()));
                }catch (e){
                    console.error('LeftView.render');
                }
                return this;
            }

        });

        module.exports = LeftView;
});