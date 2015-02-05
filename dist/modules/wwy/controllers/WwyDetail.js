/**
 * @description 微网页添加或修改视图
 * @namespace WwyDetail
 * @author yongjin on 2014/10/31
 */
define('WwyDetail', ['jquery', 'WwyModel', 'HandlebarsHelper', 'BaseDetail', 'AttributesShow', "Utils", 'dialog',
    'template/wwy_detail', 'PicturePick', 'WwyPicturePick', 'WwyLtyList'],
  function (require, exports, module) {
    var WwyDetail, WwyModel, HandlebarsHelper, BaseDetail, template, AttributesShow, WwyLtyList, dialog, Utils, PicturePick, WwyPicturePick;

    WwyModel = require('WwyModel');
    HandlebarsHelper = require('HandlebarsHelper');
    BaseDetail = require('BaseDetail');
    template = require('template/wwy_detail');
    dialog = require('dialog');
    AttributesShow = require('AttributesShow');
    Utils = require('Utils');
    PicturePick = require('PicturePick');
    WwyPicturePick = require('WwyPicturePick');
    WwyLtyList = require('WwyLtyList');

    WwyDetail = BaseDetail.extend({
      el: '#jhw-detail',
      events: {
        'click #wwy-reset': 'reset',
        'click .lty-add': 'ltyAdd',
        'click .lty-show': 'ltyShow',
        'click .btn-back': 'back'
      },
      initialize: function () {
        debug('2.WwyDetail.initialize');
        this._initialize({
          template: template,
          model: WwyModel
        });
      },
      back: function(){
        this._navigate('#/wwy', true);
      },
      ltyAdd: function () {
        app.getView('wwyLtyList').addOne();
      },
      ltyShow: function () {
        app.getView('wwyLtyList').ltyShow();
      },
      render: function () {
        debug('4.WwyDetail.render');
        var wwy_pic_list = [];
        var pathObj = {
          hidShare: false,
          hidZf: false,
          music: { path: '', muted: true },
          video: '',
          pic: {}
        };
        //处理翻屏模式下的json
        if (!Est.isEmpty(this.model.get('paths'))) {
          pathObj = $.parseJSON(this.model.get('paths'));
          this.model.set('hidShare', pathObj['hidShare']);
          this.model.set('hidZf', pathObj['hidZf']);
          this.model.set('music', pathObj['music']['path']);
          this.model.set('video', pathObj['video']);
          Est.each(pathObj['pic'], function (item) {
            item['title'] = '重新上传';
          });
          Est.each(pathObj['pic'], function (item) {
            item['serverPath'] = item['path'];
          });
          wwy_pic_list = pathObj['pic'] || [];
          debug(pathObj);
        }

        this._render();
        Utils.initTab({
          render: '#tab',
          elCls: 'nav-tabs',
          panelContainer: '#panel',
          autoRender: true,
          children: [
            {title: '基本参数', value: '1', selected: true},
            {title: '转发控制', value: '2'},
            {title: '留言控制', value: '3'},
            {title: '图片控制', value: '4'},
            {title: '抽奖控制', value: '5'},
            {title: '分享参数', value: '6'},
            {title: '其它参数', value: '7'}
          ]
        });
        // 编辑器
        Utils.initEditor({
          render: '.ckeditor'
        });
        // 图片
        var pic_list = [];
        if (!Est.isEmpty(this.model.get('sharepic'))) {
          pic_list.push({
            attId: '',
            serverPath: this.model.get('sharepic'),
            title: '重新上传',
            hasPic: true,
            isAddBtn: false
          });
        }

        app.addView('wwyPicturePick', new PicturePick({
          el: '#picture-pick',
          viewId: 'wwyPicturePick',
          _isAdd: this._isAdd, // 是否为添加模式
          max: 1, // 限制最大上传个数， 默认为无限
          items: pic_list// 初始化数据
        }));

        // 显示图片
        app.addView('wwyImgPick', new WwyPicturePick({
          el: '#wwy-picture-pick',
          viewId: 'wwyImgPick',
          _isAdd: this._isAdd, // 是否为添加模式
          items: wwy_pic_list, // 初始化数据
          max: 10
        }));

        // 抽奖
        var ltyObj = {
          lotteryImage: '',
          lotteryRule: []
        };
        if (this.model.get('ltyRule')) {
          ltyObj = $.parseJSON(Est.unescapeHTML(this.model.get('ltyRule')));
        }
        this.model.set('lotteryImage', ltyObj['lotteryImage']);
        app.addView('wwyLtyList', new WwyLtyList({
          el: '#lty-tbody',
          viewId: 'wwyLtyList',
          _isAdd: this._isAdd,
          items: ltyObj['lotteryRule'],
          max: 10
        }));

        // 表单初始
        this._form('#J_Form')._validate()._init({
          onBeforeSave: function () {
            // 留言选项
            var msglist = [];
            this.$('.msgShow').each(function () {
              if ($(this).is(":checked")) {
                msglist.push($(this).val());
              }
            });
            this.model.set('msgctrl', msglist.join(', '));
            // 转发图片
            var photos = app.getView('wwyPicturePick').getItems();
            if (photos.length > 0) {
              this.model.set('sharepic', photos[0]['serverPath']);
            }
            // 音乐
            pathObj.music = {
              path: this.model.get('music'),
              muted: true
            }
            // 视频
            pathObj.video = this.model.get('video');
            // 图片
            pathObj.pic = app.getView('wwyImgPick').getItems();
            pathObj['hidShare'] = this.model.get('hideShare');
            pathObj['hidZf'] = this.model.get('hidZf');
            this.model.set('paths', JSON.stringify(pathObj));
            // 抽奖
            ltyObj['lotteryImage'] = this.model.get('lotteryImage');
            ltyObj['lotteryRule'] = app.getView('wwyLtyList').getItems();
            this.model.set('ltyRule', Est.escapeHTML($.toJSON(ltyObj)));
          },
          onAfterSave: function (response) {

          }
        });
        this.$('.x-icon-help').each(function () {
          var title = $(this).attr('title');
          if (title) {
            $(this).mouseover(function () {
              Utils.tooltip(title, {
                id: 'wwytip',
                align: 'right',
                target: $(this).get(0)
              });
            });
          }
        });

        setTimeout(function () {
          Utils.resetIframe();
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
    function (i) {
      if ($(this).attr("checked")) {

        t += '<input type="checkbox" id="msgctrl0-'
          + i + '" value="' + $(this).val()
          + '" name="showmsgctrl">';
        t += '<label class="checkboxLabel" for="msgctrl0-' + i + '">'
          + $(this).next().html()
          + '</label>&nbsp;';
      }
    })
  $(".showmsgctrl").html(t);
}