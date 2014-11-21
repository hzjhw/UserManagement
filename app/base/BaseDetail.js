/**
 * @description BaseDetail
 * @namespace BaseDetail
 * @author yongjin<zjut_wyj@163.com> 2014.11.12
 */

define('BaseDetail', ['jquery', 'underscore', 'backbone', 'Est', 'HandlebarsHelper'],
  function (require, exports, module) {
    var BaseDetail, Backbone, Est, HandlebarsHelper;

    Backbone = require('backbone');
    Est = require('Est');
    HandlebarsHelper = require('HandlebarsHelper');

    BaseDetail = Backbone.View.extend({
      /**
       * 初始化
       *
       * @method [protected] - _initialize
       * @param options
       * @private
       * @author wyj 14.11.20
       * @example
       *    this._initialize({
              template : template,
              model: ProductModel
        });
       */
      _initialize: function(options){
        this.template = HandlebarsHelper.compile(options.template);
        this._initModel(options.model, this);
      },
      /**
       * 渲染
       *
       * @method [protected] - _render
       * @private
       * @author wyj 14.11.20
       */
      _render: function(){
        this.$el.html(this.template(this.model.toJSON()));
      },
      /**
       * 初始化模型类 将自动判断是否有ID传递进来，
       * 若存在则从服务器端获取详细内容
       * 若为添加， 则在ctx 与模型类里设置 _isAdd = true
       *
       * @method [protected] - _initModel
       * @param model
       * @param context
       * @author wyj 14.11.15
       */
      _initModel: function (model, context) {
        context.passId = Est.getUrlParam('id', window.location.href);
        if (!Est.isEmpty(this.passId)) {
          context.model = new model();
          context.model.set('id', context.passId);
          context.model.fetch()
            .done(function () {
              context.model.set('_isAdd', context._isAdd = false);
              context.render()._resetIframe();
          });
        } else {
          context.passId = new Date().getTime();
          context.model = new model();
          context.model.set('_isAdd', context._isAdd = true)
          context.render()._resetIframe();
        }
      },
      /**
       * form包装器， 传递表单选择符
       *
       * @method [protected] - _form
       * @param {String} formSelector 选择器
       * @returns {BaseDetail}
       * @author wyj on 14.11.15
       * @example
       *    this._form('#J_Form')._validate()._init(function () {
          // 处理特殊字段
          this.model.set('taglist', Est.map(ctx.tagInstance.collection.models, function(item){
            return item.get('name');
          }).join(','));
        });
       */
      _form: function (formSelector) {
        this.formSelector = formSelector;
        return this;
      },
      /**
       * 启用表单验证
       *
       * @method [protected] - _validate
       * @returns {BaseDetail}
       * @author wyj 14.11.15
       * @example
       *    this._form('#J_Form')._validate()._init(function () {
          // 处理特殊字段
          this.model.set('taglist', Est.map(ctx.tagInstance.collection.models, function(item){
            return item.get('name');
          }).join(','));
        });
       */
      _validate: function () {
        var ctx = this;
        BUI.use('bui/form', function (Form) {
          new Form.Form({
            srcNode: ctx.formSelector
          }).render();
        });
        return this;
      },
      /**
       * 绑定提交按钮
       *
       * @method [protected] - _init
       * @param callback
       * @author wyj 14.11.15
       * @example
       *      this._form('#J_Form')._validate()._init(function () {
          // 处理特殊字段
          this.model.set('taglist', Est.map(ctx.tagInstance.collection.models, function(item){
            return item.get('name');
          }).join(','));
        });
       */
      _init: function (callback) {
        var ctx = this;
        $('#submit', this.el).on('click', function () {
          $("input, textarea, select", $(ctx.formSelector)).each(function () {
            var name, val, pass;
            name = $(this).attr('name');
            var modelId = $(this).attr('id');
            if (modelId && modelId.indexOf('model-') !== -1 && !Est.isEmpty(name)) {
              switch (this.type) {
                case 'radio':
                  val = $(this).is(":checked") ? $(this).val() : pass = true;
                  break;
                default :
                  val = $(this).val();
                  break;
              }
              if (!pass) {
                ctx.model.set(name, val);
              }
            }
          });
          if (typeof callback !== 'undefined')
            callback.call(ctx);
          ctx._save();
        });
      },
      /**
       * 保存结果
       *
       * @method [protected] - _save
       * @author wyj 14.11.18
       */
      _save: function(){
        this._saveItem(function () {
        });
      },
      /**
       * 保存表单
       *
       * @method [private] - _saveItem
       * @param callback
       * @param context
       * @author wyj 14.11.15
       */
      _saveItem: function (callback, context) {
        console.log('BaseDetail._saveItem');
        this.model.save(null, {
          wait: true,
          success: function (response) {
            console.log('BaseDetail._saveSuccess');
            if (top) {
              top.model = response.attributes;
            }
            if (callback && typeof callback === 'function')
              callback.call(context, response);
          }
        });
      },
      /**
       * 获取产品分类
       *
       * @method [protected] - _getProductCategory
       * @param options select 转换成select形式，extend 转换成列表形式
       * @returns {ln.promise}
       * @author wyj 14.11.15
       */
      _getProductCategory: function (options) {
        return new Est.promise(function (topResolve, topReject) {
          options.select = options ? options.select ? true : false : false;
          options.extend = options ? options.extend ? true : false : false;
          var getCategory = function () {
            return new Est.promise(function (resolve, reject) {
              $.ajax({
                type: 'post',
                url: Global.API + '/category/product?pageSize=1000',
                data: {
                  _method: 'GET'
                },
                success: function (result) {
                  resolve(result);
                }
              });
            });
          }
          getCategory().then(function (result) {
            if (result.attributes) {
              result.attributes.data = Est.bulidTreeNode(result.attributes.data, 'grade', '01', {
                categoryId: 'categoryId',// 分类ＩＤ
                belongId: 'belongId',// 父类ＩＤ
                childTag: 'cates', // 子分类集的字段名称
                sortBy: 'sort', // 按某个字段排序
                callback: function (item) {
                  item.text = item.name;
                  item.value = item.categoryId
                }
              });
              if (options.select) {
                result.attributes.data = Est.bulidSelectNode(result.attributes.data, 1, {
                  name: 'text'
                })
              }
              if (options.extend) {
                result.attributes.data = Est.extendTree(result.attributes.data);
              }
            } else {
              result.attributes.data = [];
            }
            result.attributes.data.unshift({text: '请选择分类', value: '0'});
            topResolve(result.attributes.data);
          });
        });
      },
      /**
       * 下拉框初始化
       *
       * @method [protected] - _initSelect
       * @param options  [target 文本框ID] [render 渲染ID] [itemId ID标识] [width 宽度] [items 数组]
       * @returns {ln.promise} 返回promise
       * @author wyj 14.11.15
       */
      _initSelect: function (options) {
        return new Est.promise(function (resove, reject) {
          var container = {};
          var target = options.target || '#category';
          var render = options.render || '#s1';
          var itemId = options.itemId || 'categoryId';
          var width = options.width || '150';
          var items = options.items || [];
          BUI.use('bui/select', function (Select) {
            container[render] = new Select.Select({
              render: render,
              valueField: target,
              width: width,
              items: items
            });
            container[render].render();
            container[render].on('change', function (ev) {
              $(target).val(Est.trim(ev.item[itemId]));
              if (typeof options.change !== 'undefined')
                options.change.call(this, ev.item[itemId]);
              resove(ev.item[itemId]);
            });
          })
        });
      },
      /**
       * 时间选择
       *
       * @method [protected] - _initDate
       * @param options [render 控件选择符] [showTime 是否显示时间]
       * @author wyj 14.11.19
       * @example
       *    this.initDate({
       *      render: '.calendar',
       *      showTime: false
       *    });
       */
      _initDate: function(options){
        BUI.use('bui/calendar',function(Calendar){
          new Calendar.DatePicker({
            trigger:options.render || '.calendar',
            showTime:options.showTime || false,
            autoRender : true
          });
        });
      },
      /**
       * 标签选择框
       *
       * @method [protected] - _initCombox
       * @param options
       * @returns {ln.promise}
       * @author wyj 14.11.17
       * @example
       *      this.initCombox({
                    render: '#tag',
                    target: '#model-tag',
                    items: [ '选项一', '选项二', '选项三', '选项四' ]
                });
       */
      _initCombox: function (options) {
        return new Est.promise(function (resolve, reject) {
          var container = {};
          var target = options.target || '#category';
          var render = options.render || '#s1';
          var itemId = options.itemId || 'categoryId';
          var width = options.width || '500';
          var items = options.items || [];
          BUI.use('bui/select', function (Select) {
            container[render] = new Select.Combox({
              render: render,
              showTag: true,
              valueField: target,
              elCls: 'bui-tag-follow',
              width: width,
              items: items
            });
            container[render].render();
           /*container[render].on('change', function (ev) {
              //$(target).val($(target)Est.trim(ev.item[itemId]));
              if (typeof options.change !== 'undefined')
                options.change.call(this, ev.item[itemId]);
            });*/
          })
        });
      },
      /**
       * 初始化编辑器
       *
       * @method [protected] - _initEditor
       * @author wyj 14.11.15
       */
      _initEditor: function (options) {
        seajs.use(['xheditor'], function (xheditor) {
          function startEditor(obj) {
            $(obj).xheditor(
              {
                tools: 'Preview,Fullscreen,Source,|,contact,abbccQQ,abbccMap,abbccLayout,abbccQrcode,|,Table,abbccImages,abbccFlash,Media,|,FontColor,BackColor,|,Align,Underline,Italic,Bold,|,FontSize,Fontface,|,Link,Unlink',
                layerShadow: 2,
                html5Upload: false,
                upBtnText: '浏览',
                upLinkExt: 'jpg,png,bmp',
                upImgUrl: '/fileUpload/uploadByJson',
                upFlashUrl: '/fileUpload/uploadByJson',
                upMediaUrl: '/fileUpload/uploadByJson',
                upFlashExt: "swf",
                upMediaExt: 'wmv,avi,wma,mp3,mid',
                linkTag: true,
                internalScript: true,
                inlineScript: true
              });
          }

          $(function () {
            $(options.render || '.ckeditor').each(function () {
              startEditor($(this));
            });

          })
        });
      },
      /**
       * 重置表单
       * @method [protected] - _reset
       * @author wyj 14.11.18
       */
      _reset: function () {
        this.model.set(this.model.defaults);
      },
      /**
       * 重置对话框高度
       * @method [protected] - _resetIframe
       * @author wyj 14.11.16
       */
      _resetIframe: function () {
        try {
          if (window.detailDialog && window.detailDialog.height){
            window.detailDialog.height($(document).height());
            window.detailDialog.reset();
          }
        } catch (e) {
          console.error('【error】: BaseDetail.resetIframe' + e);
        }
      },
      /**
       * 移除模型类
       *
       * @method [protected] - _remove
       * @returns {BaseDetail}
       * @author wyj 14.11.16
       */
      _remove: function () {
        console.log('BaseDetail.remove');
        this.model.destroy();
        this.model = null;
        return this;
      },
      /**
       * 移除所有绑定的事件
       *
       * @method [protected] - _close
       * @author wyj 14.11.16
       */
      _close: function () {
        console.log('BaseDetail.close');
        this.undelegateEvents();
        this.stopListening();
        this.off();
      }
    });

    module.exports = BaseDetail;
  });