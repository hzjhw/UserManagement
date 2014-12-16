/**
 * @description 新闻分类列表视图
 * @namespace NewsCategoryList
 * @author wxw on 2014/12/12
 */
define('NewsCategoryList', ['jquery', 'CategoryModel','template/news_transfer', 'BaseUtils','BaseComposite', 'BaseItem', 'BaseList', 'HandlebarsHelper', 'template/category_news_list', 'template/category_news_item'],
  function (require, exports, module) {
    var NewsCategoryList, transferTemp, NewsCategoryCollection, NewsCategoryItem, BaseUtils,CategoryModel, BaseComposite, BaseItem, BaseList, HandlebarsHelper, listTemp, itemTemp;

    CategoryModel = require('CategoryModel');
    BaseComposite = require('BaseComposite');
    BaseItem = require('BaseItem');
    BaseList = require('BaseList');
    HandlebarsHelper = require('HandlebarsHelper');
    listTemp = require('template/category_news_list');
    itemTemp = require('template/category_news_item');
    BaseUtils = require('BaseUtils');
    transferTemp = require('template/news_transfer');

    NewsCategoryCollection = BaseComposite.extend({
      url: CONST.API + '/category/news',
      model: CategoryModel,
      initialize: function () {
        this._initialize();
      }
    });

    NewsCategoryItem = BaseItem.extend({
      tagName: 'li',
      className: 'cate-grid-row',
      events: {
        'click .delete': '_del',
        'click .name': 'editName',
        'click .edit': 'editItem',
        'click .btn-display': 'setDisplay',
        'click .move-up': 'moveUp',
        'click .move-down': 'moveDown',
        'change .input-sort': 'changeSort'
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
      editItem: function () {
        var options = {
          title: '新闻分类修改',
          url: CONST.HOST + '/modules/category/news_category_detail.html?id=' + this.model.id
        }
        this._edit(options);
      },
      // 修改排序
      changeSort: function () {
        var ctx = this;
        var sort = this.$('.input-sort').val();
        this.model._saveField({ id: this.model.get('id'), sort: sort
        }, ctx, { success: function () {
          ctx.model.set('sort', sort);
        }, hideTip: true
        });
      },
      // 显示/隐藏
      setDisplay: function () {
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
      },
      editName: function () {
        var name = Est.trim(this.$(".pro-cate-name").val());
        if (Est.isEmpty(name)) return;
        this.model._saveField({
          id: this.model.get('id'),
          name: name
        }, this, { hideTip: true });
      },
      // 上移
      moveUp: function () {
        app.getView('newsCategoryPage')._moveUp(this.model);
      },
      // 下移
      moveDown: function () {
        app.getView('newsCategoryPage')._moveDown(this.model);
      }
    });

    NewsCategoryList = BaseList.extend({
      el: '#jhw-main',
      events: {
        'click #toggle-all': '_toggleAllChecked',
        'click .news-category-add': 'openAddDialog',
        'click .btn-batch-del': 'batchDel',
        'click .btn-batch-category': 'batchCategory'
      },
      render: function () {
        this._render();
        return this.el;
      },
      initialize: function (options) {
        this._initialize({
          template: listTemp,
          render: '.category-ul',
          item: NewsCategoryItem,
          model: CategoryModel,
          collection: NewsCategoryCollection,

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
          url: CONST.HOST + '/modules/category/news_category_detail.html?time=' + new Date().getTime()
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
                url: CONST.API + '/news/batch/del',
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
      // 批量转移分类
      batchCategory: function (category) {
        var ctx = this;
        if (!app.getData('newsCategory')) {
          BaseUtils.getNewsCategory({
            extend: true,
            select: true
          }).then(function (list) {
            app.setData('newsCategory', list);
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
                newsCategoryList: app.getData('newsCategory')
              }),
              button: [
                {
                  value: '确定',
                  callback: function () {
                    ctx.transferCategory = $('select[name=transferCategory]').val();
                    $.ajax({
                      type: 'POST',
                      async: false,
                      url: CONST.API + '/category/news/batch/transfer',
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

    module.exports = NewsCategoryList;
  });