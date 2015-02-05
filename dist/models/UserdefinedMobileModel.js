/**
 * @description UserdefinedMobileModel
 * @namespace UserdefinedMobileModel
 * @author yongjin<zjut_wyj@163.com> 2014/12/26
 */
define('UserdefinedMobileModel', ['BaseModel'], function(require, exports, module){
  var UserdefinedMobileModel, BaseModel;

  BaseModel = require('BaseModel');

  UserdefinedMobileModel = BaseModel.extend({
    baseId: 'userdefinedId',
    params: 'mobile=true',
    baseUrl: CONST.API + '/userdefined/detail',
    defaults: Est.extend({
      name: '',
      content: '',
      mobile: true
    }, BaseModel.prototype.defaults),
    initialize: function(){
      this._initialize();
    }
  });

  module.exports = UserdefinedMobileModel;
});