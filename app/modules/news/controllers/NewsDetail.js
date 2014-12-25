/**
 * @description 新闻添加或修改视图
 * @namespace NewsDetail
 * @author jihui-wxw on 2014/12/10
 */
define('NewsDetail', ['jquery', 'NewsModel', 'HandlebarsHelper', 'BaseDetail', 'AttributesShow', 'dialog',
    'template/news_detail', 'Tag', 'BaseService', 'BaseUtils','PicturePick'],
  function (require, exports, module) {
    var NewsDetail, NewsModel, HandlebarsHelper, BaseDetail, template, AttributesShow, dialog, Tag, BaseService, BaseUtils,PicturePick;

    NewsModel = require('NewsModel');
    HandlebarsHelper = require('HandlebarsHelper');
    BaseDetail = require('BaseDetail');
    template = require('template/news_detail');
    dialog = require('dialog');
    AttributesShow = require('AttributesShow');
    Tag = require('Tag');
    PicturePick = require('PicturePick');
    BaseService = require('BaseService');
    BaseUtils = require('BaseUtils');

    NewsDetail = BaseDetail.extend({
      el: '#jhw-detail',
      events: {
        'click #news-reset': 'reset',
        'click #isImagenews' : 'check_img_news'
      },
      initialize: function () {
        debug('2.NewsDetail.initialize');
        this._initialize({
          template : template,
          model: NewsModel
        });
      },
      render: function () {
        debug('4.NewsDetail.render');
        var ctx = this;

        this.model.set('taglist', Est.pluck(Est.pluck(this.model.get('tagMapStore'), 'tag'), 'name')
          .join(","));
        this._render();

        BUI.use(['bui/tab', 'bui/mask'], function (Tab) {
          var tab = new Tab.TabPanel({
            render: '#tab',
            elCls: 'nav-tabs',
            panelContainer: '#panel',
            autoRender: true,
            children: [
              {title: '常规', value: '1', selected: true},
              {title: '新闻内容', value: '2'},
              {title: '搜索引擎优化', value: '3'}
            ]
          });
          tab.on('selectedchange', function (ev) {
            BaseUtils.resetIframe();
          });
        });
// 图片
        var pic_list = [];
        if (!this._isAdd){
          var server_pic_list = JSON.parse(this.model.get('picPath'));
          Est.each(server_pic_list, function(item){
            pic_list.push({
              attId: item.id,
              serverPath: item.sourceProductImagePath,
              title: '重新上传',
              hasPic: true,
              isAddBtn: false
            });
          });

          pic_list.push({
            attId: '',
            serverPath: CONST.PIC_NONE,
            title: '上传图片',
            isAddBtn: true
          });
        }
        app.addView('picturePick', new PicturePick({
          el: '#picture-pick',
          viewId: 'picturePick',
          _isAdd: true, // 是否为添加模式
          items: pic_list, // 初始化数据
          max: 1
        }));
        // 新闻分类
        BaseService.getNewsCategory({ select: true, extend: true })
          .then(function (list) {
            BaseUtils.initSelect({
              render: '#s1',
              target: '#model-category',
              items: list,
              change: function (categoryId) {

              }
            });
            // 属性
            BaseUtils.initSelect({
              render: '#attCate',
              target: '#attCateHid',
              items: list,
              change: function (categoryId) {
                //ctx.showAttributes(categoryId);
                setTimeout(function () {
                  BaseUtils.resetIframe();
                }, 500);
              }
            });

          });

        if (!ctx._isAdd) {
          //ctx.showAttributes(ctx.model.get('category'), ctx.model.get('newsAttributeMapStore'));
        }

        // 产品属性
        BaseUtils.initSelect({
          render: '#s3',
          width: 100,
          itemId:'value',
          target: '#dateselect',
          items: [
            {text: '0', value: '0'},
            {text: '1', value: '1'},
            {text: '2', value: '2'},
            {text: '3', value: '3'},
            {text: '4', value: '4'},
            {text: '5', value: '5'},
            {text: '6', value: '6'},
            {text: '7', value: '7'},
            {text: '8', value: '8'},
            {text: '9', value: '9'},
            {text: '10', value: '10'}
          ],
          change : function(event){
            var addtime=parseFloat(ctx.model.get('addTime'))+parseFloat(event*60*60*24*1000);
            $("#model-addTime").val(Est.dateFormat(addtime, 'yyyy-MM-dd'));
          }
        });

        // 编辑器
        BaseUtils.initEditor({
          render: '.ckeditor'
        });

        // 表单初始化
        this._form('#J_Form')._validate()._init({});
        setTimeout(function () {
          BaseUtils.resetIframe();
        }, 1000);

        return this;
      },
      showAttributes: function(categoryId, items){
        if (!this.attributes){
          this.attributes = new AttributesShow({
            render: '#attributes-list',
            categoryId: categoryId,
            items: items
          });
        } else{
          this.attributes.reload(categoryId);
        }
      },
      check_img_news : function(){

      }
    });

    module.exports = NewsDetail;

  });