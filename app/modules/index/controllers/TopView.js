/**
 * @description TopView
 * @namespace TopView
 * @author yongjin on 2014/11/12
 */
define('TopView', ['BaseView', 'UserModel', 'template/layout_top'],
  function (require, exports, module) {
    var TopView, UserModel, BaseView, tempTop;

    UserModel = require('UserModel');
    BaseView = require('BaseView');
    tempTop = require('template/layout_top');

    TopView = BaseView.extend({
      el: '#jhw-top',
      initialize: function () {
        debugger
        var userModel = new UserModel();
        userModel.fetch({
          async:false,
          success: function(data){
            app.setData('user', data.attributes);
            debug(data);
          }
        });
        if (!app.getData('user')){
          window.location.href = CONST.HOST + '/modules/login/login.html';
          return false;
        }
        this._initialize({
          template: tempTop,
          data: userModel
        });
        this.render();
      },
      render: function () {
        this._render();
      }
    });

    module.exports = TopView;
  });