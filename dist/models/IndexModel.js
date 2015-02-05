/**
 * @description IndexModel
 * @class IndexModel
 * @author yongjin<zjut_wyj@163.com> 2015/1/14
 */
define('IndexModel', ['BaseModel'], function (require, exports, module) {
  var IndexModel, BaseModel;

  BaseModel = require('BaseModel')

  IndexModel = BaseModel.extend({
    defaults: Est.extend({}, BaseModel.prototype.defaults),
    baseUrl: CONST.API + '/user/index',
    initialize: function () {
      this._initialize();
    }
  });

  module.exports = IndexModel;
});