/**
 * @description BaseModel
 * @namespace BaseModel
 * @author yongjin on 2014/11/10
 */
define('BaseModel', ['jquery', 'underscore', 'backbone', 'dialog'],
  function (require, exports, module) {
    var Backbone, dialog, BaseModel;

    Backbone = require('backbone');
    dialog = require('dialog');

    BaseModel = Backbone.Model.extend({
      baseId: '',
      /**
       * 初始化请求连接, 判断是否为新对象， 否自动加上ID
       *
       * @method [private] - url
       * @returns {*}
       * @author wyj 14.11.16
       */
      url: function () {
        var base = this.baseUrl;
        if (this.isNew() && !this.id) return base;
        return base + (base.charAt(base.length - 1) == '/' ? '' : '/') + this.id;
      },
      /**
       * 模型类初始化
       *
       * @method [public] - initialize
       * @author wyj 14.11.16
       */
      initialize: function () {
        console.log('10.BaseModel.initialize [add to collection] or 3.[add to detail]');
      },
      /**
       * 过滤结果, 并提示信息对话框, 若不想提示信息可以设置hideTip为true
       *
       * @method [private] - parse
       * @param response
       * @param options
       * @returns {*}
       * @author wyj 14.11.16
       */
      parse: function (response, options) {
        var ctx = this;
        if (response.msg && !this.hideTip) {
          var buttons = [];
          if (response.success) {
            buttons.push({ value: '继续添加', callback: function () {
              ctx.set('id', null);
            }});
            buttons.push({ value: '确定', callback: function () {
              if (typeof window.detailDialog != 'undefined') {
                window.detailDialog.close(); // 关键性语句
              }
              this.close();
            }, autofocus: true });
          } else {
            buttons.push({ value: '确定', callback: function () {
              this.close();
            }, autofocus: true });
          }
          dialog({
            title: '提示：',
            content: response.msg,
            width: 250,
            button: buttons
          }).show();
        }
        if (response.attributes) {
          response = response.attributes.data;
        }
        response.id = response[ctx.baseId]; response.time = new Date().getTime();
        return response;
      },
      /**
       * 保存模型类
       *
       * @method [public] - saveField
       * @param keyValue
       * @param callback
       * @param ctx
       * @param async
       * @author wyj 14.11.16
       */
      saveField: function (keyValue, callback, ctx, async) {
        var wait = async || true;
        ctx.model.set(keyValue);
        ctx.model.save(null, {
          wait: wait,
          success: function (model, result) {
            if (typeof callback != 'undefined') {
              callback.call(ctx, model, result);
            }
          }
        });
      },
      /**
       * checkbox选择框
       *
       * @method [public] - toggle
       * @author wyj 14.11.16
       */
      toggle: function () {
        this.set('checked', !this.get('checked'));
      }
    });

    module.exports = BaseModel;
  });