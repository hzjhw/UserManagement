/**
 * @description 产品添加或修改视图
 * @namespace memberDetail
 * @author jihui-wxw on 2014/10/31
 */
define('MemberDetail', ['jquery', 'MemberModel', 'HandlebarsHelper', 'Est', 'BaseDetail', 'AttributesShow', 'dialog'],
  function (require, exports, module) {
    var MemberDetail, MemberModel, HandlebarsHelper, Est, BaseDetail, template, AttributesShow, dialog;

    MemberModel = require('MemberModel');
    HandlebarsHelper = require('HandlebarsHelper');
    Est = require('Est');
    BaseDetail = require('BaseDetail');
    template = require('http://jihui88.com/member/modules/member/views/member_detail.html') || 'member_detail.html[404]';
    dialog = require('dialog');
    AttributesShow = require('AttributesShow');

    MemberDetail = BaseDetail.extend({
      el: '#jhw-member',
      template: HandlebarsHelper.compile(template),
      events: {
        'click #member-reset': 'reset'
      },
      initialize: function () {
        console.log('2.memberDetail.initialize');
        this.initModel(MemberModel, this);
      },

      render: function () {
        console.log('4.memberDetail.render');
        var ctx = this;

        this.$el.html(this.template(this.model.toJSON()));

        $.ajax({
          type: 'get',
          url: 'http://jihui88.com/rest/api/member/rank/list',
          success: function(result){
            var taglist = [];
            taglist.push({
              text: '请选择会员等级',
              value: '0'
            });
            Est.each(result.attributes.data, function(item){
              taglist.push({
                text: item.name,
                value: item.rankId
              });
            });

            ctx.initSelect({
              render: '#s1',
              target: '#model-memberRank',
              items: taglist,
              change: function (categoryId) {
                ctx.attributes = new AttributesShow({
                  categoryId: categoryId
                });
                setTimeout(function () {
                  ctx.resetIframe();
                }, 500);
              }
            });
          }
        })



        this.form('#J_Form').validate().init(function () {
          // 处理特殊字段
        });
        setTimeout(function () {
          ctx.resetIframe();
        }, 1000);
        return this;
      }
    });

    module.exports = MemberDetail;

  });