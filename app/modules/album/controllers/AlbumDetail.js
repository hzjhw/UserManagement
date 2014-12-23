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
      el: '#jhw-detail',
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
        var ctx = this;
        this._render();
        // 产品分类
        if (window.parentId){
          this.$('#model-parentId').val(window.parentId);
        }
        BaseUtils.initSelect({
          render: '#s1',
          target: '#model-parentId',
          items: BaseService.getAlbumList({
            tree: true,
            extend: true,
            select: true
          })
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