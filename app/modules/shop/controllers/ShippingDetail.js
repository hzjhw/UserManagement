/**
 * @description 物流信息详细
 * @namespace ShippingDetail
 * @author yongjin<zjut_wyj@163.com> 2015/1/5
 */
define('ShippingDetail', ['ShippingModel', 'BaseDetail', 'template/shipping_detail', 'Service', 'Utils'],
  function (require, exports, module) {
    var ShippingDetail, BaseDetail, ShippingModel, template, Service, Utils;

    BaseDetail = require('BaseDetail');
    ShippingModel = require('ShippingModel');
    template = require('template/shipping_detail');
    Service = require('Service');
    Utils = require('Utils');

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
        this.initDistrict();
        this._form('#shipping-detail')._validate()._init({
          onBeforeSave: function () {
            this.model.set('deliveryItemSet',
              app.getView('deliveryList').getItems());
            this.model.set('shipping_shipAreaPath', app.getView('district1').getDistrict());

          }
        })
      },
      // 配送方式
      initDeliveryType: function () {
        Service.getDeliverTypeList().then(function (result) {
          Utils.initSelect({
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
        Service.getDeliveryCorpList().then(function (result) {
          seajs.use(['BaseUtils'], function (BaseUtils) {
            BaseUtils.initSelect({
              render: '#s4',
              target: '#shipping_deliveryCorp',
              items: result,
              search: true,
              change: function (model) {
                $("#model-shipping_deliveryCorpName").val(model.text);
              }
            });
          })
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
      },
      initDistrict: function () {
        Utils.initDistrict({
          id: 'district1',// 必填
          render: '#district1', // 目标选择符
          path: this.model.get('shipAreaPath')
        });
      }
    });

    module.exports = ShippingDetail;
  });