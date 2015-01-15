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
      initialize: function () {
        this._initialize({
          template: template,
          model: EnterpriseModel
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
            target: '#model-entAddress',
            url: CONST.API + '/area/list' // 自定义请求地址
          });

          ctx._form('#J_Form')._validate()._init({
            onBeforeSave: function () {

            }
          });
        });
      }
    });

    module.exports = EnterpriseDetail;
  });