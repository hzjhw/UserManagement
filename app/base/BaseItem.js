/**
 * @description BaseItem
 * @namespace BaseItem
 * @author yongjin on 2014/11/11
 */
define('BaseItem', ['jquery', 'underscore', 'backbone', 'dialog', 'Est'],
  function (require, exports, module) {
    var Backbone, dialog, BaseItem, Est;

    Backbone = require('backbone');
    dialog = require('dialog');
    Est = require('Est');

    BaseItem = Backbone.View.extend({
      /**
       * 初始化
       *
       * @method [private] - initialize
       * @author wyj 14.11.16
       */
      initialize: function () {
        this.model.bind('reset', this.render, this);
        this.model.bind('change', this.render, this);
        this.model.bind('destroy', this.remove, this);
        if (this.model.view) this.model.view.remove();
        this.model.view = this;
      },
      /**
       * 设置模型类
       * @method [protected] - setInitModel
       * @param model
       * @author wyj 14.11.20
       */
      setInitModel: function(model){
        this.initModel = model;
      },
      /**
       * 渲染
       *
       * @method [protected] - render
       * @returns {BaseCollection}
       * @author wyj 14.11.18
       */
      render: function () {
        console.log('11.ProductItem.render [item display]');
        this.$el.html(this.template(this.model.toJSON()));
        return this;
      },
      /**
       * 移除监听
       *
       * @method [public] - close
       * @author wyj 14.11.16
       */
      close: function () {
        console.log('BaseItem.close');
        this.stopListening();
      },
      /**
       * 移除此模型
       *
       * @method [public] - clear
       * @author wyj 14.11.16
       */
      clear: function () {
        console.log('ProductItem.clear');
        this.model.destroy();
      },
      /**
       * checkbox选择框转换
       *
       * @method [public] - toggleChecked
       * @author wyj 14.11.16
       */
      toggleChecked: function () {
        this.$el.find(".toggle").attr("checked", this.model.get('checked'));
      },
      /**
       * 单个字段保存
       *
       * @method [public] - editField
       * @param options
       * @param context
       * @returns {ln.promise}
       * @author wyj 14.11.16
       */
      editField: function (options, context) {
        return new Est.promise(function (resolve, reject) {
          //context.model.fetch();
          var dialog = require('dialog');
          var oldName = context.model.attributes[options.field];
          var d = dialog({
            title: options.title || '修改',
            content: '<input id="property-returnValue-demo" class="text" value="' + oldName + '" />',
            ok: function () {
              var value = $('#property-returnValue-demo').val();
              this.close(value);
              this.remove();
            }
          });
          d.addEventListener('close', function () {
            if (!this.returnValue.length < 1) {
              context.model.saveField({
                'name': this.returnValue
              }, function (model, result) {
                context.render();
              }, context);
              resolve(context, this.returnValue);
            }
          });
          d.show(context.$el.find(options.target || 'div').get(0));
        });
      },
      /**
       *  删除模型类
       *
       *  @method [public] - del
       *  @author wyj 14.11.16
       */
      del: function () {
        console.log('1.BaseItem.del');
        var context = this;
        seajs.use(['dialog-plus'], function (dialog) {
          dialog({
            title: '提示',
            content: '是否删除！',
            width: 150,
            button: [
              {
                value: '确定',
                autofocus: true,
                callback: function () {
                  context.model.destroy();
                }},
              {
                value: '取消',
                callback: function () {
                  this.close();
                }
              }
            ]
          }).show(context.$el.find('.delete').get(0));
        });
      },
      /**
       * 修改模型类
       *
       * @method [public] - edit
       * @param options
       * @author wyj 14.11.16
       */
      edit: function (options) {
        console.log('1.BaseItem.edit');
        var ctx = this;
        seajs.use(['dialog-plus'], function (dialog) {
          window.dialog = dialog;

          window.detailDialog = dialog({
            id: 'edit-dialog',
            title: options.title || '提示',
            width: options.width || 850,
            url: options.url,
            button: [
              {
                value: '保存',
                callback: function () {
                  this.title('正在提交..');
                  this.iframeNode.contentWindow.$("#submit").click();
                  return false;
                },
                autofocus: true
              },
              {
                value: '重置',
                callback: function () {
                  this.iframeNode.contentWindow.$("#reset").click();
                  return false;
                }
              },
              { value: '关闭' }
            ],
            oniframeload: function () {
              this.iframeNode.contentWindow.detailDialog = window.detailDialog;
            },
            onclose: function () {
              ctx.model.set(Est.cloneDeep(window.model));
              this.remove();
              window.model = {};
            }
          });
          window.detailDialog.showModal();
        });
      }
    });

    module.exports = BaseItem;
  });