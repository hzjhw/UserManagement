/**
 * @description 绑定模型类
 * @namespace BindModel
 * @author yongjin<zjut_wyj@163.com> 2014/12/15
 */
define('MessageBindModel', ['jquery', 'BaseModel'],
  function (require, exports, module) {
    var MessageBindModel, BaseModel;

    BaseModel = require('BaseModel');

    MessageBindModel = BaseModel.extend({
      defaults: Est.extend({
        state: '00'
      }, BaseModel.prototype.defaults),
      baseId: 'customizeId',
      baseUrl: CONST.API + '/message/bind/detail',
      initialize: function () {
        this._initialize();
      }
    });
    module.exports = MessageBindModel;
  });