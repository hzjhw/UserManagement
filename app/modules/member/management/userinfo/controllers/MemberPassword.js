/**
 * @description MemberPassword
 * @namespace MemberPassword
 * @author yongjin<zjut_wyj@163.com> 2015/1/11
 */
define('MemberPassword', ['BaseDetail', 'BaseModel', 'template/member_password_modify', 'Utils'],
  function (require, exports, module) {
    var MemberPassword, BaseDetail, BaseModel, template, model, Utils;

    BaseDetail = require('BaseDetail');
    BaseModel = require('BaseModel');
    template = require('template/member_password_modify');
    Utils = require('Utils');

    model = BaseModel.extend({
      defaults: Est.extend({}, BaseModel.prototype.defaults),
      baseUrl: CONST.API + '/shop/member/password/detail',
      baseId: 'memberId',
      initialize: function () {
        this._initialize();
      }
    });

    MemberPassword = BaseDetail.extend({
      initialize: function () {
        this._initialize({
          template: template,
          model: model
        });
      },
      render: function () {
        this._render();
        Utils.initTab({
          srcNode: '#tab',
          elCls: 'nav-tabs',
          itemStatusCls: {
            'selected': 'current'
          },
          panelContainer: '#panel'
        });
        this._form('#J_Form')._validate()._init({

        });
      }
    });

    module.exports = MemberPassword;
  });