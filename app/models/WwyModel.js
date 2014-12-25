/**
 * @description 微网页模型类
 * @namespace wwyModel
 * @author yongjin on 2014/10/31
 */
define('WwyModel', ['jquery', 'BaseModel'],
  function (require, exports, module) {
    var WwyModel, BaseModel;

    BaseModel = require('BaseModel');

    WwyModel = BaseModel.extend({
      defaults: Est.extend({
        title: '',
        showmsg: '0',
        isforwoard: '0',
        ltyType: '0',
        state: '01',
        addTime: new Date().getTime()
      }, BaseModel.prototype.defaults),
      baseId: 'wyId',
      baseUrl: CONST.API + '/wwy/detail',
      initialize: function () {
        this._initialize();
      }
    });
    module.exports = WwyModel;
  });