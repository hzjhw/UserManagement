/**
 * @description WwyLeafletCanvas
 * @class WwyLeafletCanvas
 * @author yongjin<zjut_wyj@163.com> 2015/3/16
 */
define('WwyLeafletCanvas', ['BaseView', 'WwyLeafletPageModel', 'template/leaflet_canvas'], function (require, exports, module) {
  var WwyLeafletCanvas, template, BaseView, WwyLeafletPageModel;

  WwyLeafletPageModel = require('WwyLeafletPageModel');
  template = require('template/leaflet_canvas');
  BaseView = require('BaseView');

  WwyLeafletCanvas = BaseView.extend({
    initialize: function () {
      this._initialize({
        model: WwyLeafletPageModel,
        template: template
      });
      this.render();
    },
    render: function () {
      this._render();
    }
  });

  module.exports = WwyLeafletCanvas;
});