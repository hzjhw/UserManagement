/**
 * @description Register js
 * @namespace Register
 * @author jihui-wxw on 14-11-17
 */

define('Register', ['jquery', 'RegisterModel', 'HandlebarsHelper', 'Est', 'BaseDetail','template/register_detail'],
  function (require, exports, module) {
    var Register, RegisterModel, HandlebarsHelper, Est, BaseDetail, template;

    RegisterModel = require('RegisterModel');
    HandlebarsHelper = require('HandlebarsHelper');
    Est = require('Est');
    BaseDetail = require('BaseDetail');
    template = require('template/register_detail');

    Register = BaseDetail.extend({
      el: '#jhw-register',
      initialize: function () {
        console.log('2.Register.initialize');
        this._initialize({
          template: template,
          model: RegisterModel
        });
      },
      render: function () {
        console.log('4.Register.render');
        this._render();
        this._form('#J_Form')._validate()._init(function(){

        });
        return this;
      },

      save: function(){
        this._saveItem(function () {
          window.location.href = '/member/index.html';
        }, this);
      }

    });
    module.exports = Register;


  });