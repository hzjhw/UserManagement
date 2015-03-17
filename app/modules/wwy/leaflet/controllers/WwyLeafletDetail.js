/**
 * @description WwyLeafletDetail
 * @class WwyLeafletDetail
 * @author yongjin<zjut_wyj@163.com> 2015/3/13
 */
define('WwyLeafletDetail', ['BaseDetail', 'template/wwy_leaflet_detail', 'WwyModel', 'Utils', 'Service',
  'HandlebarsHelper', 'PicturePick', 'template/wwy_leaflet_index'], function (require, exports, module) {
  var WwyLeafletDetail, BaseDetail, template, WwyModel, Utils, Service, HandlebarsHelper, PicturePick, indexTemp;

  BaseDetail = require('BaseDetail');
  template = require('template/wwy_leaflet_detail');
  WwyModel = require('WwyModel');
  Utils = require('Utils');
  Service = require('Service');
  HandlebarsHelper = require('HandlebarsHelper');
  PicturePick = require('PicturePick');
  indexTemp = require('template/wwy_leaflet_index');

  WwyLeafletDetail = BaseDetail.extend({
    events: {
      'click .btn-back': 'back'
    },
    initialize: function () {
      this._initialize({
        template: template,
        model: WwyModel,
        modelBind: true
      });
    },
    back: function () {
      this._navigate('#/wwy_leaflet', true);
    },
    initThemeId: function () {
      this.model.set('themeId', this.model.get('titleTheme').replace(/^css\/(.+?)\/.*\.css$/g, '$1'));
    },
    render: function () {
      // 字符串转换成JSON对象
      this._parseJSON(['pages', 'loading', 'music', 'transition']);
      this.model.set('leafletUrl', CONST.DOMAIN + '/wwy_html/' + Est.cookie('username') + '/' + this.model.get('id') + '.html?diy=1');
      if (this.model._getValue('share.url') === 'http://') this.model._setValue('share.url', this.model.get('leafletUrl'));
      this._render();
      this.iframepage = this.$("#iframepage").get(0).contentWindow;
      Utils.initTab({
        render: '#tab',
        elCls: 'nav-tabs',
        panelContainer: '#panel',
        autoRender: true,
        children: [
          {title: '基本信息', value: 'base', selected: true},
          {title: '页面设计', value: 'page'},
          {title: '微信参数', value: 'wx'}
        ],
        change: function (ev) {
          /*debug(ev.item.get('value'));
           if (ctx.iframepage && ctx.iframepage.$) {
           ctx.iframepage.$('#' + ev.item.get('value') + '_detail_title').click();
           }
           if (ev.item.get('value') === 'index' && ctx.iframepage.$) {
           ctx.iframepage.$('body').stop(true, true).animate({scrollTop: 0}, '500');
           }*/
        }
      });
      this._form('#J_Form')._validate()._init({
        onBeforeSave: function () {
          this.model._hideTip();

          this.model.set('enterpriseId', Est.cookie('enterpriseId'));
          this.model.set('username', Est.cookie('username'));

          this.leafletTemplate = HandlebarsHelper.compile(indexTemp);
          this.model.set('html', this.leafletTemplate(this.model.toJSON()));
          this._stringifyJSON(['pages', 'loading', 'music', 'transition']);
        },
        onAfterSave: function () {
          Utils.comfirm({
            title: '',
            content: '保存成功！',
            success: Est.proxy(function () {
              this.$('#iframepage').attr('src', this.model.get('wqturl') + '?' + Est.nextUid('v='));
            }, this)
          });
        }
      });
    }
  });

  module.exports = WwyLeafletDetail;
});