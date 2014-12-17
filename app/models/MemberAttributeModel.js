/**
 * @description 会员模型类
 * @namespace MemberModel
 * @author jihui-wxw on 2014/10/31
 */
define('MemberAttributeModel', ['jquery', 'underscore', 'backbone', 'dialog', 'BaseModel'],
  function (require, exports, module) {
    var dialog, BaseModel;

    BaseModel = require('BaseModel');
    dialog = require('dialog');

    var MemberAttributeModel = BaseModel.extend({
      defaults: Est.extend({
        enterpriseId: "",
        attId: "",
        addTime:new Date().getTime(),
        attributeType: "select",
        isRequired: "01",
        isEnabled: "01",
        attributeOptionStore: "['男','女']",
        attributeOptionList: [ ],
        name: "性别"
      }, BaseModel.prototype.defaults),
      baseUrl: CONST.API + '/member/attr/detail',
      baseId: 'attId'
    });

    module.exports = MemberAttributeModel;
  });