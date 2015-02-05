/**
 * @description FavoriteModel
 * @namespace FavoriteModel
 * @author yongjin<zjut_wyj@163.com> 2015/1/9
 */
define('FavoriteModel', ['BaseModel'],
  function (require, exports, module) {
    var FavoriteModel, BaseModel;

    BaseModel = require('BaseModel');

    FavoriteModel = BaseModel.extend({
      defaults: Est.extend({
      }, BaseModel.prototype.defaults),
      baseUrl: CONST.API + '/shop/favorite/detail',
      initialize: function () {
        this._initialize();
      }
    });

    module.exports = FavoriteModel;
  });