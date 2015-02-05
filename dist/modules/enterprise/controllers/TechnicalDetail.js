/**
 * @description TechnicalDetail
 * @class TechnicalDetail
 * @author yongjin<zjut_wyj@163.com> 2015/1/15
 */
define('TechnicalDetail', ['BaseDetail', 'TechnicalModel', 'Utils', 'template/technical_detail'], function (require, exports, module) {
  var TechnicalDetail, TechnicalModel, BaseDetail, template, Utils;

  BaseDetail = require('BaseDetail');
  template = require('template/technical_detail');
  TechnicalModel = require('TechnicalModel');
  Utils = require('Utils');

  TechnicalDetail = BaseDetail.extend({
    events: {
      'click .back': 'back'
    },
    initialize: function () {
      this._initialize({
        template: template,
        model: TechnicalModel
      });
    },
    back: function () {
      this._navigate('#/index');
    },
    render: function () {
      var ctx = this;
      this.model.fetch({
        wait: true
      }).done(function () {
        ctx._render();
        Utils.initSelect({
          render: '#s1',
          target: '#model-technicView',
          items: [
            {text: '全部可见', value: '01'},
            {text: '登录可见', value: '02'}
          ]
        });
        Utils.initEditor({
          render: '.ckeditor'
        })
        ctx._form('#J_Form')._validate()._init();
      });
    }
  });

  module.exports = TechnicalDetail;
});