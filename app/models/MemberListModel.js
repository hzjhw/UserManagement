/**
 * @description 会员模型类
 * @namespace MemberListModel
 * @author jihui-wxw on 2014/10/31
 */
define('MemberListModel', ['jquery', 'underscore', 'backbone', 'dialog', 'BaseModel'],
  function (require, exports, module) {
    var dialog, BaseModel;

    BaseModel = require('BaseModel');
    dialog = require('dialog');

    var MemberListModel = BaseModel.extend({
      defaults: Est.extend({
        username: '',
        password: '',
        isAccountEnabled: "00",
        isAccountLocked: "00",
        loginFailureCount: 0,
        lockedDate: null,
        registerIp: "127.0.0.1",
        loginIp: null,
        loginDate: '',
        passwordRecoverKey: null,
        memberRank: {
          rankId: '',
          preferentialScale: '',
          point: '',
          enterpriseId: '',
          addTime: '',
          updateTime: '',
          isDefault: "01",
          name: '0'
        },
        point: '',
        enterpriseId: '',
        email: '',
        addTime: new Date().getTime(),
        updateTime: '',
        memberId: '',
        cellphone: '',
        phone: ''
      }, BaseModel.prototype.defaults),
      baseUrl: CONST.API + '/member/detail',
      baseId: 'memberId'
    });

    module.exports = MemberListModel;
  });