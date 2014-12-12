/**
 * @description 产品分类列表视图
 * @namespace ProductCategoryList
 * @author yongjin on 2014/10/31
 */
define('ProductCategoryList', ['jquery', 'CategoryModel', 'template/product_transfer', 'BaseUtils', 'BaseComposite', 'BaseItem', 'BaseList', 'HandlebarsHelper', 'template/category_product_list', 'template/category_product_item'],
  function (require, exports, module) {
    var ProductCategoryList, transferTemp, ProductCategoryCollection, ProductCategoryItem, BaseUtils, CategoryModel, BaseComposite, BaseItem, BaseList, HandlebarsHelper, listTemp, itemTemp;

    CategoryModel = require('CategoryModel');
    BaseComposite = require('BaseComposite');
    BaseItem = require('BaseItem');
    BaseList = require('BaseList');
    HandlebarsHelper = require('HandlebarsHelper');
    listTemp = require('template/category_product_list');
    itemTemp = require('template/category_product_item');
    BaseUtils = require('BaseUtils');
    transferTemp = require('template/product_transfer');

    ProductCategoryCollection = BaseComposite.extend({
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
        'click .delete': '_del',
        'click .edit': 'editItem',
        'click .btn-display': 'setDisplay',
        'click .move-up': 'moveUp',
        'click .move-down': 'moveDown',
        'change .input-sort': 'changeSort',
        'change .pro-cate-name': 'editName'
      },
      initialize: function () {
        this._initialize({
          template: itemTemp
        });
      },
      render: function () {
        this._render();
        return this;
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
      editItem: function () {
        var options = {
          title: '产品分类修改',
          url: CONST.HOST + '/modules/category/product_category_detail.html?id=' + this.model.id
        }
        this._edit(options);
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
          success: function () { },
          async: false,
          hideTip: true
        });
        this.model.stopCollapse = false;
      },
      // 上移
      moveUp: function (e) {
        e.stopImmediatePropagation();
        app.getView('productCategoryPage')._moveUp(this.model);
      },
      // 下移
      moveDown: function (e) {
        e.stopImmediatePropagation();
        app.getView('productCategoryPage')._moveDown(this.model);
      }
    });

    ProductCategoryList = BaseList.extend({
      el: '#jhw-main',
      events: {
        'click #toggle-all': '_toggleAllChecked',
        'click .product-category-add': 'openAddDialog',
        'click .btn-batch-del': 'batchDel',
        'click .btn-batch-category': 'batchCategory',
        'click .btn-batch-collapse': 'btachCollapse',
        'click .btn-batch-extend': 'btachExtend'
      },
      render: function () {
        this._render();
        return this.el;
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
          grade: '01',
          parentValue: '/'
        }).then(function (thisCtx) {
          thisCtx._load(thisCtx._options);
        });
      },
      openAddDialog: function () {
        this._detail({
          title: '分类添加',
          url: CONST.HOST + '/modules/category/product_category_detail.html?time=' + new Date().getTime()
        });
      },
      // 批量删除
      batchDel: function () {
        var ctx = this;
        if (this.checkboxIds = this._getCheckboxIds()) {
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
        }
      },
      btachCollapse: function(){
        this.$('.node-tree').hide();
        this.$('.x-caret-left').removeClass('x-caret-down');
      },
      btachExtend: function(){
        this.$('.node-tree').show();
        this.$('.x-caret-left').addClass('x-caret-down');
        this.$('.x-caret-left-gray').removeClass('x-caret-down');
      },
      // 批量转移分类
      batchCategory: function (category) {
        var ctx = this;
        if (!app.getData('productCategory')) {
          BaseUtils.getProductCategory({
            extend: true,
            select: true
          }).then(function (list) {
            app.setData('productCategory', list);
          })
        }
        this.transferTemp = HandlebarsHelper.compile(transferTemp);
        if (this.checkboxIds = this._getCheckboxIds()) {
          seajs.use(['dialog-plus'], function (dialog) {
            window.dialog = dialog;
            ctx.transferDialog = dialog({
              id: 'transfer-dialog',
              title: '批量转移分类',
              width: 300,
              content: ctx.transferTemp({
                productCategoryList: app.getData('productCategory')
              }),
              button: [
                {
                  value: '确定',
                  callback: function () {
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
                    return false;
                  },
                  autofocus: true
                },
                { value: '关闭' }
              ]
            }).show(this.$('.btn-batch-category').get(0));
          })
        }
      }
    });

    module.exports = ProductCategoryList;
  });