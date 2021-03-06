/**
 * @description MobileNavDetail
 * @class MobileNavDetail
 * @author yongjin<zjut_wyj@163.com> 2015/1/17
 */
define('MobileNavDetail', ['BaseDetail', 'MobileNavModel', 'Service', 'Utils', 'template/mobile_nav_detail'],
  function (require, exports, module) {
    var MobileNavDetail, BaseDetail, template, MobileNavModel, Service, Utils;

    BaseDetail = require('BaseDetail');
    template = require('template/mobile_nav_detail');
    MobileNavModel = require('MobileNavModel');
    Service = require('Service');
    Utils = require('Utils');

    MobileNavDetail = BaseDetail.extend({
      el: '#jhw-detail',
      events: {
        'click #product-category-reset': 'reset'
      },
      initialize: function () {
        this._initialize({
          template: template,
          model: MobileNavModel
        });
      },
      render: function () {
        this._render();
        // 导航
        Service.getMobileNavCategory({ tree: true, select: true, extend: true })
          .then(function (list) {
            Utils.initSelect({
              render: '#s1',
              target: '#model-parentId',
              items: list
            });
          });
        this._form('#J_Form')._validate()._init({});
        return this;
      }
    });

    module.exports = MobileNavDetail;
  });