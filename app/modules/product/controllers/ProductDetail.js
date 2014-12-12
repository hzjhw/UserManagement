/**
 * @description 产品添加或修改视图
 * @namespace ProductDetail
 * @author yongjin on 2014/10/31
 */
define('ProductDetail', ['jquery', 'ProductModel', 'HandlebarsHelper', 'BaseDetail', 'AttributesShow', 'dialog', 'template/product_detail', 'Tag'],
  function (require, exports, module) {
    var ProductDetail, ProductModel, HandlebarsHelper, BaseDetail, template, AttributesShow, dialog, Tag;

    ProductModel = require('ProductModel');
    HandlebarsHelper = require('HandlebarsHelper');
    BaseDetail = require('BaseDetail');
    template = require('template/product_detail');
    dialog = require('dialog');
    AttributesShow = require('AttributesShow');
    Tag = require('Tag');

    ProductDetail = BaseDetail.extend({
      el: '#jhw-detail',
      events: {
        'click #product-reset': 'reset'
      },
      initialize: function () {
        debug('2.ProductDetail.initialize');
        this._initialize({
          template : template,
          model: ProductModel
        });
      },
      render: function () {
        debug('4.ProductDetail.render');
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
              {title: '产品描述', value: '2'},
              {title: '产品属性', value: '3'},
              {title: '商城属性', value: '4'},
              {title: '产品标签', value: '5'},
              {title: '搜索引擎优化', value: '6'}
            ]
          });
          tab.on('selectedchange', function (ev) {
            ctx._resetIframe();
          });
        });

        // 产品分类
        this._getProductCategory({ select: true, extend: true })
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
                      ctx.showAttributes(categoryId, []);
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
                    content: '更换分类将更改产品属性选项， 点击“保留”只更改分类， 不更改属性！',
                    width: 250,
                    button: buttons
                  }).show($("#s1").get(0));
                } else {
                  ctx.showAttributes(categoryId);
                  //TODO 产品标签

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
            // 标签
            ctx.tagInstance = new Tag({
              el: '#tag-box',
              itemId: ctx.model.get('id'),
              _isAdd: ctx._isAdd // 是否初始化标签列表
            });
          });

        if (!ctx._isAdd) {
          ctx.showAttributes(ctx.model.get('category'), ctx.model.get('productAttributeMapStore'));
        }

        // 产品属性
        this._initSelect({
          render: '#s2',
          width: 100,
          target: '#model-loginView',
          items: [
            {text: '访问者可见', value: '1'},
            {text: '登录后可见', value: '0'}
          ]
        });

        this._initSelect({
          render: '#s2',
          width: 100,
          target: '#model-ads',
          items: [
            {text: '广告产品', value: '2'},
            {text: '是', value: '1'},
            {text: '否', value: '0'}
          ]
        });

        this._initSelect({
          render: '#weightUnit',
          width: 100,
          target: '#model-weightUnit',
          itemId: 'value',
          items: [
            {text: '克', value: 'g'},
            {text: '千克', value: 'kg'},
            {text: '吨', value: 't'}
          ]
        });

        // 编辑器
        this._initEditor({
          render: '.ckeditor'
        });

        // 表单初始化
        this._form('#J_Form')._validate()._init({
          onBeforeSave: function(){
            // 处理特殊字段
            this.model.set('taglist', Est.map(ctx.tagInstance.collection.models, function (item) {
              return item.get('name');
            }).join(','));
          },
          onAfterSave: function(response){

          }

        });

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
      }
    });

    module.exports = ProductDetail;

  });