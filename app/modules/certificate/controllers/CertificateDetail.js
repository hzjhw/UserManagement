/**
 * @description 添加或修改视图
 * @namespace CertificateDetail
 * @author wxw on 14-12-15
 */

define('CertificateDetail', ['jquery', 'CertificateModel', 'HandlebarsHelper', 'BaseDetail', 'AttributesShow',
    'dialog', 'template/certificate_detail', 'Tag', 'Utils','PicturePick'],
  function (require, exports, module) {
    var CertificateDetail, CertificateModel, HandlebarsHelper, BaseDetail, template, AttributesShow, dialog, Tag, Utils,
      PicturePick;

    CertificateModel = require('CertificateModel');
    HandlebarsHelper = require('HandlebarsHelper');
    BaseDetail = require('BaseDetail');
    template = require('template/certificate_detail');
    dialog = require('dialog');
    AttributesShow = require('AttributesShow');
    Tag = require('Tag');
    Utils = require('Utils');
    PicturePick = require('PicturePick');

    CertificateDetail = BaseDetail.extend({
      el: '#jhw-detail',
      events: {
        'click #certificate-reset': 'reset',
        'click .btn-back': 'back'
      },
      initialize: function () {
        debug('2.CertificateDetail.initialize');
        this._initialize({
          template : template,
          model: CertificateModel
        });
      },
      back: function(){
        this._navigate('#/certificate');
      },
      render: function () {
        debug('4.CertificateDetail.render');
        this.model.set('taglist', Est.pluck(Est.pluck(this.model.get('tagMapStore'), 'tag'), 'name')
          .join(","));
        this._render();
        // 证书分类
            Utils.initSelect({
              render: '#s1',
              target: '#model-type',
              items: app.getStatus('certType')
            });

        // 表单初始化
        this._form('#J_Form')._validate()._init({
          onBeforeSave: function(){
            var photos = app.getView('picturePick').getItems();
            if (photos.length > 0) {
             this.model.set('attachmentId', photos[0]['attId']);
            }
          },
          onAfterSave: function(response){
          }
        });

        // 证书图片
        var pic_list = [];
        if (!this._isAdd) {
          pic_list.push({
            attId:  this.model.get('attId'),
            serverPath: this.model.get('att').serverPath,
            title: '重新上传',
            hasPic: true,
            isAddBtn: false
          });
        }
        if (!PicturePick){ debug('PicturePick模块未引入， 请检查xxx_detail.html页面是否引入common/picture_pick/main.js?'); }
        app.addView('picturePick', new PicturePick({
          el: '#picture-pick',
          viewId: 'picturePick',
          _isAdd: this._isAdd, // 是否为添加模式
          items: pic_list, // 初始化数据
          max: 1
        }));

        setTimeout(function () {
          Utils.resetIframe();
        }, 1000);
        return this;
      }
    });

    module.exports = CertificateDetail;

  });