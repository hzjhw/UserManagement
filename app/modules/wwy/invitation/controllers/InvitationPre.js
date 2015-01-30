/**
 * @description InvitationPre
 * @class InvitationPre
 * @author yongjin<zjut_wyj@163.com> 2015/1/29
 */
define('InvitationPre', ['BaseDetail', 'InvitationModel', 'template/invitation_pre', 'Utils', 'HandlebarsHelper', 'template/invitation_index'],
  function (require, exports, module) {
    var InvitationPre, BaseDetail, template, InvitationModel, Utils, HandlebarsHelper, invitationTemp;

    BaseDetail = require('BaseDetail');
    InvitationModel = require('InvitationModel');
    template = require('template/invitation_pre');
    Utils = require('Utils');
    HandlebarsHelper = require('HandlebarsHelper');
    invitationTemp = require('template/invitation_index');

    InvitationPre = BaseDetail.extend({
      initialize: function () {
        this._initialize({
          template: template,
          model: InvitationModel
        });
      },
      render: function () {
        this._render();
        // 初始化时间
        Utils.initDate({
          render: '.calendar',
          showTime: false
        });
        this._form('#J_Form')._validate()._init({
          onBeforeSave: function () {
            this.model._hideTip();
            this.model.set('title', this.model.get('groomname') + '与' + this.model.get('bridename') + ' 婚宴邀约');
            this.model.set('title1', Est.dateFormat(this.model.get('activitydate'), 'yyyy年MM月dd日'));
            this.inviteTemp = HandlebarsHelper.compile(this.model.get('invite')['content']);
            Est.setValue(this.model.attributes, 'invite.content', this.inviteTemp(this.model.toJSON()));
            this.invitationTemplate = HandlebarsHelper.compile(invitationTemp);
            this.model.set('html', this.invitationTemplate(this.model.toJSON()));
            this._stringifyJSON(['invite', 'photos', 'mv', 'message', 'map', 'tip', 'share']);
            debug('beforeSave');
          },
          onAfterSave: function (model) {
            app.emptyDialog();
            this._navigate('#/wwy_invitation/' + model.get('id'), this);
          }
        });
      }
    });

    module.exports = InvitationPre;
  });