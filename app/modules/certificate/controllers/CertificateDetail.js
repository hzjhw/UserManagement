/**
 * @description 添加或修改视图
 * @namespace CertificateDetail
 * @author wxw on 14-12-15
 */

define('CertificateDetail', ['jquery', 'CertificateModel', 'HandlebarsHelper', 'BaseDetail', 'AttributesShow', 'dialog', 'template/certificate_detail', 'Tag'],
  function (require, exports, module) {
    var CertificateDetail, CertificateModel, HandlebarsHelper, BaseDetail, template, AttributesShow, dialog, Tag;

    CertificateModel = require('CertificateModel');
    HandlebarsHelper = require('HandlebarsHelper');
    BaseDetail = require('BaseDetail');
    template = require('template/certificate_detail');
    dialog = require('dialog');
    AttributesShow = require('AttributesShow');
    Tag = require('Tag');

    CertificateDetail = BaseDetail.extend({
      el: '#jhw-detail',
      events: {
        'click #certificate-reset': 'reset'
      },
      initialize: function () {
        debug('2.CertificateDetail.initialize');
        this._initialize({
          template : template,
          model: CertificateModel
        });
      },
      render: function () {
        debug('4.CertificateDetail.render');
        var ctx = this;

        this.model.set('taglist', Est.pluck(Est.pluck(this.model.get('tagMapStore'), 'tag'), 'name')
          .join(","));
        this._render();

        // 证书分类
            ctx._initSelect({
              render: '#s1',
              target: '#model-type',
              items: app.getData('certificateList')
            });

        // 表单初始化
        this._form('#J_Form')._validate()._init({
          onBeforeSave: function(){
          },
          onAfterSave: function(response){
          }
        });

        setTimeout(function () {
          ctx._resetIframe();
        }, 1000);
        return this;
      }
    });

    module.exports = CertificateDetail;

  });