/**
 * @description ToolPanel
 * @class ToolPanel
 * @author yongjin<zjut_wyj@163.com> 2015/1/16
 */
define('ToolPanel', ['BaseView', 'template/tool_panel'], function (require, exports, module) {
  var ToolPanel, BaseView, template;

  BaseView = require('BaseView');
  template = require('template/tool_panel');

  ToolPanel = BaseView.extend({
    initialize: function () {
      this._initialize({
        template: template
      });
      this.render();
    },
    render: function () {
      this._render.call(this);
    }
  });


  module.exports = ToolPanel;
});