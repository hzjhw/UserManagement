/**
 * @description 产品添加或修改视图
 * @namespace ProductDetail
 * @author yongjin on 2014/10/31
 */
define('ProductDetail', ['jquery', 'ProductModel', 'HandlebarsHelper', 'BaseDetail', 'AttributesShow',
    'dialog', 'template/product_detail', 'Tag', 'PicturePick', 'BaseService', 'BaseUtils'],
  function (require, exports, module) {
    var ProductDetail, ProductModel, HandlebarsHelper, BaseDetail, template, AttributesShow, dialog, Tag, PicturePick, BaseService, BaseUtils;

    ProductModel = require('ProductModel');
    HandlebarsHelper = require('HandlebarsHelper');
    BaseDetail = require('BaseDetail');
    template = require('template/product_detail');
    dialog = require('dialog');
    AttributesShow = require('AttributesShow');
    Tag = require('Tag');
    PicturePick = require('PicturePick');
    BaseService = require('BaseService');
    BaseUtils = require('BaseUtils');

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
            BaseUtils.resetIframe();
          });
        });
// 产品图片
        var pic_list = [];
        if (!this._isAdd){
          var server_pic_list = JSON.parse(this.model.get('productImageListStore'));
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
        // 产品分类
        BaseService.getProductCategory({ tree: true,select: true, extend: true })
          .then(function (list) {
            BaseUtils.initSelect({
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
            BaseUtils.initSelect({
              render: '#attCate',
              target: '#attCateHid',
              items: list,
              change: function (categoryId) {
                ctx.showAttributes(categoryId);
                setTimeout(function () {
                  BaseUtils.resetIframe();
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
        BaseUtils.initSelect({
          render: '#s2',
          width: 100,
          target: '#model-loginView',
          items: [
            {text: '访问者可见', value: '1'},
            {text: '登录后可见', value: '0'}
          ]
        });

        BaseUtils.initSelect({
          render: '#s2',
          width: 100,
          target: '#model-ads',
          items: [
            {text: '广告产品', value: '2'},
            {text: '是', value: '1'},
            {text: '否', value: '0'}
          ]
        });

        BaseUtils.initSelect({
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
        BaseUtils.initEditor({
          render: '.ckeditor'
        });

        // 表单初始化
        this._form('#J_Form')._validate()._init({
          onBeforeSave: function(){
            // 处理特殊字段
            this.model.set('taglist', Est.map(ctx.tagInstance.collection.models, function (item) {
              return item.get('name');
            }).join(','));
            var photos = app.getView('picturePick').getItems();
            if (photos.length > 0){
              this.model.set('photo', photos[0]['serverPath']);
              this.model.set('photoId', photos[0]['attId']);
              photos.splice(0, 1);
              this.model.set('photo2',JSON.stringify(photos).replace(/attId/g, 'id').replace(/serverPath/g, 'src'));
            }
          },
          onAfterSave: function(response){

          }

        });

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
      }
    });

    module.exports = ProductDetail;

  });