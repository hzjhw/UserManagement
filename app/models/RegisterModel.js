/**
 * @description RegistermModel.js
 * @namespace RegistermModel.js
 * @author jihui-wxw on 14-11-21
 */

define('RegisterModel', ['jquery', 'BaseModel'], function (require, exports, module) {
  var RegisterModel, BaseModel;

  BaseModel = require('BaseModel');
  RegisterModel = BaseModel.extend({
    baseId: 'userId',
    baseUrl: global.API + '/user/register',
    defaults: {
      name: '未登录'
    }
  });
  module.exports = RegisterModel;
});