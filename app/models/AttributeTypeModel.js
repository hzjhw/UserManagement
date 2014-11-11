/**
 * @description 属性
 * @namespace AttributeTypeModel
 * @author yongjin on 2014/11/10
 */
define('AttributeTypeModel', ['jquery', 'underscore', 'backbone', 'dialog', 'BaseModel'],
    function (require, exports, module) {
        var dialog, BaseModel, AttributeTypeModel;

        BaseModel = require('BaseModel');
        dialog = require('dialog');

        AttributeTypeModel = BaseModel.extend({
            defaults: {
                text: '',
                isroot: '01',
                isdisplay: 1,
                name: '',
                sort: 1,
                state: '01'
            },
            baseUrl: 'http://jihui88.com/rest/api/category/detail',
            baseId: 'categoryId'
        });
        module.exports = AttributeTypeModel;
    });