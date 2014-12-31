/**
 * @description DeliveryTypeDetail
 * @namespace DeliveryTypeDetail
 * @author yongjin<zjut_wyj@163.com> 2014/12/29
 */
define('DeliveryTypeDetail', ['DeliveryTypeModel', 'BaseView', 'BaseDetail', 'BaseUtils', 'template/delivery_type_detail', 'BaseService'],
  function (require, exports, module) {
    var DeliveryTypeDetail, DeliveryTypeModel, BaseService, BaseDetail, BaseUtils, BaseView, template;

    DeliveryTypeModel = require('DeliveryTypeModel');
    BaseDetail = require('BaseDetail');
    BaseUtils = require('BaseUtils');
    template = require('template/delivery_type_detail');
    BaseView = require('BaseView');
    BaseService = require('BaseService');

    DeliveryTypeDetail = BaseDetail.extend({
      el: '#jhw-detail',
      events: {
      },
      initialize: function () {
        debug('2.DeliveryTypeDetail.initialize');
        this._initialize({
          template: template,
          model: DeliveryTypeModel
        });
      },
      render: function () {
        debug('4.DeliveryTypeDetail.render');
        this._render();
        BaseService.getDeliveryCorpList().then(function(result){
          BaseUtils.initSelect({
            render: '#s2',
            target: '#model-defaultDeliveryCorp',
            items: result,
            change: function(){
            }
          });
        });
        BaseUtils.initSelect({
          render: '#s1',
          target: '#model-deliveryMethod',
          items: app.getData('deliveryMethod'),
          change: function(){
          }
        });
        BaseUtils.initSelect({
          render: '#s3',
          width: 100,
          target: '#model-firstWeightUnit',
          items: app.getData('weightUnit')
        });
        BaseUtils.initSelect({
          render: '#s4',
          width: 100,
          target: '#model-continueWeightUnit',
          items:app.getData('weightUnit')
        });
        this._form('#J_Form')._validate()._init({ });
        BaseUtils.initEditor({
          render: '.ckeditor'
        });
        return this;
      }
    });

    module.exports = DeliveryTypeDetail;
  });