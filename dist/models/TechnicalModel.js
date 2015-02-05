/**
 * @description TechnicalModel
 * @class TechnicalModel
 * @author yongjin<zjut_wyj@163.com> 2015/1/15
 */
define('TechnicalModel', ['BaseModel'], function (require, exports, module) {
  var TechnicalModel, BaseModel;

  BaseModel = require('BaseModel');

  TechnicalModel = BaseModel.extend({
    defaults: Est.extend({
      technicView: '01'
    }, BaseModel.prototype.defaults),
    baseUrl: CONST.API + '/technic/detail',
    baseId: 'attId',
    initialize: function () {
      this._initialize();
    }
  });

  module.exports = TechnicalModel;
});