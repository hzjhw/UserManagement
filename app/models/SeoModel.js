/**
 * @description SeoModel
 * @namespace SeoModel
 * @author yongjin<zjut_wyj@163.com> 2014/12/26
 */
define('SeoModel', ['BaseModel'], function (require, exports, module) {
  var SeoModel, BaseModel;

  BaseModel = require('BaseModel');

  SeoModel = BaseModel.extend({
    defaults: Est.extend({
    }, BaseModel.prototype.defaults),
    baseId: 'seoId',
    baseUrl: CONST.API + '/groupseo/detail',
    initialize: function () {
      this._initialize();
    }
  });

  module.exports = SeoModel;
});