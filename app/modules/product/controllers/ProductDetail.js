/**
 * @description 产品添加或修改视图
 * @namespace ProductDetail
 * @author yongjin on 2014/10/31
 */
define('ProductDetail', ['jquery', 'ProductModel', 'HandlebarsHelper', 'Est', 'BaseDetail', 'AttributesShow', 'dialog', 'template/product_detail', 'Tag'],
  function (require, exports, module) {
    var ProductDetail, ProductModel, HandlebarsHelper, Est, BaseDetail, template, AttributesShow, dialog, Tag;

    ProductModel = require('ProductModel');
    HandlebarsHelper = require('HandlebarsHelper');
    Est = require('Est');
    BaseDetail = require('BaseDetail');
    template = require('template/product_detail');
    dialog = require('dialog');
    AttributesShow = require('AttributesShow');
    Tag = require('Tag');

    ProductDetail = BaseDetail.extend({
      el: '#jhw-detail',
      template: HandlebarsHelper.compile(template),
      events: {
        'click #product-reset': 'reset'
      },
      initialize: function () {
        console.log('2.ProductDetail.initialize');
        this.initModel(ProductModel, this);
      },

      render: function () {
        console.log('4.ProductDetail.render');
        var ctx = this;
        this.model.set('taglist', Est.pluck(Est.pluck(this.model.get('tagMapStore'),'tag'), 'name')
        .join(","));
        this.$el.html(this.template(this.model.toJSON()));

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
            ctx.resetIframe();
          });
        });

        // 产品分类
        this.getProductCategory({ select: true, extend: true })
          .then(function (list) {
            ctx.initSelect({
              render: '#s1',
              target: '#model-category',
              items: list,
              change: function (categoryId) {
                var buttons = [
                  {
                    value: '更换',
                    callback: function () {
                      ctx.attributes = new AttributesShow({
                        categoryId: categoryId
                      });
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
                  ctx.attributes = new AttributesShow({
                    categoryId: categoryId
                  });
                  //TODO 产品标签

                }
              }
            });
            // 属性
            ctx.initSelect({
              render: '#attCate',
              target: '#attCateHid',
              items: list,
              change: function (categoryId) {
                ctx.attributes = new AttributesShow({
                  categoryId: categoryId
                });
                setTimeout(function () {
                  ctx.resetIframe();
                }, 500);
              }
            });
            // 标签
            ctx.tagInstance = new Tag({
              el: '#tag-box',
              itemId: ctx.model.get('id'),
              _isAdd: ctx._isAdd // 是否初始化标签列表
            });
            /*$.ajax({
              type: 'get',
              url: Global.API + '/tag/product',
              success: function(result){
                var taglist = Est.pluck(result.attributes.data, 'name');
                Est.each(Est.pluck(Est.cloneDeep(list), 'text'), function(item, i){
                  if (i !== 0) {
                    taglist.push(item.replace(/^\s*\|-/g, ''));
                  }
                });
                ctx.initCombox({
                  render: '#pro-tag',
                  target: '#model-taglist',
                  items: taglist
                });
              }
            })*/

          });

        if (!ctx._isAdd) {
          ctx.attributes = new AttributesShow({
            categoryId: ctx.model.get('category'),
            items: ctx.model.get('productAttributeMapStore')
          });
        }

        // 产品属性
        this.initSelect({
          render: '#s2',
          width: 100,
          target: '#model-loginView',
          items: [
            {text: '访问者可见', value: '1'},
            {text: '登录后可见', value: '0'}
          ]
        });
        this.initSelect({
          render: '#s2',
          width: 100,
          target: '#model-ads',
          items: [
            {text: '广告产品', value: '2'},
            {text: '是', value: '1'},
            {text: '否', value: '0'}
          ]
        });
        this.initSelect({
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
        this.initEditor();

        this.form('#J_Form').validate().init(function () {
          // 处理特殊字段
          this.model.set('taglist', Est.map(ctx.tagInstance.collection.models, function(item){
            return item.get('name');
          }).join(','));
        });
        setTimeout(function () {
          ctx.resetIframe();
        }, 1000);
        return this;
      }
    });

    module.exports = ProductDetail;

  });