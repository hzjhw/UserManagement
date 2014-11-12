/**
 * @description 基础集合类
 * @namespace BaseCollection
 * @author yongjin on 2014/11/6
 */

define('BaseCollection', ['jquery', 'underscore', 'backbone', 'PaginationModel', 'PaginationView', 'localStorage', 'Est'],
    function(require, exports, module){
        var Backbone, BaseCollection, PaginationModel, PaginationView, Est;

        Backbone = require('backbone');
        //Backbone.localStorage = require('localStorage');
        PaginationModel = require('PaginationModel');
        PaginationView = require('PaginationView');
        Est = require('Est');

        BaseCollection = Backbone.Collection.extend({

            //localStorage: new Backbone.LocalStorage('base-collection'),

            initialize: function () {
                console.log('2.BaseCollection.initialize');
                this.paginationModel = new PaginationModel;
            },

            parse: function (resp, xhr) {
                this.parsePagination(resp);
                this.parseUrl(this.paginationModel);
                this.paginationRender();
                return resp.attributes.data;
            },

            parseUrl: function (model) {
                console.log('7.BaseCollection.parseUrl')
                var page = model.get('page');
                var pageSize = model.get('pageSize');
                this.url = this.url.substring(0, this.url.indexOf('?') > -1 ?
                    this.url.lastIndexOf("?") :
                    this.url.length) + '?page=' + page + '&pageSize=' + pageSize;
            },

            parsePagination: function(resp){
                console.log('6.BaseCollection.parsePagination')
                resp.attributes = resp.attributes
                    || { page: 1, per_page: 10, count: 10 };
                this.paginationModel.set('page', resp.attributes.page);
                this.paginationModel.set('pageSize', resp.attributes.per_page);
                this.paginationModel.set('count', resp.attributes.count);
            },

            paginationRender: function(){
                var ctx = this;
                new PaginationView({
                    model: ctx.paginationModel
                });
            },

            load: function(instance, context, model){
                console.log('4.BaseCollection.load');
                if (typeof model !== 'undefined') this.parseUrl(model);
                return new Est.promise(function(resolve, reject){
                    return instance.fetch({success: function(){
                        resolve(instance);
                        context.empty();
                    }});
                });
            },

            empty: function(){
                console.log('BaseCollection.empty')
                var collection = this.collection;
                this.collection.each(function(view){
                    collection.remove(view);
                });
            }
        });

        module.exports = BaseCollection;
});