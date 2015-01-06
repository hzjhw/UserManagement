/**
 * @description ShippingDetail
 * @namespace ShippingDetail
 * @author yongjin<zjut_wyj@163.com> 2015/1/5
 */
define('ShippingDetail', ['ShippingModel', 'BaseDetail', 'template/shipping_detail', 'BaseService', 'BaseUtils'],
  function (require, exports, module) {
    var ShippingDetail, BaseDetail, ShippingModel, template, BaseService, BaseUtils;

    BaseDetail = require('BaseDetail');
    ShippingModel = require('ShippingModel');
    template = require('template/shipping_detail');
    BaseService = require('BaseService');
    BaseUtils = require('BaseUtils');

    ShippingDetail = BaseDetail.extend({
      initialize: function () {
        this._initialize({
          template: template,
          model: ShippingModel
        });
      },
      render: function () {
        this._render();
        this.initDeliveryCorp();
        this.initDeliveryType();
        this.initDeliveryList();
        this._form('#shipping-detail')._validate()._init({
          onBeforeSave: function () {
            this.model.set('deliveryItemSet',
              app.getView('deliveryList').getItems());
          }
        })
      },
      // 配送方式
      initDeliveryType: function () {
        BaseService.getDeliverTypeList().then(function (result) {
          BaseUtils.initSelect({
            render: '#s3',
            target: '#model-typeId',
            items: result,
            change: function () {
            }
          });
        });
      },
      // 物流公司
      initDeliveryCorp: function () {
        BaseService.getDeliveryCorpList().then(function (result) {
          BaseUtils.initSelect({
            render: '#s4',
            target: '#shipping_deliveryCorp',
            items: result,
            change: function (id, ev) {
              $("#model-shipping_deliveryCorpName").val(ev.text);
            }
          });
        });
      },
      // 发货列表
      initDeliveryList: function () {
        var items = this.model.get('orderItemSet');
        seajs.use(['DeliveryList'], function (DeliveryList) {
          app.addView('deliveryList', new DeliveryList({
            el: '#delivery-list',
            items: items
          }));
        });
      }
    });

    module.exports = ShippingDetail;
  });