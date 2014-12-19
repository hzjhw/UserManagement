/**
 * @description MemberListDetail
 * @namespace MemberListDetail
 * @author wxw on 14-12-16
 */
define('MemberListDetail', ['jquery', 'MemberListModel', 'HandlebarsHelper', 'BaseDetail', 'dialog', 'template/member_list_detail'],
  function (require, exports, module) {
    var MemberListDetail, MemberListModel, HandlebarsHelper, BaseDetail, template, AttributesShow, dialog, Tag;

    MemberListModel = require('MemberListModel');
    HandlebarsHelper = require('HandlebarsHelper');
    BaseDetail = require('BaseDetail');
    template = require('template/member_list_detail');
    dialog = require('dialog');
    AttributesShow = require('AttributesShow');
    Tag = require('Tag');

    MemberListDetail = BaseDetail.extend({
      el: '#jhw-detail',
      events: {
        'click #member-reset': 'reset'
      },
      initialize: function () {
        debug('2.MemberDetail.initialize');
        this._initialize({
          template : template,
          model: MemberListModel
        });
      },
      getMemberRankCategory: function (options) {
        debug('getMemberCategory');
        var $q = Est.promise;
        return new $q(function (topResolve, topReject) {
          options.select = options ? options.select ? true : false : false;
          options.extend = options ? options.extend ? true : false : false;
          var getCategory = function () {
            return new $q(function (resolve, reject) {
              $.ajax({
                type: 'post',
                url: CONST.API + '/member/rank/list',
                async: false,
                data: {
                  _method: 'GET'
                },
                success: function (result) {
                  resolve(result);
                }
              });
            });
          };
          getCategory().then(function (result) {
            if (result.attributes) {
              Est.each(result.attributes.data,function(item){
                item.text=item.name;
                item.value=item.rankId;
              })
            } else {
              result.attributes.data = [];
            }
            result.attributes.data.unshift({text: '请选择分类', value: '/'});
            topResolve(result.attributes.data);
          });
        });
      },
      render: function () {
        debug('4.MemberDetail.render');
        var ctx = this;
        this.model.set('taglist', Est.pluck(Est.pluck(this.model.get('tagMapStore'), 'tag'), 'name')
          .join(","));
        this._render();

        // 表单初始化
        this._form('#J_Form')._validate()._init({
          onBeforeSave: function(){
            // 处理特殊字段
          },
          onAfterSave: function(response){
          }
        });
        // 会员分类
       this.getMemberRankCategory({ select: true, extend: true }
        ).then(function (list) {
            ctx._initSelect({
              render: '#s1',
              target: '#model-memberRank',
              items: list,
              change: function (categoryId) {
                var buttons = [
                  {
                    value: '更换',
                    callback: function () {
                      ctx.showAttributes(categoryId, []);
                    }},
                  {
                    value: '保留',
                    autofocus: true,
                    callback: function () {
                      this.close();
                    }
                  }
                ];
                if (!ctx._isAdd) {
                  dialog({
                    title: '提示',
                    content: '更换分类将更改产品属性选项， 点击“保留”只更改分类， 不更改属性！',
                    width: 250,
                    button: buttons
                  }).show($("#s1").get(0));
                } else {
                  ctx.showAttributes(categoryId);
                }
              }
            });
          });
/*
        if (!ctx._isAdd) {
          ctx.showAttributes(ctx.model.get('category'), ctx.model.get('productAttributeMapStore'));
        }
*/

        setTimeout(function () {
          ctx._resetIframe();
        }, 1000);
        return this;
      },

      showAttributes: function(categoryId, items){
        if (!this.attribute){
          this.attribute = new AttributesShow({
            render: '#attribute-list',
            categoryId: categoryId,
            items: items
          });
        } else{
          this.attribute.reload(categoryId);
        }
      }
    });

    module.exports = MemberListDetail;

  });