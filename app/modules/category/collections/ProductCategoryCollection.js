/**
 * @description 产品分类列表集合
 * @namespace ProductCategoryCollection
 * @author yongjin on 2014/10/31
 */
define('ProductCategoryCollection', ['jquery', 'underscore', 'backbone', 'CategoryModel', 'BaseCollection'],
    function (require, exports, module) {
        var ProductCategoryCollection, CategoryModel, BaseCollection;

        CategoryModel = require("CategoryModel");
        BaseCollection = require('BaseCollection');

        ProductCategoryCollection = BaseCollection.extend({
            url: 'http://jihui88.com/rest/api/category/product?pageSize=1000',
            model: CategoryModel
        });
        module.exports = ProductCategoryCollection;
    });