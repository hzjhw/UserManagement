/**
 * @description AlbumDetail
 * @namespace AlbumDetail
 * @author yongjin<zjut_wyj@163.com> 2014/12/15
 */
define('AlbumDetail', ['BaseDetail', 'AlbumModel', 'template/album_detail', 'Utils', 'Service'],
  function (require, exports, module) {
    var AlbumDetail, BaseDetail, AlbumModel, detailTemp, Utils, Service;

    BaseDetail = require('BaseDetail');
    AlbumModel = require('AlbumModel');
    detailTemp = require('template/album_detail');
    Utils = require('Utils');
    Service = require('Service');

    AlbumDetail = BaseDetail.extend({
      events: {
        'click #album-reset': 'reset'
      },
      initialize: function () {
        this._initialize({
          template: detailTemp,
          model: AlbumModel,
          enterRender: '#submit'
        });
      },
      render: function () {
        this._render();
        if (window.parentId) this.$('#model-parentId').val(window.parentId);
        Service.getAlbumList({ tree: true, extend: true, select: true })
          .then(function (result) {
            Utils.initSelect({
              render: '#s1',
              target: '#model-parentId',
              items: result
            });
          });
        this._form('#J_Form')._validate()._init({ });
        setTimeout(function () {
          Utils.resetIframe();
        }, 1000);
        return this;
      }
    });

    module.exports = AlbumDetail;
  });