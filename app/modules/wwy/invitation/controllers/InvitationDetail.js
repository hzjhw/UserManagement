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
        this.displayItems = [
          {text: '是', value: '01'},
          {text: '否', value: '00'}
        ];
        BaseUtils.initSelect({
          render: '#display01',
          target: '.invite_display',
          items: this.displayItems
        });
        BaseUtils.initSelect({
          render: '#display02',
          target: '.photos_display',
          items: this.displayItems
        });
        BaseUtils.initSelect({
          render: '#display03',
          target: '.mv_display',
          items: this.displayItems
        });
        BaseUtils.initSelect({
          render: '#display04',
          target: '.message_display',
          items: this.displayItems
        });
        BaseUtils.initSelect({
          render: '#display05',
          target: '.map_display',
          items: this.displayItems
        });
        BaseUtils.initSelect({
          render: '#display06',
          target: '.tip_display',
          items: this.displayItems
        });
        BaseUtils.initSelect({
          render: '#display07',
          target: '.share_display',
          items: this.displayItems
        });
      },
      initIndex: function () {
        var ctx = this;
        Service.getWqtTheme({ text: 'name', value: 'path', select: true })
          .then(function (list) {
            BaseUtils.initSelect({
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
        BaseUtils.initSelect({
          render: '#font',
          target: '#model-font',
          items: [
            {text: '手机预设字体', value: 'Microsoft JhengHei,Microsoft YaHei,arial||0|0'},
            {text: '粗钢笔', value: '粗钢笔2,微软雅黑,宋体,Microsoft JhengHei,Microsoft YaHei,arial|http://42.121.32.43:443/Fonts/getcss?family=%E7%B2%97%E9%92%A2%E7%AC%942&font=%E7%B2%97%E9%92%A2%E7%AC%94|1|1'},
            {text: '隶书', value: 'http://42.121.32.43:443/Fonts/getcss?family=%E9%BB%91%E4%BD%93215&font=%E9%BB%91%E4%BD%93&text=%0A%20.VYcdimouv%7B%7D%E4%B8%8E%E4%BA%AB%E4%BE%9B%E5%86%8C%E5%87%BD%E5%88%86%E5%8A%A1%E5%96%9C%E5%9B%9E%E5%9B%BE%E5%9C%B0%E5%A4%87%E5%A8%98%E5%A9%9A%E5%AE%A2%E5%AE%B4%E6%8F%90%E6%96%B0%E6%97%A5%E6%9C%8D%E6%9C%9F%E6%9C%AC%E7%88%B1%E7%94%A8%E7%94%B1%E7%9A%84%E7%9B%B8%E7%BA%A6%E7%BA%B1%E8%A7%86%E8%AE%AF%E9%82%80%E9%83%8E%E9%86%92%E9%A2%91%EF%BC%AD%EF%BC%B6'}
          ],
          change: function (model) {
            if (ctx.iframepage && ctx.iframepage.$)
              ctx.iframepage.$('.fontcss').attr('href', model.value);
          }
        });
        BaseUtils.initSelect({
          render: '#music',
          target: '#model-music',
          items: [
            {text: '无音乐', value: '-'},
            {text: 'Marry_You', value: 'Marry_You'}
          ]
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
        this._parseJSON(['invite', 'photos', 'mv', 'message', 'map', 'tip', 'share']);
        this.model.set('wqturl', CONST.DOMAIN + '/wqt/' + Est.cookie('username') + '/' + this.model.get('id') + '.html?diy=1');
        if (this.model._getValue('share.url') === 'http://') this.model._setValue('share.url', this.model.get('wqturl'));
        this.initThemeId();
        this._render();
        this.iframepage = this.$("#iframepage").get(0).contentWindow;
        this.iframemap = this.$('#iframemap').get(0).contentWindow;
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
            if (ctx.iframepage && ctx.iframepage.$) {
              ctx.iframepage.$('#' + ev.item.get('value') + '_detail_title').click();
            }
            if (ev.item.get('value') === 'index' && ctx.iframepage.$) {
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
            this.model._hideTip();
            this.model.set('webimg', this.invitationPicPick.getItem().serverPath);
            this.model._setValue('photos.photos',  app.getView('invitationPhotoPick').getItems());
            this.model._setValue('mv.pic', this.invitationMvPick.getItem().serverPath);

            this.model.set('enterpriseId', Est.cookie('enterpriseId'));
            this.model.set('username', Est.cookie('username'));

            var date = this.model._getValue('tip.time');
            this.model.set('countdown_yy', parseInt(date.substring(0, 4), 10));
            this.model.set('countdown_mm', parseInt(date.substring(6, 8), 10) - 1);
            this.model.set('countdown_dd', parseInt(date.substring(8, 10), 10));
            this.model.set('countdown_hh', parseInt(this._getValue('tip.hour'), 10));
            this.model.set('countdown_mn', parseInt(this._getValue('tip.minute'), 10));

            this.initThemeId();
            var address = this.model._getValue('map.address').split(',');
            this.model._setValue('map.x', address[0]);
            this.model._setValue('map.y', address[1]);
            this.invitationTemplate = HandlebarsHelper.compile(invitationTemp);
            this.model.set('html', this.invitationTemplate(this.model.toJSON()));
            this._stringifyJSON(['invite', 'photos', 'mv', 'message', 'map', 'tip', 'share']);
          },
          onAfterSave: function () {
            var ctx = this;
            Utils.comfirm({
              title: '',
              content: '保存成功！',
              success: function () {
                ctx.$('#iframepage').attr('src', ctx.model.get('wqturl') + '?' + Est.nextUid('v='));
              }
            });
          }
        });
      }
    });

    module.exports = InvitationDetail;
  });