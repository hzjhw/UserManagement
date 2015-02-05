/**
 * @description MobileNavModel
 * @class MobileNavModel
 * @author yongjin<zjut_wyj@163.com> 2015/1/17
 */
define('MobileNavModel', ['BaseModel'], function (require, exports, module) {
  var MobileNavModel, BaseModel;

  BaseModel = require('BaseModel');

  MobileNavModel = BaseModel.extend({
    defaults: Est.extend({
      mobile: true,
      display: 1,
      type: '0'
    }, BaseModel.prototype.defaults),
    baseUrl: CONST.API + '/mobile/navigator/detail',
    baseId: 'navigatorId',
    initialize: function () {
      this._initialize.call(this);
    }
  });

  module.exports = MobileNavModel;
});