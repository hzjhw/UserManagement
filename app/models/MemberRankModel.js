/**
 * @description 会员模型类
 * @namespace MemberModel
 * @author jihui-wxw on 2014/10/31
 */
define('MemberRankModel', ['jquery', 'underscore', 'backbone', 'dialog', 'BaseModel'],
  function (require, exports, module) {
    var dialog, BaseModel;

    BaseModel = require('BaseModel');
    dialog = require('dialog');

    var MemberRankModel = BaseModel.extend({
      defaults: Est.extend({
        enterpriseId: "",
        addTime: new Date().getTime(),
        isDefault: "01",
        rankId: "",
        name: ""
      }, BaseModel.prototype.defaults),
      baseUrl: CONST.API + '/member/rank/detail',
      baseId: 'rankId'
    });

    module.exports = MemberRankModel;
  });