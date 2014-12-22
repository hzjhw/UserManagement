/**
 * @description 产品添加或修改视图
 * @namespace WwyDetail
 * @author yongjin on 2014/10/31
 */
define('WwyDetail', ['jquery', 'WwyModel', 'HandlebarsHelper', 'BaseDetail', 'AttributesShow', 'dialog', 'template/wwy_detail'],
  function (require, exports, module) {
    var WwyDetail, WwyModel, HandlebarsHelper, BaseDetail, template, AttributesShow, dialog;

    WwyModel = require('WwyModel');
    HandlebarsHelper = require('HandlebarsHelper');
    BaseDetail = require('BaseDetail');
    template = require('template/wwy_detail');
    dialog = require('dialog');
    AttributesShow = require('AttributesShow');

    WwyDetail = BaseDetail.extend({
      el: '#jhw-detail',
      events: {
        'click #wwy-reset': 'reset'
      },
      initialize: function () {
        debug('2.WwyDetail.initialize');
        this._initialize({
          template : template,
          model: WwyModel
        });
      },
      render: function () {
        debug('4.WwyDetail.render');
        var ctx = this;
        this._render();
        // 表单初始
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

    module.exports = WwyDetail;

  });