/**
 * @description LeftView
 * @namespace LeftView
 * @author yongjin on 2014/11/12
 */

define('LeftView', ['BaseView', 'template/layout_left'], function (require, exports, module) {
  var LeftView, BaseView, leftTemp;

  BaseView = require('BaseView');
  leftTemp = require('template/layout_left');

  LeftView = BaseView.extend({
    el: '#jhw-left-bar',
    initialize: function () {
      this._initialize({
        template: leftTemp,
        data: {}
      });
      this.render();
    },
    render: function () {
      this._render();
    }

  });

  module.exports = LeftView;
});