/**
 * @description AlbumModel
 * @namespace AlbumModel
 * @author yongjin<zjut_wyj@163.com> 2014/12/15
 */
define('AlbumModel', ['BaseModel'], function(require, exports, module){
  var AlbumModel, BaseModel;

  BaseModel = require('BaseModel');

  AlbumModel = BaseModel.extend({
    defaults: Est.extend({
      belongId: '/',
      blongType: 'AP',
      name: '',
      state: "01"
    }, BaseModel.prototype.defaults),
    baseId: 'albumId',
    baseUrl: CONST.API + '/album/detail',
    initialize: function(){
      this._initialize();
    }
  });

  module.exports = AlbumModel;

});