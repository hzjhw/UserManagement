/**
 * @description MemberAddressDetail
 * @class MemberAddressDetail
 * @author yongjin<zjut_wyj@163.com> 2015/1/11
 */
define('MemberAddressDetail', ['BaseDetail', 'template/member_address_detail', 'BaseUtils', 'MemberAddressModel'],
  function (require, exports, module) {
    var MemberAddressDetail, BaseDetail, template, MemberAddressModel, BaseUtils;

    BaseDetail = require('BaseDetail');
    template = require('template/member_address_detail');
    MemberAddressModel = require('MemberAddressModel');
    BaseUtils = require('BaseUtils');

    MemberAddressDetail = BaseDetail.extend({
      initialize: function () {
        this._initialize({
          template: template,
          model: MemberAddressModel
        });
      },
      initDistrict: function () {
        BaseUtils.initDistrict({
          id: 'district1',// 必填
          target: '#city', // 目标选择符
          path: this.model.get('areaPath'),
          url: CONST.API + '/shop/area/list'
        });
      },
      render: function () {
        this._render();
        this.initDistrict();
        this._form("#J_Form")._validate()._init({
          onBeforeSave: function () {
            this.model.set('areaPath', app.getView('district1').getDistrict());
          }
        })
      }
    });

    module.exports = MemberAddressDetail;
  });