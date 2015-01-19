/**
 * @description SeoMobileModel
 * @namespace SeoMobileModel
 * @author yongjin<zjut_wyj@163.com> 2014/12/26
 */
define('SeoMobileModel', ['BaseModel'], function (require, exports, module) {
  var SeoMobileModel, BaseModel;

  BaseModel = require('BaseModel');

  SeoMobileModel = BaseModel.extend({
    defaults: Est.extend({
      mobile: true
    }, BaseModel.prototype.defaults),
    baseId: 'seoId',
    baseUrl: CONST.API + '/seo/detail',
    params: 'mobile=true',
    initialize: function () {
      this._initialize();
    }
  });

  module.exports = SeoMobileModel;
});