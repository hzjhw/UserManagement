/**
 * @description TechnicalDetail
 * @class TechnicalDetail
 * @author yongjin<zjut_wyj@163.com> 2015/1/15
 */
define('TechnicalDetail', ['BaseDetail', 'TechnicalModel', 'BaseUtils', 'template/technical_detail'], function (require, exports, module) {
  var TechnicalDetail, TechnicalModel, BaseDetail, template, BaseUtils;

  BaseDetail = require('BaseDetail');
  template = require('template/technical_detail');
  TechnicalModel = require('TechnicalModel');
  BaseUtils = require('BaseUtils');

  TechnicalDetail = BaseDetail.extend({
    initialize: function () {
      this._initialize({
        template: template,
        model: TechnicalModel
      });
    },
    render: function () {
      var ctx = this;
      this.model.fetch({
        wait: true
      }).done(function () {
        ctx._render();

        BaseUtils.initSelect({
          render: '#s1',
          target: '#model-technicView',
          items: [
            {text: '全部可见', value: '01'},
            {text: '登录可见', value: '02'}
          ]
        });
        BaseUtils.initEditor({
          render: '.ckeditor'
        })
        ctx._form('#J_Form')._validate()._init({
          onBeforeSave: function () {

          }
        });

      });
    }
  });

  module.exports = TechnicalDetail;
});