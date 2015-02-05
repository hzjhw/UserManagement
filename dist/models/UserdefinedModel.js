/**
 * @description UserdefinedModel
 * @namespace UserdefinedModel
 * @author yongjin<zjut_wyj@163.com> 2014/12/26
 */
define('UserdefinedModel', ['BaseModel'], function(require, exports, module){
  var UserdefinedModel, BaseModel;

  BaseModel = require('BaseModel');

  UserdefinedModel = BaseModel.extend({
    baseId: 'userdefinedId',
    baseUrl: CONST.API + '/userdefined/detail',
    defaults: Est.extend({
      name: '',
      content: ''
    }, BaseModel.prototype.defaults),
    initialize: function(){
      this._initialize();
    }
  });

  module.exports = UserdefinedModel;
});