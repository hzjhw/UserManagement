/**
 * @description 产品添加或修改视图
 * @namespace memberDetail
 * @author jihui-wxw on 2014/10/31
 */
define('MemberDetail', ['jquery', 'MemberModel', 'HandlebarsHelper', 'Est', 'BaseDetail', 'AttributesShow', 'dialog','template/member_detail'],
  function (require, exports, module) {
    var MemberDetail, MemberModel, HandlebarsHelper, Est, BaseDetail , AttributesShow, dialog , template;

    MemberModel = require('MemberModel');
    HandlebarsHelper = require('HandlebarsHelper');
    Est = require('Est');
    BaseDetail = require('BaseDetail');
    template = require('template/member_detail');
    dialog = require('dialog');
    AttributesShow = require('AttributesShow');

    MemberDetail = BaseDetail.extend({
      el: '#jhw-member',
      events: {
        'click #member-reset': 'reset'
      },
      initialize: function () {
        debugger
        console.log('2.memberDetail.initialize');
        this._initialize({
          template :template,
          model : MemberModel
        })
      },

      render: function () {
        console.log('4.memberDetail.render');
        var ctx = this;
        this._render();


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

            ctx._initSelect({
              render: '#s1',
              target: '#model-memberRank',
              items: taglist,
              change: function (categoryId) {
                ctx.attributes = new AttributesShow({
                  categoryId: categoryId
                });
                setTimeout(function () {
                  ctx._resetIframe();
                }, 500);
              }
            });
          }
        })

        this._initDate({
             render: '.calendar',
                showTime: false
            });


        this._form('#J_Form')._validate()._init(function () {
          // 处理特殊字段
        });
        setTimeout(function () {
          ctx._resetIframe();
        }, 1000);
        return this;
      }
    });

    module.exports = MemberDetail;

  });