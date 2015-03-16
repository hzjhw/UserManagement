/**
 * @description WwyLeafletPageModel
 * @class WwyLeafletPageModel
 * @author yongjin<zjut_wyj@163.com> 2015/3/16
 */
define('WwyLeafletPageModel', ['BaseModel'], function (require, exports, module) {
  var WwyLeafletPageModel, BaseModel;

  BaseModel = require('BaseModel');

  WwyLeafletPageModel = BaseModel.extend({
    defaults: Est.extend({
      display: '01',
      content: '',
      modules: [],
      video: {}
    }, BaseModel.prototype.default),
    baseId: 'id',
    initialize: function () {
      this._initialize();
    }
  });

  module.exports = WwyLeafletPageModel;
});