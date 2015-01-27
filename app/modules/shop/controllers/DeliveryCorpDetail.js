/**
 * @description 物流公司详细页面
 * @namespace DeliveryCorpDetail
 * @author yongjin<zjut_wyj@163.com> 2014/12/29
 */
define('DeliveryCorpDetail', ['DeliveryCorpModel', 'BaseView', 'BaseDetail', 'Utils', 'template/delivery_corp_detail'],
  function (require, exports, module) {
    var DeliveryCorpDetail, DeliveryCorpModel, BaseDetail, Utils, BaseView, template;

    DeliveryCorpModel = require('DeliveryCorpModel');
    BaseDetail = require('BaseDetail');
    Utils = require('Utils');
    template = require('template/delivery_corp_detail');
    BaseView = require('BaseView');

    DeliveryCorpDetail = BaseDetail.extend({
      el: '#jhw-detail',
      events: {
      },
      initialize: function () {
        debug('2.DeliveryCorpDetail.initialize');
        this._initialize({
          template: template,
          model: DeliveryCorpModel
        });
      },
      render: function () {
        debug('4.DeliveryCorpDetail.render');
        this._render();
        this._form('#J_Form')._validate()._init({ });
        Utils.initEditor({
          render: '.ckeditor'
        });
        return this;
      }
    });

    module.exports = DeliveryCorpDetail;
  });