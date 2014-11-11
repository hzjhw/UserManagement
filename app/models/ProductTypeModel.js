/**
 * @description 产品属性分类
 * @namespace ProductTypeModel
 * @author yongjin on 2014/11/11
 */
define('ProductTypeModel', ['jquery', 'underscore', 'backbone', 'dialog', 'BaseModel'],
    function (require, exports, module) {
        var dialog, BaseModel, ProductTypeModel;

        BaseModel = require('BaseModel');
        dialog = require('dialog');

        ProductTypeModel = BaseModel.extend({
            baseId: 'typeId',
            baseUrl: 'http://jihui88.com/rest/api/product/type/detail',
            defaults: {
                checked: false,
                name: '',
                state:'01'
            }
        });
        module.exports = ProductTypeModel;
    });