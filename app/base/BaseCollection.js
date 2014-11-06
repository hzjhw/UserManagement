/**
 * @description 基础集合类
 * @namespace BaseCollection
 * @author yongjin on 2014/11/6
 */

define('BaseCollection', ['jquery', 'underscore', 'backbone', 'PaginationModel', 'PaginationView'],
    function(require, exports, module){
        var Backbone, BaseCollection, PaginationModel, PaginationView;

        Backbone = require('backbone');
        PaginationModel = require('PaginationModel');
        PaginationView = require('PaginationView');

        BaseCollection = Backbone.Collection.extend({

            initialize: function () {
                this.paginationModel = new PaginationModel;
            },

            parse: function (resp, xhr) {
                this.paginationModel.set('page', resp.attributes.page);
                this.paginationModel.set('pageSize', resp.attributes.per_page);
                this.paginationModel.set('count', resp.attributes.count);
                this.parseUrl(this.paginationModel);
                this.paginationRender();
                return resp.attributes.data;
            },

            parseUrl: function (model) {
                var page = model.get('page');
                var pageSize = model.get('pageSize');
                this.url = this.url.substring(0, this.url.indexOf('?') > -1 ?
                    this.url.lastIndexOf("?") :
                    this.url.length) + '?page=' + page + '&pageSize=' + pageSize;
            },

            load: function(instance, model){
                if (typeof model !== 'undefined'){
                    this.parseUrl(model);
                }
                instance.fetch({
                    success: function(response){
                        console.dir(response);
                    }
                });
            },

            paginationRender: function(){
                var ctx = this;
                new PaginationView({
                    model: ctx.paginationModel
                });
            }
        });

        module.exports = BaseCollection;
});