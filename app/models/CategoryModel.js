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
        grade: '00', // 产品以00开头， 新闻以01开头
        isroot: '01', // 是否是根目录
        isdisplay: 1, // 是否显示
        name: '',
        sort: 1,
        state: '01',
        category: '/',
        belongId: null, // 父类ID
        type: '10' // 产品
      },
      baseUrl: global.API + '/category/detail',
      baseId: 'categoryId'
    });
    module.exports = CategorytModel;
  });