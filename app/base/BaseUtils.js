/**
 * @description 基础工具类
 * @namespace BaseUtils
 * @author yongjin<zjut_wyj@163.com> 2014/12/2
 */

define('BaseUtils', ['jquery', 'HandlebarsHelper'],
  function (require, exports, module) {
    var BaseUtils, HandlebarsHelper;

    HandlebarsHelper = require('HandlebarsHelper');

    BaseUtils = {
      initSelect: function(options){
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
      getProductCategory: function(options){
        debug('getProductCategory');
        return new Est.promise(function (topResolve, topReject) {
          options.select = options ? options.select ? true : false : false;
          options.extend = options ? options.extend ? true : false : false;
          var getCategory = function () {
            return new Est.promise(function (resolve, reject) {
              $.ajax({
                type: 'post',
                url: CONST.API + '/category/product?pageSize=1000',
                async: false,
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
            result.attributes.data.unshift({text: '请选择分类', value: '/'});
            topResolve(result.attributes.data);
          });
        });
      },
      initDate: function(options){
        BUI.use('bui/calendar',function(Calendar){
          new Calendar.DatePicker({
            trigger:options.render || '.calendar',
            showTime:options.showTime || false,
            autoRender : true
          });
        });
      },
      initCombox: function(options){
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
      initEditor: function(options){
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
      }
    }

    module.exports = BaseUtils;
  }
);