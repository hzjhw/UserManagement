/**
 * @description 会员模型类
 * @namespace MemberModel
 * @author jihui-wxw on 2014/10/31
 */
define('MemberModel', ['jquery', 'underscore', 'backbone', 'dialog', 'BaseModel'],
  function (require, exports, module) {
    var dialog, BaseModel;

    BaseModel = require('BaseModel');
    dialog = require('dialog');

    var MemberModel = BaseModel.extend({
      baseUrl: global.API + '/member/detail',
      baseId: 'memberId',
      defaults: {
        username: '',
        password: '',
        safeQuestion: null,
        safeAnswer: null,
        deposit: '',
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
        addTime: '',
        updateTime: '',
        memberId: '',
        cellphone: '',
        phone: ''
      }

    });

    module.exports = MemberModel;
  });