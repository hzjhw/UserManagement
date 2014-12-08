/**
 * @description LeftView
 * @namespace LeftView
 * @author yongjin on 2014/11/12
 */

define('LeftView', ['BaseView', 'BaseUtils', 'template/layout_left'], function (require, exports, module) {
  var LeftView, BaseView, BaseUtils, leftTemp;

  BaseView = require('BaseView');
  leftTemp = require('template/layout_left');
  BaseUtils = require('BaseUtils');

  LeftView = BaseView.extend({
    el: '#jhw-left-bar',
    events: {
      'click .menu-login': 'logout'
    },
    initialize: function () {
      this._initialize({
        template: leftTemp,
        data: {}
      });
      this.render();
    },
    render: function () {
      this._render();
    },
    logout: function(){
      BaseUtils.logout();
    }

  });

  module.exports = LeftView;
});