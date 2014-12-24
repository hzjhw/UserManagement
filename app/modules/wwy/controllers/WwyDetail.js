/**
 * @description 产品添加或修改视图
 * @namespace WwyDetail
 * @author yongjin on 2014/10/31
 */
define('WwyDetail', ['jquery', 'WwyModel', 'HandlebarsHelper', 'BaseDetail', 'AttributesShow',"BaseUtils", 'dialog', 'template/wwy_detail'],
  function (require, exports, module) {
    var WwyDetail, WwyModel, HandlebarsHelper, BaseDetail, template, AttributesShow, dialog,BaseUtils;

    WwyModel = require('WwyModel');
    HandlebarsHelper = require('HandlebarsHelper');
    BaseDetail = require('BaseDetail');
    template = require('template/wwy_detail');
    dialog = require('dialog');
    AttributesShow = require('AttributesShow');
      BaseUtils = require('BaseUtils');

    WwyDetail = BaseDetail.extend({
      el: '#jhw-detail',
      events: {

        'click #wwy-reset': 'reset'
      },
      initialize: function () {
        debug('2.WwyDetail.initialize');
        this._initialize({
          template : template,
          model: WwyModel
        });
      },
      render: function () {
        debug('4.WwyDetail.render');
        var ctx = this;
          //处理翻屏模式下的json
        var paths = (ctx.model.get("paths"));
        this._render();
          BUI.use(['bui/tab', 'bui/mask'], function (Tab) {
              var tab = new Tab.TabPanel({
                  render: '#tab',
                  elCls: 'nav-tabs',
                  panelContainer: '#panel',
                  autoRender: true,
                  children: [
                      {title: '基本参数', value: '1', selected: true},
                      {title: '分享参数', value: '2'},
                      {title: '其它参数', value: '3'}
                  ]
              });
              tab.on('selectedchange', function (ev) {
                  BaseUtils.resetIframe();
              });
          });
          // 编辑器
          this._initEditor({
              render: '.ckeditor'
          });
        // 表单初始
        this._form('#J_Form')._validate()._init({
          onBeforeSave: function(){
          },
          onAfterSave: function(response){
          }
        });
        setTimeout(function () {
          ctx._resetIframe();
        }, 1000);
        return this;
      }
    });

    module.exports = WwyDetail;

  });
function ctrlmsg(obj) {
    var t = "";
    $(".msgctrl")
        .find("input")
        .each(
        function(i) {
            if ($(this).attr("checked")) {

                t += '<input type="checkbox" id="msgctrl0-'
                    + i + '" value="' + $(this).val()
                    + '" name="showmsgctrl">';
                t += '<label class="checkboxLabel" for="msgctrl0-'+i+'">'
                    + $(this).next().html()
                    + '</label>&nbsp;';
            }
        })
    $(".showmsgctrl").html(t);
}