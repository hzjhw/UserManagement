/**
 * @description WwyLeafletPre
 * @class WwyLeafletPre
 * @author yongjin<zjut_wyj@163.com> 2015/3/13
 */
define('WwyLeafletPre', ['BaseDetail', 'WwyModel', 'template/wwy_leaflet_pre', 'Utils', 'HandlebarsHelper',
  'template/wwy_leaflet_index'], function (require, exports, module) {
  var WwyLeafletPre, BaseDetail, template, WwyModel, Utils, HandlebarsHelper, leafletTemp;

  BaseDetail = require('BaseDetail');
  template = require('template/wwy_leaflet_pre');
  WwyModel = require('WwyModel');
  Utils = require('Utils');
  HandlebarsHelper = require('HandlebarsHelper');
  leafletTemp = require('template/wwy_leaflet_index');

  WwyLeafletPre =  BaseDetail.extend({
    initialize: function () {
      this._initialize({
        template: template,
        model: WwyModel
      });
    },
    render: function () {
      this._render();
      this._form('#J_Form')._validate()._init({
        onBeforeSave: function () {
          this.leafletTemplate = HandlebarsHelper.compile(leafletTemp);
          this.model.set('type', 'leaflet');
          this.model.set('html', this.leafletTemplate(this.model.toJSON()));
          this._stringifyJSON(['pages', 'music', 'loading', 'transition']);
        },
        onAfterSave: function (model) {
          app.emptyDialog();
          this._navigate('#/wwy_leaflet/' + model.get('id'), this);
        }
      });
    }
  });

  module.exports = WwyLeafletPre;
});