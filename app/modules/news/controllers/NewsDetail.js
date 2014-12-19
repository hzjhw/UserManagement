/**
 * @description 新闻添加或修改视图
 * @namespace NewsDetail
 * @author jihui-wxw on 2014/12/10
 */
define('NewsDetail', ['jquery', 'NewsModel', 'HandlebarsHelper', 'BaseDetail', 'AttributesShow', 'dialog', 'template/news_detail', 'Tag'],
  function (require, exports, module) {
    var NewsDetail, NewsModel, HandlebarsHelper, BaseDetail, template, AttributesShow, dialog, Tag;

    NewsModel = require('NewsModel');
    HandlebarsHelper = require('HandlebarsHelper');
    BaseDetail = require('BaseDetail');
    template = require('template/news_detail');
    dialog = require('dialog');
    AttributesShow = require('AttributesShow');
    Tag = require('Tag');

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
              {title: '搜索引擎优化', value: '6'}
            ]
          });
          tab.on('selectedchange', function (ev) {
            ctx._resetIframe();
          });
        });

        // 新闻分类
        this._getNewsCategory({ select: true, extend: true })
          .then(function (list) {
            ctx._initSelect({
              render: '#s1',
              target: '#model-category',
              items: list,
              change: function (categoryId) {
                var buttons = [
                  {
                    value: '更换',
                    callback: function () {
                      ctx.showAttributes(categoryId, items);
                    }},
                  {
                    value: '保留',
                    autofocus: true,
                    callback: function () {
                      this.close();
                    }
                  }
                ];
                if (!ctx._isAdd) {
                  dialog({
                    title: '提示',
                    content: '更换分类将更改新闻属性选项， 点击“保留”只更改分类， 不更改属性！',
                    width: 250,
                    button: buttons
                  }).show($("#s1").get(0));
                } else {
                  ctx.showAttributes(categoryId);
                  //TODO 新闻标签

                }
              }
            });
            // 属性
            ctx._initSelect({
              render: '#attCate',
              target: '#attCateHid',
              items: list,
              change: function (categoryId) {
                ctx.showAttributes(categoryId);
                setTimeout(function () {
                  ctx._resetIframe();
                }, 500);
              }
            });

          });

        if (!ctx._isAdd) {
          ctx.showAttributes(ctx.model.get('category'), ctx.model.get('newsAttributeMapStore'));
        }

        // 产品属性
        this._initSelect({
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
        this._initEditor({
          render: '.content'
        });

        // 表单初始化
        this._form('#J_Form')._validate()._init({});
        setTimeout(function () {
          ctx._resetIframe();
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