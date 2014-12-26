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
        attributeType: "text",
        isRequired: "00",
        isEnabled: "00",
        attributeOptionStore: "",
        attributeOptionList: [ ],
        name: ""
      },
      BaseModel.prototype.defaults),
      baseUrl: CONST.API + '/member/attr/detail',
      baseId: 'attId',
      initialize: function () {
        this._initialize();
      }
    });

    module.exports = MemberAttributeModel;
  });