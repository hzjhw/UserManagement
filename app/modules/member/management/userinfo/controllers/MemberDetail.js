/**
 * @description MemberDetail
 * @namespace MemberDetail
 * @author yongjin<zjut_wyj@163.com> 2015/1/9
 */
define('MemberDetail', ['BaseDetail', 'template/member_detail', 'MemberDetailModel', 'MemberAttributesShow'],
  function (require, exports, module) {
    var MemberDetail, MemberDetailModel, BaseDetail, template, MemberAttributesShow;

    BaseDetail = require('BaseDetail');
    template = require('template/member_detail');
    MemberDetailModel = require('MemberDetailModel');
    MemberAttributesShow = require('MemberAttributesShow');

    MemberDetail = BaseDetail.extend({
      initialize: function () {
        this._initialize({
          template: template,
          model: MemberDetailModel
        });
      },
      showAttributes: function (items) {
        if (!this.attribute) {
          this.attribute = new MemberAttributesShow({
            render: '#attribute-list',
            items: items
          });
        } else {
          this.attribute.reload();
        }
      },
      render: function () {
        this._render();
        this.showAttributes(this.model.get('memberAttributeMapStore'));
        this._form('#J_Form')._validate()._init({
          onBeforeSave: function () {
            //this.model.set('attributeOptionList',Est.pluck(this.attribute.getItems(), 'attribute').join(","))
          }
        });
      }
    });
    module.exports = MemberDetail;
  });