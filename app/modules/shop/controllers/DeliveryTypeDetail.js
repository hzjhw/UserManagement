/**
 * @description 配送类型详细
 * @namespace DeliveryTypeDetail
 * @author yongjin<zjut_wyj@163.com> 2014/12/29
 */
define('DeliveryTypeDetail', ['DeliveryTypeModel', 'BaseView', 'BaseDetail', 'BaseUtils', 'Utils', 'template/delivery_type_detail', 'Service'],
  function (require, exports, module) {
    var DeliveryTypeDetail, DeliveryTypeModel, Service, BaseDetail, BaseUtils, Utils, BaseView, template;

    DeliveryTypeModel = require('DeliveryTypeModel');
    BaseDetail = require('BaseDetail');
    Utils = require('Utils');
    BaseUtils = require('BaseUtils');
    template = require('template/delivery_type_detail');
    BaseView = require('BaseView');
    Service = require('Service');

    DeliveryTypeDetail = BaseDetail.extend({
      el: '#jhw-detail',
      events: {
        'click .btn-back': 'back'
      },
      initialize: function () {
        debug('2.DeliveryTypeDetail.initialize');
        this._initialize({
          template: template,
          model: DeliveryTypeModel
        });
      },
      back: function () {
        this._navigate('#/shop/delivery_type', true);
      },
      render: function () {
        debug('4.DeliveryTypeDetail.render');
        this._render();
        Service.getDeliveryCorpList({select: true})
          .then(function (result) {
            BaseUtils.initSelect({
              render: '#s2',
              target: '#model-defaultDeliveryCorp',
              search: true,
              items: result
            });
          });
        Utils.initSelect({
          render: '#s1',
          target: '#model-deliveryMethod',
          items: app.getStatus('deliveryMethod')
        });
        Utils.initSelect({
          render: '#s3',
          width: 100,
          target: '#model-firstWeightUnit',
          items: app.getStatus('weightUnit')
        });
        Utils.initSelect({
          render: '#s4',
          width: 100,
          target: '#model-continueWeightUnit',
          items: app.getStatus('weightUnit')
        });
        this._form('#J_Form')._validate()._init({ });
        Utils.initEditor({
          render: '.ckeditor'
        });
        return this;
      }
    });

    module.exports = DeliveryTypeDetail;
  });