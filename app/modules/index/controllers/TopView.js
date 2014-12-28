/**
 * @description TopView
 * @namespace TopView
 * @author yongjin on 2014/11/12
 */
define('TopView', ['BaseView', 'BaseUtils', 'UserModel', 'template/layout_top', 'BaseService'],
  function (require, exports, module) {
    var TopView, UserModel, BaseView, BaseUtils, tempTop, BaseService;

    UserModel = require('UserModel');
    BaseView = require('BaseView');
    tempTop = require('template/layout_top');
    BaseUtils = require('BaseUtils');
    BaseService = require('BaseService');

    TopView = BaseView.extend({
      el: '#jhw-top',
      events: {
        'click .top-login': 'logout'
      },
      initialize: function () {
        var userModel = new UserModel();
        userModel.fetch({
          async:false,
          success: function(data){
            app.addData('user', data.attributes);
            CONST.USER = data.attributes;
          }
        });
        if (!app.getData('user')){
          window.location.href = CONST.HOST + '/modules/login/login.html';
          return false;
        } else{
          $("#load").hide();
          $('#jhw-body').height($(window).height() - $('#jhw-top').height());
          $(window).resize(function(){
            $('#jhw-body').height($(window).height() - $('#jhw-top').height());
          });
        }
        this._initialize({
          template: tempTop,
          data: app.getData('user')
        });
        this.render();
      },
      render: function () {
        this._render();
      },
      logout: function(){
        BaseService.logout();
      }
    });

    module.exports = TopView;
  });