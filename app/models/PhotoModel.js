/**
 * @description PhotoModel
 * @namespace PhotoModel
 * @author yongjin<zjut_wyj@163.com> 2014/12/16
 */
define('PhotoModel', ['BaseModel'], function(require, exports, module){
  var PhotoModel, BaseModel;

  BaseModel = require('BaseModel');

  PhotoModel = BaseModel.extend({
    baseId: 'attId',
    baseUrl: CONST.API + '/album/attr/img/detail',
    defaults:Est.extend({

    }, BaseModel.prototype.defaults),
    initialize: function(){
      this._initialize();
    }
  });

  module.exports = PhotoModel;
});