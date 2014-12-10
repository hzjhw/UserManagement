/**
 * @description RegistermModel.js
 * @namespace RegistermModel.js
 * @author jihui-wxw on 14-11-21
 */

define('RegisterModel', ['jquery', 'BaseModel'], function (require, exports, module) {
  var RegisterModel, BaseModel;

  BaseModel = require('BaseModel');
  RegisterModel = BaseModel.extend({
    defaults: Est.extend({
      username: '',
      password: '',
      email: '',
      entName: '',
      randCode: ''
    }, BaseModel.prototype.defaults),
    baseId: 'registerId',
    baseUrl: CONST.API + '/user/register'
  });
  module.exports = RegisterModel;
});