/**
 * @description NavigateModel
 * @namespace NavigateModel
 * @author yongjin<zjut_wyj@163.com> 2014/12/26
 */
define('NavigateModel', ['BaseModel'], function(require, exports, module){
  var NavigateModel, BaseModel;

  BaseModel = require('BaseModel');

  NavigateModel = BaseModel.extend({
    defaults: Est.extend({
      display: 1,
      type: '0'
    }, BaseModel.prototype.defaults),
    baseUrl: CONST.API + '/navigator02/detail',
    baseId: 'navigatorId',
    initialize: function(){
      this._initialize();
    }
  });

  module.exports = NavigateModel;
});