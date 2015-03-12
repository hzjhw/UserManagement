/**
 * @description 产品添加或修改视图
 * @namespace ProductDetail
 * @author yongjin on 2014/10/31
 */
define('ProductDetail', ['jquery', 'ProductModel', 'HandlebarsHelper', 'BaseDetail', 'AttributesShow',
    'dialog', 'template/product_detail', 'Tag', 'PicturePick', 'Service', 'Utils'],
  function (require, exports, module) {
    var ProductDetail, ProductModel, HandlebarsHelper, BaseDetail, template, AttributesShow, dialog, Tag, PicturePick, Service, Utils;

    ProductModel = require('ProductModel');
    HandlebarsHelper = require('HandlebarsHelper');
    BaseDetail = require('BaseDetail');
    template = require('template/product_detail');
    dialog = require('dialog');
    AttributesShow = require('AttributesShow');
    Tag = require('Tag');
    PicturePick = require('PicturePick');
    Service = require('Service');
    Utils = require('Utils');

    ProductDetail = BaseDetail.extend({
      el: '#jhw-detail',
      events: {
        'click #product-reset': 'reset',
        'click .btn-back': 'back',
        'click .setAttribute': 'setAttribute'
      },
      initialize: function () {
        debug('2.ProductDetail.initialize');
        this._initialize({
          template: template,
          model: ProductModel
        });
      },
      showAttributes: function (categoryId, items) {
        if (!this.attributes) {
          this.attributes = new AttributesShow({
            render: '#attributes-list',
            categoryId: categoryId,
            items: items
          });
        } else {
          this.attributes.reload(categoryId);
        }
      },
      back: function () {
        seajs.use(['backbone'], function (Backbone) {
          Backbone.history.navigate('#/product', true);
        });
      },
      render: function () {
        debug('4.ProductDetail.render');
        var ctx = this;
        //alert('当前模型类里的name值为： '+ this.model.get('name') + ',现在设置模型类里的name值为44444');
        //this.model.set('name', '44444');
        this.model.set('taglist', Est.pluck(Est.pluck(this.model.get('tagMapStore'), 'tag'), 'name')
          .join(","));
        this._render();

        Utils.initTab({
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
        // 产品图片
        var pic_list = [];
        if (!this._isAdd) {
          var server_pic_list = $.parseJSON(this.model.get('productImageListStore'));
          Est.each(server_pic_list, function (item) {
            pic_list.push({
              attId: item.id,
              serverPath: item.sourceProductImagePath,
              title: '重新上传',
              hasPic: true,
              isAddBtn: false
            });
          });
        }
        app.addView('productPicturePick', new PicturePick({
          el: '#picture-pick',
          viewId: 'productPicturePick',
          _isAdd: this._isAdd, // 是否为添加模式
          items: pic_list, // 初始化数据
          max: 9
        }));
        // 产品分类
        this.change = false;
        Service.getProductCategory({ tree: true, select: true, extend: true })
          .then(function (list) {
            Utils.initSelect({
              render: '#s1',
              target: '#model-category',
              items: list,
              change: function (item) {
                if (!ctx.change) {
                  ctx.change = true;
                  return;
                }
                var buttons = [
                  {
                    value: '更换',
                    callback: function () {
                      ctx.showAttributes(item.categoryId, []);
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
                  ctx.showAttributes(item.categoryId);
                  //TODO 产品标签

                }
              }
            });
            ctx.$setAttribute = ctx.$('.setAttribute');
            // 属性
            Utils.initSelect({
              render: '#attCate',
              target: '#attCateHid',
              items: list,
              change: function (item) {
                ctx.showAttributes(item.categoryId);
                ctx.$setAttribute.attr('href', '#/attributes?categoryId=' + item.categoryId);
                setTimeout(function () {
                  Utils.resetIframe();
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
        Utils.initSelect({
          render: '#s2',
          width: 150,
          target: '#model-loginView',
          items: app.getStatus('loginViewList')
        });

        Utils.initSelect({
          render: '#s2',
          width: 150,
          target: '#model-ads',
          items: app.getStatus('adsList')
        });

        Utils.initSelect({
          render: '#weightUnit',
          width: 150,
          target: '#model-weightUnit',
          itemId: 'value',
          items: app.getStatus('weightUnit')
        });

        // 编辑器
        Utils.initEditor({
          render: '.ckeditor'
        });

        // 表单初始化
        this._form('#J_Form')._validate()._init({
          onBeforeSave: function () {
            // 处理特殊字段
            if (ctx.tagInstance) {
              this.model.set('taglist', Est.map(ctx.tagInstance.collection.models, function (item) {
                return item.get('name');
              }).join(','));
            }
            var photos = app.getView('productPicturePick').getItems();
            if (photos.length > 0) {
              this.model.set('photo', photos[0]['serverPath']);
              this.model.set('photoId', photos[0]['attId']);
              photos.splice(0, 1);
              this.model.set('photo2', JSON.stringify(photos).replace(/attId/g, 'id').replace(/serverPath/g, 'src'));
            }
          },
          onAfterSave: function (response) {
            console.log('保存成功');
          }

        });
        return this;
      }
    });

    module.exports = ProductDetail;

  });