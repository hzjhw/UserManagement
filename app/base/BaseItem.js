/**
 * @description 集合中的单个视图
 * @namespace BaseItem
 * @author yongjin<zjut_wyj@163.com> 2014.11.11
 */
define('BaseItem', ['jquery', 'underscore', 'backbone', 'dialog', 'HandlebarsHelper'],
  function (require, exports, module) {
    var Backbone, dialog, BaseItem, HandlebarsHelper;

    Backbone = require('backbone');
    dialog = require('dialog');
    HandlebarsHelper = require('HandlebarsHelper');

    BaseItem = Backbone.View.extend({
      /**
       * 初始化, 若该视图的子元素有hover选择符， 则自动为其添加鼠标经过显示隐藏事件
       *
       * @method [protected] - _initialize
       * @param {Object} options [template: 模板字符串]
       * @author wyj 14.11.16
       * @example
       *    initialize: function () {
              this._initialize({ template: itemTemp });
            },
       */
      _initialize: function (options) {
        var ctx = this;
        this.options = options || {};

        // 编译模板
        if (options.template)
          this.template = HandlebarsHelper.compile(options.template);

        // 绑定事件
        //this.model.bind('change:children', this.render, this);
        this.model.bind('reset', this.render, this);
        this.model.bind('change', this.render, this);
        this.model.bind('destroy', this.remove, this);

        // 若存在当前视图， 则移除
        if (this.model.view) this.model.view.remove();
        this.model.view = this;
        if (this.model.get('dx') % 2 === 0) {
          this.$el.addClass('bui-grid-row-even');
        }

        // hover事件
        this.$el.hover(function () {
          ctx.$el.addClass('hover');
        }, function () {
          ctx.$el.removeClass('hover');
        });
      },
      /**
       * 设置模型类
       * @method [private] - _setInitModel
       * @param model
       * @author wyj 14.11.20
       */
      _setInitModel: function (model) {
        this.initModel = model;
      },
      /**
       * 渲染前事件
       *
       * @method [protected] - _onBeforeRender
       * @private
       * @author wyj 14.12.3
       */
      _onBeforeRender: function(){
        return new Est.promise(function(resolve){

        });
      },
      /**
       * 渲染后事件
       *
       * @method [protected] - _onAfterRender
       * @private
       * @author wyj 14.12.3
       */
      _onAfterRender: function(){
        return new Est.promise(function(resolve){

        });
      },
      /**
       * 渲染
       *
       * @method [protected] - _render
       * @returns {BaseCollection}
       * @author wyj 14.11.18
       */
      _render: function () {
        debug('11.ProductItem._render [item display]');
        this._onBeforeRender();
        this.$el.html(this.template(this.model.toJSON()));
        this._onAfterRender();
        return this;
      },
      /**
       * 移除监听
       *
       * @method [protected] - _close
       * @author wyj 14.11.16
       */
      _close: function () {
        debug('BaseItem._close');
        this.stopListening();
      },
      /**
       * 移除此模型
       *
       * @method [protected] - _clear
       * @author wyj 14.11.16
       */
      _clear: function () {
        debug('ProductItem._clear');
        this.model.destroy();
      },
      /**
       * checkbox选择框转换
       *
       * @method [protected] - _toggleChecked
       * @author wyj 14.11.16
       */
      _toggleChecked: function () {
        this.model.set('checked', !this.model.get('checked'));
      },
      /**
       * 单个字段保存
       *
       * @method [protected] - _editField
       * @param options [title: 标题][field: 字段名][target: 选择符(对话框指向于哪个元素)]
       * @param context
       * @returns {ln.promise}
       * @author wyj 14.11.16
       */
      _editField: function (options, context) {
        return new Est.promise(function (resolve, reject) {
          //context.model.fetch();
          var dialog = require('dialog');
          var oldName = context.model.attributes[options.field];
          var d = dialog({
            title: options.title || '修改',
            content: '<input id="property-returnValue-demo" type="text" class="text" value="' + oldName + '" />',
            button: [
              {
                value: '确定',
                autofocus: true,
                callback: function () {
                  var value = $('#property-returnValue-demo').val();
                  this.close(value);
                  this.remove();
                }}
            ]
          });
          d.addEventListener('close', function () {
            var obj = {};
            if (!this.returnValue.length < 1 && this.returnValue !==
              context.model.previous(options.field)) {
              obj['id'] = context.model.get('id');
              obj[options.field] = this.returnValue;
              context.model._saveField(obj, context, {
                success: function(keyValue, result){
                  context.model.set(keyValue);
                }
              });
              resolve(context, this.returnValue);
            }
          });
          d.show(context.$(options.target || 'div').get(0));
        });
      },
      /**
       *  删除模型类
       *
       *  @method [protected] - _del
       *  @author wyj 14.11.16
       */
      _del: function () {
        debug('1.BaseItem._del');
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
       * @method [protected] - _edit
       * @param options
       * @author wyj 14.11.16
       */
      _edit: function (options) {
        debug('1.BaseItem._edit');
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