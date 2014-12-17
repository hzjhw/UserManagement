/**
 * @description PhotoCopy
 * @namespace PhotoCopy
 * @author yongjin<zjut_wyj@163.com> 2014/12/17
 */
define('PhotoCopy', ['BaseView', 'HandlebarsHelper', 'template/photo_copy'], function(require, exports, module){
  var PhotoCopy, BaseView, HandlebarsHelper, detailTemp;

  BaseView = require('BaseView');
  HandlebarsHelper = require('HandlebarsHelper');
  detailTemp = require('template/photo_ocpy');

  PhotoCopy = BaseView.extend({

  });

  module.exports = PhotoCopy;
});