/**
 * @description WwyLeafletDetail
 * @class WwyLeafletDetail
 * @author yongjin<zjut_wyj@163.com> 2015/3/13
 */
define('WwyLeafletDetail', ['BaseDetail', 'template/leaflet_detail', 'WwyModel', 'Utils', 'Service',
  'HandlebarsHelper', 'PicturePick', 'template/leaflet_index'], function (require, exports, module) {
  var WwyLeafletDetail, BaseDetail, template, WwyModel, Utils, Service, HandlebarsHelper, PicturePick, indexTemp;

  BaseDetail = require('BaseDetail');
  template = require('template/leaflet_detail');
  WwyModel = require('WwyModel');
  Utils = require('Utils');
  Service = require('Service');
  HandlebarsHelper = require('HandlebarsHelper');
  PicturePick = require('PicturePick');
  indexTemp = require('template/leaflet_index');

  WwyLeafletDetail = BaseDetail.extend({
    events: {
      'click .btn-back': 'back'
    },
    initialize: function () {
      this._initialize({
        template: template,
        model: WwyModel,
        modelBind: true
      });
    },
    back: function () {
      this._navigate('#/wwy_leaflet', true);
    },
    init: function () {
      this.setIndex();
      this.setInvite();
      this.setPhotos();
      this.initBind();
    },
    initBind: function () {
      var ctx = this;
      this.listenTo(this.model, 'change:title', this.setIndex);
      this.listenTo(this.model, 'change:title1', this.setIndex);
      this.listenTo(this.model, 'change:webimg', this.setIndex);
      this.$('#model-invite.title').bind('change', function () {
        ctx.setInvite();
      });
    },
    setIndex: function () {
      this.iframepage.$('.model-title').html(this.model.get('title'));
      this.iframepage.$('.model-title1').html(this.model.get('title1'));
      this.iframepage.$('.model-webimg').html(this.model.get('webimg'));
    },
    setInvite: function () {
      this.iframepage.$('.invite-title').html(this.model.get('invite')['title']);
      this.iframepage.$('.invite-content').html(this.model.get('invite')['content']);
    },
    setPhotos: function () {
      this.iframepage.$('.model-photos.title').html(this.model.get('photos')['title']);
      this.iframepage.$('.model-photos.content').html(this.model.get('photos')['photos']);
    },
    initDiaplay: function () {
      var displayList = ['invite', 'photos', 'mv', 'message', 'map', 'tip', 'share'];
      var displayItems = [
        {text: '是', value: '01'},
        {text: '否', value: '00'}
      ];
      Est.each(displayList, function (item) {
        Utils.initSelect({
          render: '#' + item + '_display',
          target: '.' + item + '_display',
          items: displayItems
        });
      });
    },
    initIndex: function () {
      var ctx = this;
      Service.getWqtTheme({ text: 'name', value: 'path', select: true })
        .then(function (list) {
          Utils.initSelect({
            render: '#titleTheme',
            target: '#model-titleTheme',
            items: list,
            change: function (model) {
              if (ctx.iframepage.$ && ctx.iframepage.$('.customcss').size() > 0)
                ctx.iframepage.$('.customcss').attr('href', CONST.PIC_URL + '/wqt/' + model.value);
            }
          });
        });
      this.initDiaplay();
      Utils.initSelect({
        render: '#font',
        target: '#model-font',
        items: [
          {text: '手机预设字体', value: '-'},
          {text: '粗钢笔', value: CONST.HOST + '/modules/wwy/invitation/website/font/cgb'},
          {text: '隶书', value: CONST.HOST + '/modules/wwy/invitation/website/font/ls'}
        ],
        change: function (model) {
          if (ctx.iframepage && ctx.iframepage.$)
            ctx.iframepage.$('.fontcss').attr('href', model.value);
        }
      });
      Utils.initSelect({
        render: '#music',
        target: '#model-music',
        items: [
          {text: '无音乐', value: '-'},
          {text: '新年財神到 (30S).mp3', value: 'xncsd'},
          {text: '恭喜發財舞曲 (30S).mp3', value: 'gxfcwq'},
          {text: '舞龍鳳 (30S).mp3', value: 'wlf'},
          {text: '花與夢', value: 'hxm'},
          {text: '邂逅', value: 'xg'},
          {text: 'This Ring', value: 'This Ring'},
          {text: 'Canon in D Serenade', value: 'Canon in D Serenade'},
          {text: "She's A Rocket", value: "She's A Rocket"},
          {text: 'Russian Wedding', value: 'Russian Wedding'},
          {text: 'Spring Vivaldi', value: 'Spring Vivaldi'},
          {text: 'The Four Seasons(Winter)', value: 'The Four Seasons(Winter)'},
          {text: 'The Swan', value: 'The Swan'},
          {text: 'Wedding March', value: 'Wedding March'},
          {text: 'Marry_You', value: 'Marry_You'},
          {text: "50's stories", value: "50's stories"},
          {text: 'American Rodeo', value: 'American Rodeo'},
          {text: 'Canon in D major for Strings', value: 'Canon in D major for Strings'},
          {text: 'Dance with Me', value: 'Dance with Me'},
          {text: 'Fit To Be Tied-Band', value: 'Fit To Be Tied-Band'},
          {text: 'Jesu Joy', value: 'Jesu Joy'},
          {text: 'Marry_You', value: 'Marry_You'},
          {text: 'Make It Last', value: 'Make It Last'},
          {text: 'Ode To Joy', value: 'Ode To Joy'},
        ],
        change: function (model) {
          if (ctx.iframepage && ctx.iframepage.$) {
            //ctx.iframepage.$('#xaudio-source').attr('src', CONST.PIC_URL + '/wqt/music/' + model.value + '.mp3');
            ctx.iframepage.setMusic && ctx.iframepage.setMusic(CONST.PIC_URL + '/wqt/music/' + model.value + '.mp3');
            ctx.model.set('music', model.value);
          }
        }
      });
      var pic = [];
      if (!this._isAdd) {
        pic.push({
          attId: '001',
          serverPath: this.model.get('webimg'),
          title: '重新上传',
          hasPic: true,
          isAddBtn: false
        });
      }
      this.invitationPicPick = new PicturePick({
        el: '#picture-pick',
        viewId: 'invitationPicPick',
        _isAdd: this._isAdd, // 是否为添加模式
        items: pic, // 初始化数据
        max: 1,
        change: function (result) {
          debug(result);
        }
      });
    },
    initInvite: function () {
      Utils.initEditor({ render: '.ckeditor' });
    },
    initPhotos: function () {
      var pic_list = [];
      if (!this._isAdd) {
        Est.each(this.model._getValue('photos.photos'), function (item) {
          pic_list.push({
            attId: item.attId,
            serverPath: item.serverPath,
            title: '重新上传',
            hasPic: true,
            isAddBtn: false
          });
        });
      }
      app.addView('invitationPhotoPick', new PicturePick({
        el: '#photos-pick',
        viewId: 'invitationPhotoPick',
        _isAdd: this._isAdd, // 是否为添加模式
        items: pic_list, // 初始化数据
        max: 20
      }));
    },
    initMv: function () {
      var pic_mv = [];
      if (!this._isAdd) {
        pic_mv.push({
          attId: '002',
          serverPath: this.model.get('mv')['pic'],
          title: '重新上传',
          hasPic: true,
          isAddBtn: false
        });
      }
      this.invitationMvPick = new PicturePick({
        el: '#mv-pick',
        viewId: 'invitationMvPick',
        _isAdd: this._isAdd, // 是否为添加模式
        items: pic_mv, // 初始化数据
        max: 1,
        change: function (result) {
          debug(result);
        }
      });
    },
    initMap: function () {
      var ctx = this;
      this.$('.map-info').keyup(function () {
        ctx.iframemap.$('#mapInfo').val($(this).val());
        ctx.iframemap.$('#mapInfo').keyup();
      });
    },
    initTip: function () {
      Utils.initDate({
        render: '.calendar',
        showTime: false
      });
    },
    initThemeId: function () {
      this.model.set('themeId', this.model.get('titleTheme').replace(/^css\/(.+?)\/.*\.css$/g, '$1'));
    },
    render: function () {
      var ctx = this;
      // 字符串转换成JSON对象
      this._parseJSON(['pages']);
      this.model.set('leafletUrl', CONST.DOMAIN + '/leaflet/' + Est.cookie('username') + '/' + this.model.get('id') + '.html?diy=1');
      if (this.model._getValue('share.url') === 'http://') this.model._setValue('share.url', this.model.get('leafletUrl'));
      //this.initThemeId();
      this._render();
      this.iframepage = this.$("#iframepage").get(0).contentWindow;
      //this.iframemap = this.$('#iframemap').get(0).contentWindow;
      Utils.initTab({
        render: '#tab',
        elCls: 'nav-tabs',
        panelContainer: '#panel',
        autoRender: true,
        children: [
          {title: '基本信息', value: 'base', selected: true},
          {title: '页面设计', value: 'page'},
          {title: '微信参数', value: 'wx'}
        ],
        change: function (ev) {
          /*debug(ev.item.get('value'));
           if (ctx.iframepage && ctx.iframepage.$) {
           ctx.iframepage.$('#' + ev.item.get('value') + '_detail_title').click();
           }
           if (ev.item.get('value') === 'index' && ctx.iframepage.$) {
           ctx.iframepage.$('body').stop(true, true).animate({scrollTop: 0}, '500');
           }*/
        }
      });
      //this.initIndex();
      //this.initInvite();
      //this.initMv();
      //this.initPhotos();
      //this.initMap();
      //this.initTip();
      this._form('#J_Form')._validate()._init({
        onBeforeSave: function () {
          this.model._hideTip();
          //this.model.set('webimg', this.invitationPicPick.getItem().serverPath);
          //this.model._setValue('photos.photos', app.getView('invitationPhotoPick').getItems());
          //this.model._setValue('mv.pic', this.invitationMvPick.getItem().serverPath);

          this.model.set('enterpriseId', Est.cookie('enterpriseId'));
          this.model.set('username', Est.cookie('username'));

          // 时间
          //var date = this.model._getValue('tip.time');
          //this.model.set('countdown_yy', parseInt(date.substring(0, 4), 10));
          //this.model.set('countdown_mm', parseInt(date.substring(6, 8), 10) - 1);
          //this.model.set('countdown_dd', parseInt(date.substring(8, 10), 10));
          //this.model.set('countdown_hh', parseInt(this._getValue('tip.hour'), 10));
          //this.model.set('countdown_mn', parseInt(this._getValue('tip.minute'), 10));

          //this.initThemeId();

          // map
          //var address = this.model._getValue('map.address').split(',');
          //this.model._setValue('map.x', address[0]);
          //this.model._setValue('map.y', address[1]);
          this.leafletTemplate = HandlebarsHelper.compile(indexTemp);
          this.model.set('html', this.leafletTemplate(this.model.toJSON()));
          this._stringifyJSON(['pages']);
        },
        onAfterSave: function () {
          Utils.comfirm({
            title: '',
            content: '保存成功！',
            success: Est.proxy(function () {
              this.$('#iframepage').attr('src', this.model.get('wqturl') + '?' + Est.nextUid('v='));
            }, this)
          });
        }
      });
    }
  });

  module.exports = WwyLeafletDetail;
});