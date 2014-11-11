/**
 * @description 产品列表集合
 * @namespace ProductCollection
 * @author yongjin on 2014/10/31
 */
define('ProductTypeCollection', ['jquery', 'underscore', 'backbone', 'ProductTypeModel', 'BaseCollection'],
    function (require, exports, module) {
        var ProductTypeCollection, ProductTypeModel, BaseCollection;

        ProductTypeModel = require("ProductTypeModel");
        BaseCollection = require('BaseCollection');

        ProductTypeCollection = BaseCollection.extend({
            url: 'http://jihui88.com/rest/api/product/type/list',
            model: ProductTypeModel
        });
        module.exports = ProductTypeCollection;
    });