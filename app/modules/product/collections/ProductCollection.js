/**
 * @description 产品列表集合
 * @namespace ProductCollection
 * @author yongjin on 2014/10/31
 */
define('ProductCollection', ['jquery', 'underscore', 'backbone', 'ProductModel'],
    function (require, exports, module) {
        var ProductCollection, ProductModel, Backbone;

        ProductModel = require("ProductModel");
        Backbone = require('backbone');

        ProductCollection = Backbone.Collection.extend({
            model: ProductModel,
            url: 'http://jihui88.com/rest/api/product/list',
            parse: function (resp, xhr) {
                return resp.attributes.data;
            }
        });
        module.exports = ProductCollection;
    });