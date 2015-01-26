/**
 * @description 产品分类列表视图
 * @namespace ProductCategoryList
 * @author yongjin on 2014/10/31
 */
define('ProductCategoryList', ['jquery', 'CategoryModel', 'template/product_transfer', 'BaseUtils',
    'BaseItem', 'BaseList', 'HandlebarsHelper', 'template/category_product_list', 'template/category_product_item',
    'BaseService', 'BaseCollection'],
  function (require, exports, module) {
    var ProductCategoryList, transferTemp, ProductCategoryCollection, ProductCategoryItem, BaseUtils, CategoryModel,
      BaseItem, BaseList, BaseService, HandlebarsHelper, BaseCollection, listTemp, itemTemp;

    CategoryModel = require('CategoryModel');
    BaseCollection = require('BaseCollection');
    BaseItem = require('BaseItem');
    BaseList = require('BaseList');
    HandlebarsHelper = require('HandlebarsHelper');
    listTemp = require('template/category_product_list');
    itemTemp = require('template/category_product_item');
    BaseUtils = require('BaseUtils');
    transferTemp = require('template/product_transfer');
    BaseService = require('BaseService');

    ProductCategoryCollection = BaseCollection.extend({
      url: CONST.API + '/category/product',
      model: CategoryModel,
      initialize: function () {
        this._initialize();
      }
    });

    ProductCategoryItem = BaseItem.extend({
      tagName: 'li',
      className: 'cate-grid-row',
      events: {
        'click .toggle': '_toggleChecked',
        'click .delete': '_del',
        'click .edit': 'editItem',
        'click .btn-display': 'setDisplay',
        'click .move-up': 'moveUp',
        'click .move-down': 'moveDown',
        'change .input-sort': 'changeSort',
        'change .pro-cate-name': 'editName',
        'click .edit-image': 'editImage',
        'mouseover .icon-picture': 'showImage',
        'mouseout .icon-picture': 'hideImage',
        'click .btn-more': '_more',
        'click .seo': 'seo'
      },
      initialize: function () {
        this._initialize({
          template: itemTemp,
          viewId: 'productCategoryList'
        });
      },
      render: function () {
        this._render();
        return this;
      },
      // 显示图片
      showImage: function (e) {
        e.stopImmediatePropagation();
        this.editImage = this.$('.edit-image');
        if (!Est.isEmpty(this.model.get('image'))) {
          this.imageTemp = HandlebarsHelper.compile("<img src='{{CONST 'PIC_URL'}}/{{picUrl image 5}}'></img>");
          BaseUtils.tooltip(this.imageTemp(this.model.attributes), {
            id: 'imageView',
            align: 'left',
            time: 100000,
            target: this.editImage.get(0)
          });
        }
        return false;
      },
      // 隐藏图片
      hideImage: function () {
        window.tooltipDialog &&
        window.tooltipDialog.close().remove();
      },
      // Seo优化
      seo: function () {
        this._dialog({
          moduleId: 'SeoDetail',
          title: 'Seo优化',
          height: 250,
          id: this.model.get('categoryId')
        });
      },
      // 编辑图片
      editImage: function () {
        var ctx = this;
        BaseUtils.openUpload({
          id: 'uploadDialog',
          type: 'sourceUpload',
          albumId: app.getData('curAlbumId'),
          username: app.getData('user') && app.getData('user').username,
          auto: true,
          oniframeload: function () {
            this.iframeNode.contentWindow.uploadCallback = function (result) {
              ctx.setImage(result);
            };
          },
          success: function () {
            var result = this.iframeNode.contentWindow.app.getView('picSource').getItems();
            ctx.setImage(result);
          }
        });
      },
      setImage: function (result) {
        if (result.length > 0) {
          this.model.set('image', result[0]['serverPath']);
          this.model._saveField({
            id: this.model.get('id'),
            image: this.model.get('image')
          }, this, { // ctx须初始化initModel
            success: function () {
            }, // 保存成功回调
            async: false, // 是否同步
            hideTip: false // 是否隐藏提示
          });
        }
      },
      // 修改名称
      editName: function () {
        var name = Est.trim(this.$(".pro-cate-name").val());
        if (Est.isEmpty(name)) return;
        this.model._saveField({
          id: this.model.get('id'),
          name: name
        }, this, { hideTip: true });
      },
      // 修改分类
      editItem: function (e) {
        e.stopImmediatePropagation();
        var ctx = this;
        this._dialog({
          moduleId: 'ProductCategoryDetail',
          title: '修改分类',
          id: this.model.get('id'),
          onClose: function () {
            var model = app.getModels().pop();
            if (model) {
              ctx.model.set('name', model['name']);
            }
          }
        });
      },
      // 修改排序
      changeSort: function (e) {
        e.stopImmediatePropagation();
        var ctx = this;
        var sort = this.$('.input-sort').val();
        this.model.stopCollapse = true;
        this.model._saveField({ id: this.model.get('id'), sort: sort
        }, ctx, { success: function () {
          ctx.model.set('sort', sort);
          ctx.model.stopCollapse = false;
        }, hideTip: true
        });
      },
      // 显示/隐藏
      setDisplay: function (e) {
        e.stopImmediatePropagation();
        this.model.stopCollapse = true;
        this.model.set('isdisplay', this.model.get('isdisplay') === '1' ? '0' : '1');
        this.model._saveField({
          id: this.model.get('id'),
          isdisplay: this.model.get('isdisplay')
        }, this, { // ctx须初始化initModel
          success: function () {
          },
          async: false,
          hideTip: true
        });
        this.model.stopCollapse = false;
      },
      // 上移
      moveUp: function (e) {
        e.stopImmediatePropagation();
        this._itemActive();
        this.collapsed = true;
        app.getView('productCategoryPage')._moveUp(this.model);
      },
      // 下移
      moveDown: function (e) {
        e.stopImmediatePropagation();
        this._itemActive();
        this.collapsed = true;
        app.getView('productCategoryPage')._moveDown(this.model);
      }
    });

    ProductCategoryList = BaseList.extend({
      events: {
        'click #toggle-all': '_toggleAllChecked',
        'click .product-category-add': 'openAddDialog',
        'click .btn-back': 'back',
        'click .btn-batch-del': 'batchDel',
        'click .btn-batch-category': 'batchCategory',
        'click .btn-batch-collapse': 'btachCollapse',
        'click .btn-batch-extend': 'btachExtend'
      },
      initialize: function (options) {
        this._initialize({
          template: listTemp,
          render: '.category-ul',
          item: ProductCategoryItem,
          model: CategoryModel,
          collection: ProductCategoryCollection,

          subRender: '.node-tree',
          collapse: '.node-collapse',
          parentId: 'belongId',
          categoryId: 'categoryId',
          rootId: 'isroot',
          rootValue: '01'
        });
      },
      // 返回按钮
      back: function () {
        this._navigate('#/product');
      },
      // 分类添加
      openAddDialog: function () {
        this._dialog({
          moduleId: 'ProductCategoryDetail',
          title: '产品分类添加',
          height: 250,
          onClose: function () {
            app.getView('productCategoryPage')._load();
          }
        });
      },
      // 批量删除
      batchDel: function () {
        var ctx = this;
        this.checkboxIds = this._getCheckboxIds();
        if (this.checkboxIds.length === 0) {
          BaseUtils.tip('至少选择一项');
          return;
        }
        BaseUtils.comfirm({
          success: function () {
            $.ajax({
              type: 'POST',
              async: false,
              url: CONST.API + '/product/batch/del',
              data: {
                ids: ctx.checkboxIds.join(',')
              },
              success: function (result) {
                BaseUtils.tip('删除成功');
                ctx._load();
              }
            });
          }
        });
      },
      // 折叠
      btachCollapse: function () {
        this.$('.node-tree').hide();
        this.$('.x-caret-left').removeClass('x-caret-down');
      },
      // 展开
      btachExtend: function () {
        this.$('.node-tree').show();
        this.$('.x-caret-left').addClass('x-caret-down');
        this.$('.x-caret-left-gray').removeClass('x-caret-down');
      },
      // 批量转移分类
      batchCategory: function (category) {
        var ctx = this;
        if (!app.getData('productCategory')) {
          BaseService.getProductCategory({
            tree: true,
            extend: true,
            select: true
          }).then(function (list) {
            app.addData('productCategory', list);
          })
        }
        this.transferTemp = HandlebarsHelper.compile(transferTemp);
        this.checkboxIds = this._getCheckboxIds();
        if (this.checkboxIds.length === 0) {
          BaseUtils.tip('至少选择一项');
          return;
        }
        BaseUtils.dialog({
          id: 'transfer-dialog',
          title: '批量转移分类',
          width: 300,
          target: this.$('.btn-batch-category').get(0),
          content: ctx.transferTemp({
            productCategoryList: app.getData('productCategory')
          }),
          success: function () {
            ctx.transferCategory = $('select[name=transferCategory]').val();
            $.ajax({
              type: 'POST',
              async: false,
              url: CONST.API + '/category/product/batch/transfer',
              data: {
                ids: ctx.checkboxIds.join(','),
                category: ctx.transferCategory
              },
              success: function (result) {
                BaseUtils.tip('批量隐藏成功');
                ctx._load();
              }
            });
            this.remove();
          }
        });
      },
      render: function () {
        this._render();
        return this.el;
      }
    });

    module.exports = ProductCategoryList;
  });