/**
 * @description WwLeafletTool
 * @class WwLeafletTool
 * @author yongjin<zjut_wyj@163.com> 2015/3/16
 */
define('WwLeafletTool', ['BaseView', 'template/wwy_leaflet_tool'], function (require, exports, module) {
  var WwLeafletTool, BaseView, toolTemp;

  BaseView = require('BaseView');
  toolTemp = require('template/wwy_leaflet_tool');

  WwLeafletTool = BaseView.extend({
    initialize: function () {
      this._initialize({
        template: toolTemp
      });
      this.render();
    },
    render: function () {
      this._render();
    }
  });

  module.exports = WwLeafletTool;
});