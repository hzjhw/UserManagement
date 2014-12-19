/**
 * @description LeftView
 * @namespace LeftView
 * @author yongjin on 2014/11/12
 */

define('LeftView', ['BaseView', 'BaseUtils', 'template/layout_left', 'BaseService'],
  function (require, exports, module) {
    var LeftView, BaseView, BaseUtils, leftTemp, BaseService;

    BaseView = require('BaseView');
    leftTemp = require('template/layout_left');
    BaseUtils = require('BaseUtils');
    BaseService = require('BaseService');

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
      logout: function () {
        BaseService.logout();
      }

    });

    $(function () {
      $("#jhw-left-bar .bottom-more").mouseover(function () {
        var ssa = $("#jhw-left-bar").height() - $("#jhw-left-bar ul").height()
        $("#jhw-left-bar .top-more").show();
        $("#jhw-left-bar .bottom-more").hide();
        $("#jhw-left-bar ul").animate({"top": ssa + 'px'}, 'fast');
      });
      $("#jhw-left-bar .top-more").mouseover(function () {
        $("#jhw-left-bar .bottom-more").show();
        $("#jhw-left-bar .top-more").hide();
        $("#jhw-left-bar ul").animate({"top": "0"}, 'fast');
      });
    })
    module.exports = LeftView;
  });
