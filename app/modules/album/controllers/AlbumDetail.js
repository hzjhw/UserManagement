/**
 * @description AlbumDetail
 * @namespace AlbumDetail
 * @author yongjin<zjut_wyj@163.com> 2014/12/15
 */
define('AlbumDetail', ['BaseDetail', 'AlbumModel', 'template/album_detail', 'BaseUtils', 'BaseService'],
  function (require, exports, module) {
    var AlbumDetail, BaseDetail, AlbumModel, detailTemp, BaseUtils, BaseService;

    BaseDetail = require('BaseDetail');
    AlbumModel = require('AlbumModel');
    detailTemp = require('template/album_detail');
    BaseUtils = require('BaseUtils');
    BaseService = require('BaseService');

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
        if (window.parentId) {
          this.$('#model-parentId').val(window.parentId);
        }
        var items = BaseService.getAlbumList({
          tree: true,
          extend: true,
          select: true
        });
        BaseUtils.initSelect({
          render: '#s1',
          target: '#model-parentId',
          items: items
        });
        this._form('#J_Form')._validate()._init({
        });
        setTimeout(function () {
          BaseUtils.resetIframe();
        }, 1000);
        return this;
      }
    });

    module.exports = AlbumDetail;
  });