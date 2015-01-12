/**
 * @description Login
 * @namespace Login
 * @author yongjin<zjut_wyj@163.com> 2015/1/7
 */
define('Login', ['BaseDetail', 'template/login', 'LoginModel'],
  function (require, exports, module) {
    var Login, BaseDetail, template, LoginModel;

    BaseDetail = require('BaseDetail');
    template = require('template/login');
    LoginModel = require('LoginModel');

    Login = BaseDetail.extend({
      initialize: function () {
        this._initialize({
          template: template,
          model: LoginModel,
          enterRender: '#submit'
        });
      },
      render: function () {
        var ctx = this;
        console.log('4.Login.render');
        this._render();
        this._form('#J_Form')._validate()._init({
          onAfterSave: function (model) {
            if (model.get('_response') && !model.get('_response').success) {
              this.model.set('_response', null);
              ctx.refreshCode();
              return true;
            }
            window.location.href = CONST.HOST + '/modules/member/management/index.html';
          }
        });
        return this;
      },
      events: {
        'click .refreshCode': 'refreshCode'
      },
      refreshCode: function () {
        var $verifyPic = this.$("#verifyPic");
        $verifyPic.attr("src", $verifyPic.attr("src") + '?time=' + new Date().getTime())
      }
    });

    module.exports = Login;
  });