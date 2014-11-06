/**
 * @description 产品列表集合
 * @namespace ProductCollection
 * @author yongjin on 2014/10/31
 */
define('ProductCollection', ['jquery', 'underscore', 'backbone', 'ProductModel', 'PaginationModel'],
    function (require, exports, module) {
        var ProductCollection, ProductModel, Backbone, PaginationModel, paginationModel;

        ProductModel = require("ProductModel");
        Backbone = require('backbone');
        PaginationModel = require('PaginationModel');


        ProductCollection = Backbone.Collection.extend({
            model: ProductModel,
            url: 'http://jihui88.com/rest/api/product/list',
            initialize: function(){
                this.paginationModel = new PaginationModel;
            },
            parse: function (resp, xhr) {
                this.paginationModel.set('page', resp.attributes.page);
                this.paginationModel.set('pageSize', resp.attributes.per_page);
                this.paginationModel.set('count', resp.attributes.count);
                return resp.attributes.data;
            },
            pagination: function(){
                var page = this.paginationModel.get('page');
                var pageSize = this.paginationModel.get('pageSize');
                this.url = this.url.substring(0, this.url.indexOf('?') > -1 ?
                    this.url.lastIndexOf("?") : this.url.length) + "?page=" + page + '&pageSize=' + pageSize;
            }
        });
        module.exports = ProductCollection;
    });