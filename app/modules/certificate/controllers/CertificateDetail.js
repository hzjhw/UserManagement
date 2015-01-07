/**
 * @description 添加或修改视图
 * @namespace CertificateDetail
 * @author wxw on 14-12-15
 */

define('CertificateDetail', ['jquery', 'CertificateModel', 'HandlebarsHelper', 'BaseDetail', 'AttributesShow',
    'dialog', 'template/certificate_detail', 'Tag', 'BaseUtils','PicturePick'],
  function (require, exports, module) {
    var CertificateDetail, CertificateModel, HandlebarsHelper, BaseDetail, template, AttributesShow, dialog, Tag, BaseUtils,
      PicturePick;

    CertificateModel = require('CertificateModel');
    HandlebarsHelper = require('HandlebarsHelper');
    BaseDetail = require('BaseDetail');
    template = require('template/certificate_detail');
    dialog = require('dialog');
    AttributesShow = require('AttributesShow');
    Tag = require('Tag');
    BaseUtils = require('BaseUtils');
    PicturePick = require('PicturePick');

    CertificateDetail = BaseDetail.extend({
      el: '#jhw-detail',
      events: {
        'click #certificate-reset': 'reset'
      },
      initialize: function () {
        debug('2.CertificateDetail.initialize');
        this._initialize({
          template : template,
          model: CertificateModel
        });
      },
      render: function () {
        debug('4.CertificateDetail.render');
        var ctx = this;

        this.model.set('taglist', Est.pluck(Est.pluck(this.model.get('tagMapStore'), 'tag'), 'name')
          .join(","));
        this._render();

        // 证书分类
            BaseUtils.initSelect({
              render: '#s1',
              target: '#model-type',
              items: app.getStatus('certType')
            });

        // 表单初始化
        this._form('#J_Form')._validate()._init({
          onBeforeSave: function(){
          },
          onAfterSave: function(response){
          }
        });

        // 产品图片
        var pic_list = [];
        if (!this._isAdd) {
          var attList = JSON.parse(this.model.get('attList'));
          var id=this.model.get('id');
            pic_list.push({
              attId: id,
              serverPath: attList,
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
          max: 9
        }));

        setTimeout(function () {
          BaseUtils.resetIframe();
        }, 1000);
        return this;
      }
    });

    module.exports = CertificateDetail;

  });