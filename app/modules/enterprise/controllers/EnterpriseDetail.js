/**
 * @description EnterpriseDetail
 * @class EnterpriseDetail
 * @author yongjin<zjut_wyj@163.com> 2015/1/15
 */
define('EnterpriseDetail', ['BaseDetail', 'BaseService', 'EnterpriseModel', 'District', 'BaseUtils', 'template/enterprise_detail'],
  function (require, exports, module) {
    var EnterpriseDetail, BaseDetail, EnterpriseModel, BaseUtils, template, District, BaseService;

    BaseDetail = require('BaseDetail');
    BaseUtils = require('BaseUtils')
    BaseService = require('BaseService');
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
          BaseUtils.initTab({
            render: '#tab',
            elCls: 'nav-tabs',
            panelContainer: '#panel',
            autoRender: true,
            children: [
              {title: '基本信息', value: '1', selected: true},
              {title: '公司简介', value: '2'}
            ]
          });
          BaseUtils.initSelect({
            render: '#s1',
            target: '#model-businessType',
            items: app.getStatus('businessType')
          });
          BaseService.getIndustry().then(function (result) {
            BaseUtils.initSelect({
              render: '#s2',
              target: '#model-industry',
              items: result
            });
          });
          BaseUtils.initSelect({
            render: '#s3',
            target: '#model-type',
            items: app.getStatus('enterpriseType')
          });
          BaseUtils.initDistrict({
            id: 'district1',// 必填
            render: '#district-container', // 目标选择符
            target: '#model-address',
            url: CONST.API + '/area/list' // 自定义请求地址
          });

          BaseUtils.initDate({
            render: '.calendar',
            showTime: false
          });
          BaseUtils.initSelect({
            render: '#s5',
            target: '#model-oem',
            items: [
              {text: '是', value: '01'},
              {text: '否', value: '00'}
            ]
          });

          BaseUtils.initEditor({
            render: '.ckeditor'
          });
          ctx._form('#J_Form')._validate()._init();
        });
      }
    });

    module.exports = EnterpriseDetail;
  });