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
                var ctx = this;
                this.paginationModel = new PaginationModel;
                this.paginationModel.on('reloadList', function(){
                    ctx.pagination();
                    ctx.fetch({
                        add: false,
                        success: function(){
                        }
                    });
                });
            },
            parse: function (resp, xhr) {
                this.paginationModel.set('page', resp.attributes.page);
                this.paginationModel.set('pageSize', resp.attributes.per_page);
                this.paginationModel.set('count', resp.attributes.count);
                this.paginationRender();
                return resp.attributes.data;
            },

            paginationRender: function(){
                var ctx = this;
                new PaginationView({
                    model: ctx.paginationModel
                });
            },
            pagination: function () {
                var page = this.paginationModel.get('page');
                var pageSize = this.paginationModel.get('pageSize');
                this.url = this.url.substring(0, this.url.indexOf('?') > -1 ?
                    this.url.lastIndexOf("?") :
                    this.url.length) + "?page=" + page;
            }
        });

        module.exports = BaseCollection;
});