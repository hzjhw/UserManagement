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
      video: {},
      background: 'upload/u/u4/user02/picture/2014/12/20/11efc2a1-27b1-4ba3-be8e-8f91dc1f256c.jpg'
    }, BaseModel.prototype.default),
    baseId: 'id',
    initialize: function () {
      this._initialize();
    }
  });

  module.exports = WwyLeafletPageModel;
});