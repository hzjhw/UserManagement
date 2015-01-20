/**
 * @description 新闻分类列表视图
 * @namespace NewsCategoryList
 * @author wxw on 2014/12/12
 */
define('NewsCategoryList', ['jquery', 'CategoryModel', 'template/news_transfer', 'BaseUtils', 'BaseCollection', 'BaseItem', 'BaseList', 'HandlebarsHelper', 'template/category_news_list', 'template/category_news_item'],
  function (require, exports, module) {
    var NewsCategoryList, transferTemp, NewsCategoryCollection, NewsCategoryItem, BaseUtils, CategoryModel, BaseCollection, BaseItem, BaseList, HandlebarsHelper, listTemp, itemTemp;

    CategoryModel = require('CategoryModel');
    BaseCollection = require('BaseCollection');
    BaseItem = require('BaseItem');
    BaseList = require('BaseList');
    HandlebarsHelper = require('HandlebarsHelper');
    listTemp = require('template/category_news_list');
    itemTemp = require('template/category_news_item');
    BaseUtils = require('BaseUtils');
    transferTemp = require('template/news_transfer');

    NewsCategoryCollection = BaseCollection.extend({
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
        'change .pro-cate-name': 'editName',
        'click .edit': 'editItem',
        'click .btn-display': 'setDisplay',
        'click .move-up': 'moveUp',
        'click .move-down': 'moveDown',
        'change .input-sort': 'changeSort',
        'click .btn-more': '_more',
        'click .seo': 'seo'
      },
      initialize: function () {
        this._initialize({
          template: itemTemp
        });
      },
      seo: function () {
        BaseUtils.dialog({
          title: 'Seo优化',
          url: CONST.HOST + '/common/seo/seo_detail.html?id=' +
            this.model.get('categoryId'),
          width: 600,
          height: 250,
          button: [
            {
              value: '保存',
              callback: function () {
                this.title('正在提交..');
                this.iframeNode.contentWindow.$("#submit").click();
                // 是否执行默认的关闭操作
                return false;
              }}
          ]
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
          rootId: 'isroot',
          rootValue: '01'
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
        this.checkboxIds = this._getCheckboxIds();
        if (this.checkboxIds.length === 0) {
          BaseUtils.tip('至少选择一项');
          return;
        }
        if (this.checkboxIds.length > 0) {
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
            app.addData('newsCategory', list);
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
            newsCategoryList: app.getData('newsCategory')
          }),
          success: function () {
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
          }
        });
      }
    });

    module.exports = NewsCategoryList;
  });