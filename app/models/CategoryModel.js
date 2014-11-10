/**
 * @description 产品分类
 * @namespace CategoryModel
 * @author yongjin on 2014/11/10
 */
define('ProductModel', ['jquery', 'underscore', 'backbone', 'dialog', 'BaseModel'],
    function (require, exports, module) {
        var dialog, BaseModel;

        BaseModel = require('BaseModel');
        dialog = require('dialog');

        var ProductModel = BaseModel.extend({
            baseUrl: 'http://jihui88.com/rest/api/product/category',
            baseId: 'productId',
            defaults: {
                grade: '01',
                isroot: '01',
                isdisplay: 1,
                name: '',
                sort: 1,
                state: '01'
            },
            validate: function (attributes) {
                if (!attributes.sort || attributes.sort < 0) {
                    return "sort不能为空";
                }
            },
            initialize: function () {
                console.log('10.ProductModel.initialize [add to collection]');
            }

        });
        module.exports = ProductModel;
    });