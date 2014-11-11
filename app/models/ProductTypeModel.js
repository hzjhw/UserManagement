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
            baseUrl: 'http://jihui88.com/rest/api/product/type/detail',
            baseId: 'id',
            defaults: {
                name: '',
                state:'01',
                checked: false
            },
            validate: function (attributes) {
                if (!attributes.name || attributes.name < 0) {
                    return "名称不能为空";
                }
             }

        });
        module.exports = ProductTypeModel;
    });