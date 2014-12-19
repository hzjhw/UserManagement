/**
 * @description 属性
 * @namespace AttributeModel
 * @author yongjin on 2014/11/13
 */
define('AttributesModel', ['jquery', 'underscore', 'backbone', 'dialog', 'BaseModel'],
  function (require, exports, module) {
    var dialog, BaseModel, AttributesModel;

    BaseModel = require('BaseModel');
    dialog = require('dialog');

    AttributesModel = BaseModel.extend({
      defaults: Est.extend({
        attributeType: "text",
        categoryId: "0", // 必填
        isRequired: '00',
        isEnabled: '01',
        attributeOptionList: [],
        name: "",
        state: '01'
      }, BaseModel.prototype.defaults),
      baseUrl: CONST.API + '/attr/detail',
      baseId: 'attId'
    });
    module.exports = AttributesModel;
  });