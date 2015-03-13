/**
 * @description LeafletPre
 * @class LeafletPre
 * @author yongjin<zjut_wyj@163.com> 2015/3/13
 */
define('LeafletPre', ['BaseDetail', 'InvitationModel', 'template/leaflet_pre', 'Utils', 'HandlebarsHelper',
  'template/leaflet_index'], function (require, exports, module) {
  var LeafletPre, BaseDetail, template, LeafletModel, Utils, HandlebarsHelper, leafletTemp;

  BaseDetail = require('BaseDetail');
  template = require('template/leaflet_pre');
  LeafletModel = require('LeafletModel');
  Utils = require('Utils');
  HandlebarsHelper = require('HandlebarsHelper');
  leafletTemp = require('template/leaflet_index');

  LeafletPre =  BaseDetail.extend({
    initialize: function () {
      this._initialize({
        template: template,
        model: LeafletModel
      });
    },
    render: function () {
      this._render();
      Utils.initDate({
        render: '.calendar',
        showTime: false
      });
      this.model.set('themeId', this.model.get('titleTheme').replace(/^css\/(.+?)\/.*\.css$/g, '$1'));
      this._form('#J_Form')._validate()._init({
        onBeforeSave: function () {
          this.model._hideTip();
          this.model.set('title1', Est.dateFormat(this.model.get('activitydate'), 'yyyy年MM月dd日'));
          this._setValue('tip.time', Est.dateFormat(this.model.get('activitydate'), 'yyyy-MM-dd'));
          this._setValue('tip.hour', this.model.get('hour'));
          this._setValue('tip.minute', this.model.get('minute'));
          this.inviteTemp = HandlebarsHelper.compile(this.model.get('invite')['content']);
          Est.setValue(this.model.attributes, 'invite.content', this.inviteTemp(this.model.toJSON()));
          this.model.set('enterpriseId', Est.cookie('enterpriseId'));
          this.model.set('username', Est.cookie('username'));
          var date = this.model.get('tip')['time'];
          this.model.set('countdown_yy', parseInt(date.substring(0, 4), 10));
          this.model.set('countdown_mm', parseInt(date.substring(6, 8), 10) - 1);
          this.model.set('countdown_dd', parseInt(date.substring(8, 10), 10));
          this.model.set('countdown_hh', parseInt(this._getValue('tip.hour'), 10));
          this.model.set('countdown_mn', parseInt(this._getValue('tip.minute'), 10));
          //this.model._setValue('message.template', weddingTemp);
          this.leafletTemplate = HandlebarsHelper.compile(leafletTemp);
          this.model.set('html', this.invitationTemplate(this.model.toJSON()));
          this._stringifyJSON(['invite', 'photos', 'mv', 'message', 'map', 'tip', 'share']);
        },
        onAfterSave: function (model) {
          app.emptyDialog();
          this._navigate('#/wwy_invitation/' + model.get('id'), this);
        }
      });
    }
  });

  module.exports = LeafletPre;
});