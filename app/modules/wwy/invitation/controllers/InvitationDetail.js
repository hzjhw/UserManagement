/**
 * @description 请贴详细页面
 * @class InvitationDetail
 * @author yongjin<zjut_wyj@163.com> 2015/1/28
 */
define('InvitationDetail', ['BaseDetail', 'InvitationModel', 'Utils', 'BaseUtils', 'Service', 'HandlebarsHelper', 'template/invitation_detail',
    'PicturePick', 'template/invitation_index'],
  function (require, exports, module) {
    var InvitationDetail, BaseDetail, template, InvitationModel, Utils, BaseUtils, PicturePick, Service , invitationTemp, HandlebarsHelper;

    BaseDetail = require('BaseDetail');
    template = require('template/invitation_detail');
    InvitationModel = require('InvitationModel');
    Utils = require('Utils');
    BaseUtils = require('BaseUtils');
    PicturePick = require('PicturePick');
    invitationTemp = require('template/invitation_index');
    HandlebarsHelper = require('HandlebarsHelper');
    Service = require('Service');

    InvitationDetail = BaseDetail.extend({
      events: {
        'click .btn-back': 'back'
      },
      initialize: function () {
        this._initialize({
          template: template,
          model: InvitationModel,
          modelBind: true
        });
      },
      back: function () {
        this._navigate('#/wwy_invitation', true);
      },
      init: function () {
        var ctx = this;
        this.setIndex();
        this.setInvite();
        this.setPhotos();

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
      // 设置爱的邀约
      setInvite: function () {
        this.iframepage.$('.invite-title').html(this.model.get('invite')['title']);
        this.iframepage.$('.invite-content').html(this.model.get('invite')['content']);
      },
      setPhotos: function () {
        this.iframepage.$('.model-photos.title').html(this.model.get('photos')['title']);
        this.iframepage.$('.model-photos.content').html(this.model.get('photos')['photos']);
      },
      initDiaplay: function () {
        BaseUtils.initSelect({
          render: '#display01',
          target: '.invite_display',
          items: [
            {text: '是', value: '01'},
            {text: '否', value: '00'}
          ]
        });
        BaseUtils.initSelect({
          render: '#display02',
          target: '.photos_display',
          items: [
            {text: '是', value: '01'},
            {text: '否', value: '00'}
          ]
        });
        BaseUtils.initSelect({
          render: '#display03',
          target: '.mv_display',
          items: [
            {text: '是', value: '01'},
            {text: '否', value: '00'}
          ]
        });
        BaseUtils.initSelect({
          render: '#display04',
          target: '.message_display',
          items: [
            {text: '是', value: '01'},
            {text: '否', value: '00'}
          ]
        });
        BaseUtils.initSelect({
          render: '#display05',
          target: '.map_display',
          items: [
            {text: '是', value: '01'},
            {text: '否', value: '00'}
          ]
        });
        BaseUtils.initSelect({
          render: '#display06',
          target: '.tip_display',
          items: [
            {text: '是', value: '01'},
            {text: '否', value: '00'}
          ]
        });
        BaseUtils.initSelect({
          render: '#display07',
          target: '.share_display',
          items: [
            {text: '是', value: '01'},
            {text: '否', value: '00'}
          ]
        });
      },
      initIndex: function () {
        // 主题
        Service.getWqtTheme({ text: 'name', value: 'path', select: true })
          .then(function (list) {
            BaseUtils.initSelect({
              render: '#titleTheme',
              target: '#model-titleTheme',
              items: list
            });
          });
        this.initDiaplay();
        // 字体
        BaseUtils.initSelect({
          render: '#font',
          target: '#model-font',
          items: [
            {text: '手机预设字体', value: 'Microsoft JhengHei,Microsoft YaHei,arial||0|0'},
            {text: '粗钢笔', value: '粗钢笔2,微软雅黑,宋体,Microsoft JhengHei,Microsoft YaHei,arial|http://42.121.32.43:443/Fonts/getcss?family=%E7%B2%97%E9%92%A2%E7%AC%942&font=%E7%B2%97%E9%92%A2%E7%AC%94|1|1'}
          ]
        });
        // 音乐
        BaseUtils.initSelect({
          render: '#music',
          target: '#model-music',
          items: [
            {text: '无音乐', value: '-'},
            {text: '花與夢', value: 'audios_system/m1206064fcf0242da28e.mp3'},
            {text: '邂逅', value: 'audios_system/m1206064fcf12f8bd883.mp3'}
          ]
        });
        // 封面图片
        var pic = [];
        if (!this._isAdd) {
          pic.push({
            attId: '',
            serverPath: this.model.get('webimg'),
            title: '重新上传',
            hasPic: true,
            isAddBtn: false
          });
        }
        app.addView('invitationPicPick', new PicturePick({
          el: '#picture-pick',
          viewId: 'invitationPicPick',
          _isAdd: this._isAdd, // 是否为添加模式
          items: pic, // 初始化数据
          max: 1,
          change: function (result) {
            debug(result);
          }
        }));
      },
      initInvite: function () {
        Utils.initEditor({
          render: '.ckeditor'
        });
      },
      initPhotos: function () {
        var pic_list = [];
        if (!this._isAdd) {
          Est.each(this.model.get('photos')['photos'], function (item) {
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
        // 视频图片
        var pic_mv = [];
        if (!this._isAdd) {
          pic_mv.push({
            attId: '',
            serverPath: this.model.get('mv')['pic'],
            title: '重新上传',
            hasPic: true,
            isAddBtn: false
          });
        }
        app.addView('invitationMvPick', new PicturePick({
          el: '#mv-pick',
          viewId: 'invitationMvPick',
          _isAdd: this._isAdd, // 是否为添加模式
          items: pic_mv, // 初始化数据
          max: 1,
          change: function (result) {
            debug(result);
          }
        }));
      },
      initMap: function () {
        var pic_map = [];
        if (!this._isAdd) {
          pic_map.push({
            attId: '',
            serverPath: this.model.get('map')['address'],
            title: '重新上传',
            hasPic: true,
            isAddBtn: false
          });
        }
        app.addView('invitationMapPick', new PicturePick({
          el: '#map-pic',
          viewId: 'invitationMapPick',
          _isAdd: this._isAdd, // 是否为添加模式
          items: pic_map, // 初始化数据
          max: 1
        }));

      },
      initTip: function () {
        Utils.initDate({
          render: '.calendar',
          showTime: false
        });

      },
      render: function () {
        var ctx = this;
        // 字符串转换成JSON对象
        this._parseJSON(['invite', 'photos', 'mv', 'message', 'map', 'tip', 'share']);
        if (!Est.isEmpty(this.model.get('id'))) {
          this.model.set('wqturl', CONST.DOMAIN + '/wqt/' + Est.cookie('username') + '/' + this.model.get('id') + '.html')
          //this.model.set('wqturl', 'http://jihui88.com/member/modules/wwy/invitation/402881e34b3556b4014b35f40d940016.html')
        } else {
          this.model.set('wqturl', 'modules/wwy/invitation/website/index.html');
        }
        this.model.set('themeId', this.model.get('titleTheme').replace(/^css\/(.+?)\/.*\.css$/g, '$1'));
        this._render();
        this.iframepage = this.$("#iframepage").get(0).contentWindow;
        Utils.initTab({
          render: '#tab',
          elCls: 'nav-tabs',
          panelContainer: '#panel',
          autoRender: true,
          children: [
            {title: '主页设置', value: 'index', selected: true},
            {title: '爱的邀约', value: 'invite'},
            {title: '婚纱相册', value: 'photos'},
            {title: '婚宴视频', value: 'mv'},
            {title: '婚宴回函', value: 'message'},
            {title: '婚宴地图', value: 'map'},
            {title: '喜宴提醒', value: 'tip'},
            {title: '喜讯分享', value: 'share'}
          ],
          change: function (ev) {
            debug(ev.item.get('value'));
            if (ctx.iframepage) {
              ctx.iframepage.$('#invite_detail_title_' + ev.item.get('value')).click();
            }
            if (ev.item.get('value') === 'index') {
              ctx.iframepage.$('body').scrollTop(0);
            }
          }
        });
        this.initIndex();
        this.initInvite();
        this.initMv();
        this.initPhotos();
        this.initMap();
        this.initTip();
        this._form('#J_Form')._validate()._init({
          onBeforeSave: function () {
            var pic = app.getView('invitationPicPick').getItems();
            if (pic.length > 0) {
              this.model.set('webimg', pic[0]['serverPath']);
            }
            var photos = app.getView('invitationPhotoPick').getItems();
            this.model.get('photos')['photos'] = photos;
            var map = app.getView('invitationMapPick').getItems();
            if (map.length > 0) {
              Est.setValue(this.model.attributes, 'map.address', map[0]['serverPath']);
            }
            var mv = app.getView('invitationMvPick').getItems();
            if (mv.length > 0) {
              Est.setValue(this.model.attributes, 'mv.pic', mv[0]['serverPath']);
            }
            this.model.set('enterpriseId', Est.cookie('enterpriseId'));
            this.model.set('username', Est.cookie('username'));
            var date = this.model.get('tip')['time'];
            this.model.set('countdown_yy', parseInt(date.substring(0, 4), 10));
            this.model.set('countdown_mm', parseInt(date.substring(6, 8), 10) - 1);
            this.model.set('countdown_dd', parseInt(date.substring(8, 10), 10));
            this.model.set('countdown_hh', parseInt(this._getValue('tip.hour'), 10));
            this.model.set('countdown_mn', parseInt(this._getValue('tip.minute'), 10));

            this.invitationTemplate = HandlebarsHelper.compile(invitationTemp);
            this.model.set('html', this.invitationTemplate(this.model.toJSON()));
            this._stringifyJSON(['invite', 'photos', 'mv', 'message', 'map', 'tip', 'share']);
          }
        });
      }
    });

    module.exports = InvitationDetail;
  });