/**
 * @description EnterpriseDetail
 * @class EnterpriseDetail
 * @author yongjin<zjut_wyj@163.com> 2015/1/15
 */
define('EnterpriseDetail', ['BaseDetail', 'Service', 'EnterpriseModel', 'District', 'Utils', 'template/enterprise_detail'],
  function (require, exports, module) {
    var EnterpriseDetail, BaseDetail, EnterpriseModel, Utils, template, District, Service;

    BaseDetail = require('BaseDetail');
    Utils = require('Utils')
    Service = require('Service');
    EnterpriseModel = require('EnterpriseModel');
    template = require('template/enterprise_detail');
    District = require('District');

    EnterpriseDetail = BaseDetail.extend({
      events: {
        'click .back': 'back'
      },
      initialize: function () {
        this._initialize({
          template: template,
          model: EnterpriseModel
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
          Utils.initTab({
            render: '#tab',
            elCls: 'nav-tabs',
            panelContainer: '#panel',
            autoRender: true,
            children: [
              {title: '基本信息', value: '1', selected: true},
              {title: '公司简介', value: '2'}
            ]
          });
          Utils.initSelect({
            render: '#s1',
            target: '#model-businessType',
            items: app.getStatus('businessType')
          });
          Service.getIndustry().then(function (result) {
            Utils.initSelect({
              render: '#s2',
              target: '#model-industry',
              items: result
            });
          });
          Utils.initSelect({
            render: '#s3',
            target: '#model-type',
            items: app.getStatus('enterpriseType')
          });
          Utils.initDistrict({
            id: 'district1',// 必填
            render: '#district-container', // 目标选择符
            target: '#model-address',
            url: CONST.API + '/area/list' // 自定义请求地址
          });

          Utils.initDate({
            render: '.calendar',
            showTime: false
          });
          Utils.initSelect({
            render: '#s5',
            target: '#model-oem',
            items: [
              {text: '是', value: '01'},
              {text: '否', value: '00'}
            ]
          });

          Utils.initEditor({
            render: '.ckeditor'
          });
          ctx._form('#J_Form')._validate()._init();
        });
      }
    });

    module.exports = EnterpriseDetail;
  });