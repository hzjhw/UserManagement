/**
 * @description 基础工具类
 * @class Utils - 工具类
 * @author yongjin<zjut_wyj@163.com> 2014/12/2
 */

define('Utils', ['jquery', 'HandlebarsHelper', 'BaseUtils'],
  function (require, exports, module) {
    var Utils, HandlebarsHelper, BaseUtils;

    HandlebarsHelper = require('HandlebarsHelper');
    BaseUtils = require('BaseUtils');

    Utils = {
      /**
       * 初始化选择框
       *
       * @method [表单] - initSelect
       * @param options [target: '#category'  input元素选择符][render: '#s1' 渲染到哪个DIV下]
       * [itemId: 'value' 相应ID][width: 宽度][items: [] 列表][change: 选项改变回调方法]
       * @return {Est.promise}
       * @author wyj 14.12.18
       * @example
       *      Utils.initSelect({
       *         render: '#s1',
       *         target: '#model-parentId',
       *         items: [],
       *         itemId: 'value', // 默认为value
       *         change: function(item){
       *           console.log(item.changeId);
       *         }
       *       });
       */
      initSelect: function (options) {
        BaseUtils.execute('initSelect', options);
      },
      /**
       * 初始化级联地区
       *
       * @method [地区] - initDistrict
       * @author wyj 15.1.6
       * @example
       Utils.initDistrict({
                 id: 'district1' ,// 必填
                 render: '#district-container', // 目标选择符
                 target: '#model-dist',
                 path: '...',
                 url: CONST.API + '/shop/receiver/list' // 自定义请求地址
               });
       */
      initDistrict: function (options) {
        BaseUtils.execute('initDistrict', options);
      },
      /**
       * 初始化tab选项卡
       *
       * @method [选项卡] - initTab
       * @param options
       * @author wyj 14.12.24
       * @example
       *        Utils.initTab({
       *          render: '#tab',
       *          elCls: 'nav-tabs',
       *          panelContainer: '#panel',
       *          autoRender: true,
       *          children: [
       *            {title: '常规', value: '1', selected: true},
       *            {title: '产品描述', value: '2'},
       *            {title: '产品属性', value: '3'},
       *            {title: '商城属性', value: '4'},
       *            {title: '产品标签', value: '5'},
       *            {title: '搜索引擎优化', value: '6'}
       *          ]
       *        });
       */
      initTab: function (options) {
        BUI.use(['bui/tab', 'bui/mask'], function (Tab) {
          var tab = new Tab.TabPanel(options);
          tab.on('selectedchange', function (ev) {
            options.change && options.change.call(this, ev);
            Utils.resetIframe();
          });
          tab.render();
        });
      },
      /**
       * 初始化下拉框
       * @method initDropDown
       * @param options
       * @author wyj 15.2.17
       * @example
       *      BaseUtils.initDropDown({
            target: '#drop-down-content', // 显示下拉框的触发按钮
            height: 250, // 默认为auto
            width: 150, // 默认为auto
            //overflowX: 'auto', // 默认为hidden
            content: $('#template-drop-down').html(), // 显示内容
            callback: function (options) { // 下拉框渲染完成后的回调函数
                setTimeout(function(){
                    app.getView(options.dropDownId).reflesh(function () { // 刷新
                        this._options.items = ['111']; // 重新设置options参数里的items
                    });
                    app.getView(options.dropDownId).hide(); // dropDownId 为当前下拉框的viewId
                }, 1000);
            }
        });
       BaseUtils.initDropDown({
            target: '#drop-down-module-id',
            moduleId: 'AttributesAdd',
            items: ['111', '222', '333'],
            callback: function(options){
                setTimeout(function(){
                    app.getView(options.dropDownId).hide();
                }, 1000);
            }
        });
       */
      initDropDown: function (options) {
        BaseUtils.execute('initDropDown', options);
      },
      /**
       * 图片上传
       *
       * @method [上传] - initUpload
       * @param options [render:　选择符][context: 上下文]
       * @author wyj 14.12.17
       * @example
       *      // 图片添加
       *      Utils.openUpload({
       *       albumId: app.getData('curAlbumId'),
       *       username: app.getData('user').username, // 必填
       *       auto: true,
       *       oniframeload: function(){
       *         this.iframeNode.contentWindow.uploadCallback = doResult;
       *       }
       *      });
       *      // 图片替换
       *      Utils.openUpload({
       *        id: 'replaceDialog' + id,
       *        title: '图片替换',
       *        albumId: app.getData('curAlbumId'), // 必填
       *        username: app.getData('user').username, // 必填
       *        replace: true, // 必填
       *        attId: this.model.get('attId'), // 必填
       *        oniframeload: function () {
       *          this.iframeNode.contentWindow.uploadCallback = function (results) { // results返回结果
       *          ctx.model.set('uploadTime', new Date().getTime());
       *          window['replaceDialog' + id].close().remove();
       *          };
       *        }
       *      });
       *      // 选取图片
       *      Utils.openUpload({
                id: 'uploadDialog',
                type: type,
                albumId: app.getData('curAlbumId'),
                username: app.getData('user') && app.getData('user').username,
                auto: true,
                oniframeload: function(){
                  this.iframeNode.contentWindow.uploadCallback = function(result){
                    ctx.addItems(result);
                  };
                },
                success: function(){
                  var result = this.iframeNode.contentWindow.app.getView('picSource').getItems();
                  ctx.addItems(result);
                }
              });
       */
      openUpload: function (options) {
        this.iframeDialog(BaseUtils.execute('openUpload', options));
      },
      /**
       * 初始化日期选择器
       *
       * @method [表单] - initDate
       * @param options [render: 选择符][showTime: true/false 是否显示时间]
       * @author wyj 14.12.17
       * @example
       *      Utils.initDate({
       *         render: '.calendar',
       *         showTime: false
       *       });
       */
      initDate: function (options) {
        BUI.use('bui/calendar', function (Calendar) {
          new Calendar.DatePicker({
            trigger: options.render || '.calendar',
            showTime: options.showTime || false,
            autoRender: true
          });
        });
      },
      /**
       * 初始化多标签
       *
       * @method [表单] - initCombox
       * @param options
       * @return {Est.promise}
       * @author wyj 14.12.17
       * @example
       *      Utils.initCombox({
       *         render: '#tag',
       *         target: '#model-tag',
       *         itemId: 'categoryId'
       *           items: [ '选项一', '选项二', '选项三', '选项四' ]
       *       });
       */
      initCombox: function (options) {
        var $q = Est.promise;
        return new $q(function (resolve, reject) {
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
          });
        });
      },
      /**
       * 初始化编辑器
       *
       * @method [表单] - initEditor
       * @param options
       * @author wyj 14.12.18
       * @example
       *      Utils.initEditor({
       *        render: '.ckeditor'
       *      });
       */
      initEditor: function (options) {
        BaseUtils.execute('initEditor', options);
      },
      /**
       * 提示信息
       *
       * @method [对话框] - tip
       * @param msg
       * @param options
       * @author wyj 14.12.18
       * @example
       *      Utils.tip('提示内容', {
       *        time: 1000,
       *        title: '温馨提示'
       *      });
       */
      tip: function (msg, options) {
        options = options || {time: 3000, title: '提示信息：'};
        seajs.use(['dialog-plus'], function (dialog) {
          window.tipsDialog = app.addDialog(dialog({
            id: 'tip-dialog' + Est.nextUid(),
            title: options.title,
            width: 200,
            content: msg
          })).show();
          setTimeout(function () {
            window.tipsDialog.close().remove();
          }, options.time);
        });
      },
      /**
       * input鼠标点击提示
       *
       * @method [提示] - tooltip
       * @param msg
       * @param options
       * @author wyj 14.12.24
       * @example
       *        this.$('input, textarea').each(function(){
       *          var title = $(this).attr('title');
       *          if (title){
       *            $(this).click(function(){
       *            Utils.tooltip(title, {
       *              align: 'right',
       *              target: $(this).get(0)
       *            });
       *          });
       *          }
       *        });
       */
      tooltip: function (msg, options) {
        options = Est.extend({
          id: Est.nextUid('dialog'),
          content: msg,
          time: 4000,
          align: 'right',
          padding: 5
        }, options);
        seajs.use(['dialog-plus'], function (dialog) {
          window.tooltipDialog && window.tooltipDialog.close();
          window.tooltipDialog = app.addDialog(dialog(options)).show(options.target);
          setTimeout(function () {
            window.tooltipDialog.close().remove();
          }, options.time);
        });
      },
      /**
       * 确认框， 比如删除操作
       *
       * @method [对话框] - comfirm
       * @param opts [title: 标题][content: 内容][success: 成功回调]
       * @author wyj 14.12.8
       * @example
       *      Utils.comfirm({
       *        title: '提示',
       *        target: this.$('.name').get(0),
       *        content: '是否删除?',
       *        success: function(){
       *          ...
       *        }
       *      });
       */
      comfirm: function (opts) {
        var options = {
          title: '温馨提示：',
          content: '是否删除！',
          success: function () {
          },
          target: null
        };
        Est.extend(options, opts);
        seajs.use(['dialog-plus'], function (dialog) {
          window.comfirmDialog = app.addDialog(dialog({
            id: 'dialog' + Est.nextUid(),
            title: options.title,
            content: options.content,
            width: options.width || 200,
            button: [
              {
                value: '确定',
                autofocus: true,
                callback: function () {
                  options.success.call(this);
                }},
              {
                value: '取消',
                callback: function () {
                  window.comfirmDialog.close().remove();
                }
              }
            ]
          })).show(options.target);
        });
      },
      /**
       * 重置对话框高度
       * @method [对话框] - resetIframe
       * @author wyj 14.11.16
       * @example
       *      Utils.resetIframe(dialog);
       */
      resetIframe: function (dialog) {
        var height = $(document).height();
        var dialog = dialog || window.topDialog || window.detailDialog;
        try {
          if (!dialog) {
            setTimeout(function () {
              var i = app.getDialogs().length;
              while (i > 0) {
                if (Est.isEmpty(app.getDialogs()[i - 1])) {
                  app.getDialogs().splice(i - 1, 1);
                } else {
                  app.getDialogs()[i - 1].reset();
                }
                i--;
              }
            }, 100);
          }
          if (dialog && dialog.height) {
            dialog.height(height);
            dialog.reset();
          }
        } catch (e) {
          console.error('【error】: BaseDetail.resetIframe' + e);
        }
      },
      /**
       * 对话框
       *
       * @method [对话框] - dialog
       * @param options [title: ][width: ][height: ][target: ][success: 确定按钮回调]
       * @author wyj 14.12.18
       * @example
       *      Utils.dialog({
       *         id: 'copyDialog',
       *         title: '复制图片',
       *         target: '.btn-email-bind',
       *         width: 800,
       *         content: this.copyDetail({
       *           filename: this.model.get('filename'),
       *           serverPath: this.model.get('serverPath')
       *         }),
       *         cover: true, // 是否显示遮罩
       *         load: function(){
       *           ...base.js
       *         },
       *         success: function(){
       *           this.close();
       *         }
       *       });
       */
      dialog: function (options) {
        var button = options.button || [];
        seajs.use(['dialog-plus'], function (dialog) {
          if (options.success) {
            button.push({ value: '确定', autofocus: true,
              callback: function () {
                options.success.apply(this, arguments);
              }
            });
          }
          button.push({
            value: '关闭',
            callback: function () {
              this.close().remove();
            } });
          options = Est.extend({
            id: 'dialog' + Est.nextUid(),
            title: '对话框',
            width: 150, content: '',
            button: button
          }, options);
          if (options.target) {
            options.target = $(options.target).get(0);
          }
          options.oniframeload = function () {
            try {
              this.iframeNode.contentWindow.topDialog = thisDialog;
              this.iframeNode.contentWindow.app = app;
              delete app.getRoutes()['index'];
            } catch (e) {
            }
            if (typeof options.load === 'function') {
              options.load.call(this, arguments);
            }
          }
          if (options.cover) {
            app.addDialog(dialog(options)).showModal(options.target);
          } else {
            app.addDialog(dialog(options)).show(options.target);
          }
        });
      },
      /**
       * 打开iframe对话框
       *
       * @method [对话框] - iframeDialog
       * @param options [url: ''] [title: 标题][width: ][height: ][success: 确定按钮成功回调方法][target:　绑定到对象]
       * @author wyj 14.12.15
       * @example
       *      Utils.iframeDialog({
       *         title: '黑名单',
       *         url: CONST.DOMAIN + '/user/blacklist/view',
       *         width: 500,
       *         target: '.name',
       *         success: function(){
       *             this.title(CONST.SUBMIT_TIP);
       *             this.iframeNode.contentWindow.$("#submit").click();
       *             return false;
       *         }
       *       });
       */
      iframeDialog: function (options) {
        var button = [];
        if (options.success) {
          button.push({
            value: '确定',
            autofocus: true,
            callback: function () {
              options.success.call(this);
            }});
        }
        button.push({
          value: '关闭',
          callback: function () {
            this.close().remove();
          }
        });
        options = Est.extend({
          id: 'dialog',
          title: '窗口',
          url: '',
          width: 150,
          height: 'auto',
          target: null,
          button: button
        }, options);
        seajs.use(['dialog-plus'], function (dialog) {
          window[options.id ||
            'iframeDialog'] = dialog(options).show(options.target);
        });
      },
      /**
       * 初始化复制按钮
       *
       * @method [复制] - initCopy
       * @param selecter
       * @param options
       * @author wyj 14.12.18
       * @example
       *        Utils.initCopy('#photo-copy-dialog', {
       *           success: function(){
       *             window.copyDialog.close();
       *           }
       *         });
       *
       */
      initCopy: function (selecter, options) {
        BaseUtils.execute('initCopy', selecter, options, Est.proxy(function () {
          this.tip('复制成功', {
            time: 1000
          });
        }, this));
      },
      /**
       * 查看物流
       * @method delivery
       * @param options
       * @author wyj 15.1.23
       * @example
       *        Utils.delivery({
                  com: this.model.get('deliveryType')['defaultDeliveryCorp']['com'], // 物流公司
                  nu: this.model.get('shippingSet')[0]['deliverySn'], // 物流编号
                  target: this.$('.delivery-view').get(0)
                });
       */
      delivery: function (options) {
        seajs.use(['HandlebarsHelper', 'template/delivery_ickd'], function (HandlebarsHelper, ickdTemp) {
          var ickd = HandlebarsHelper.compile(ickdTemp);
          $.ajax({
            type: 'get',
            url: CONST.DELIVERY_URL + "&com=" + options.com + "&nu=" + options.nu,
            async: false,
            dataType: 'jsonp',
            success: function (result) {
              Utils.dialog({
                title: '物流信息',
                content: ickd(result),
                width: 400,
                target: options.target
              });
            }
          });
        });
      },
      getDesignUrl: function () {
        var user = app.getData('user');
        if (!user) return '';
        var grade = user['grade'];
        var url = CONST.DOMAIN;
        switch (grade) {
          case '07':
            url += ('/rest/maintain/' + app.getData('user')['username']);
            break;
          case '01':
            url += ('/maintain/' + app.getData('user')['username']);
            break;
          case '02':
            url += ('/rest/maintain/' + app.getData('user')['username']);
            break;
          case '03':
            url += '/rest/industry/maintain/' + app.getData('user')['username'];
            break;
          case '05':
            url += '/rest/groupsMaintain/' + app.getData('user')['username'];
          default:
            url += ('/rest/maintain/' + app.getData('user')['username']);
            break;
        }
        return url+'/';
      },
      getMobileDesignUrl: function(){
        return ('/rest/mobileMaintain/' + app.getData('user')['username']+'/');
      }
    };

    module.exports = Utils;
  }
);