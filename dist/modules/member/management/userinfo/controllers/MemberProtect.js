/**
 * @description MemberProtect
 * @namespace MemberProtect
 * @author yongjin<zjut_wyj@163.com> 2015/1/11
 */
define('MemberProtect', ['BaseModel', 'BaseDetail', 'template/member_password_question'],
  function (require, exports, module) {
    var MemberProtect, BaseModel, BaseDetail, model, template;

    BaseModel = require('BaseModel');
    BaseDetail = require('BaseDetail');
    template = require('template/member_password_question');

    model = BaseModel.extend({
      defaults: Est.extend({}, BaseModel.prototype.defaults),
      baseUrl: CONST.API + '/shop/member/safe/detail',
      baseId: 'memberId',
      initialize: function () {
        this._initialize();
      }
    });

    MemberProtect = BaseDetail.extend({
      initialize: function () {
        this._initialize({
          template: template,
          model: model
        });
      },
      render: function () {
        this._render();
        this._form('#J_Form1')._validate()._init({
          onBeforeSave: function () {

          }
        });
      }
    });

    module.exports = MemberProtect;
  });