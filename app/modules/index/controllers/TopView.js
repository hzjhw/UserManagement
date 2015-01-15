/**
 * @description TopView
 * @namespace TopView
 * @author yongjin on 2014/11/12
 */
define('TopView', ['BaseView', 'template/layout_top', 'BaseService'],
  function (require, exports, module) {
    var TopView, BaseView, tempTop, BaseService;

    BaseView = require('BaseView');
    tempTop = require('template/layout_top');
    BaseService = require('BaseService');

    TopView = BaseView.extend({
      el: '#jhw-top',
      events: {
        'click .top-login': 'logout'
      },
      initialize: function () {
        this._initialize({
          template: tempTop,
          data: app.getData('user')
        });
        this.render();
      },
      render: function () {
        this._render();
      },
      logout: function () {
        BaseService.logout();
      }
    });

    module.exports = TopView;
  });