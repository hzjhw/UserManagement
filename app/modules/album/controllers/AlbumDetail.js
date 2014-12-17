/**
 * @description AlbumDetail
 * @namespace AlbumDetail
 * @author yongjin<zjut_wyj@163.com> 2014/12/15
 */
define('AlbumDetail', ['BaseDetail', 'AlbumModel', 'template/album_detail', 'BaseUtils'], function(require, exports, module){
  var AlbumDetail, BaseDetail, AlbumModel, detailTemp, BaseUtils;

  BaseDetail = require('BaseDetail');
  AlbumModel = require('AlbumModel');
  detailTemp = require('template/album_detail');
  BaseUtils = require('BaseUtils');

  AlbumDetail = BaseDetail.extend({
    el: '#jhw-detail',
    events: {
      'click #album-reset': 'reset'
    },
    initialize: function(){
      this._initialize({
        template: detailTemp,
        model: AlbumModel,
        enterRender: '#submit'
      });
    },
    render: function(){
      var ctx = this;
      this._render();
      // 产品分类
      BaseUtils.initSelect({
        render: '#s1',
        target: '#model-parentId',
        list: BaseUtils.getAlbumList({
          extend: true,
          select: true
        })
      });
      this._form('#J_Form')._validate()._init({
      });
      setTimeout(function () {
        ctx._resetIframe();
      }, 1000);
      return this;
    }
  });

  module.exports = AlbumDetail;
});