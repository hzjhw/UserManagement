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
      defaults: Est.extend({
        name: '',
        belongId: '/'
      }, BaseModel.prototype.defaults),
      baseId: 'categoryId',
      baseUrl: CONST.API + '/category/detail',
      initialize: function(){
        this._initialize();
      }
    });
    module.exports = CategorytModel;
  });