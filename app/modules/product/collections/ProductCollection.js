/**
 * @description 产品列表集合
 * @namespace ProductCollection
 * @author yongjin on 2014/10/31
 */
define('ProductCollection', ['jquery', 'underscore', 'backbone', 'ProductModel', 'BaseCollection'],
    function (require, exports, module) {
        var ProductCollection, ProductModel, BaseCollection;

        ProductModel = require("ProductModel");
        BaseCollection = require('BaseCollection');

        ProductCollection = BaseCollection.extend({
            url: 'http://jihui88.com/rest/api/product/list',
            model: ProductModel
        });
        module.exports = ProductCollection;
    });