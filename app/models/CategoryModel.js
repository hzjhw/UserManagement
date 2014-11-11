/**
 * @description 产品分类
 * @namespace CategoryModel
 * @author yongjin on 2014/11/10
 */
define('CategoryModel', ['jquery', 'underscore', 'backbone', 'dialog', 'BaseModel'],
    function (require, exports, module) {
        var dialog, BaseModel, CategorytModel;

        BaseModel = require('BaseModel');
        dialog = require('dialog');

        CategorytModel = BaseModel.extend({
            defaults: {
                grade: '01',
                isroot: '01',
                isdisplay: 1,
                name: '',
                sort: 1,
                state: '01'
            },
            baseUrl: 'http://jihui88.com/rest/api/category/detail',
            baseId: 'categoryId'
        });
        module.exports = CategorytModel;
    });