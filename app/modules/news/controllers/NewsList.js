/**
 * @description NewsList
 * @namespace NewsList
 * @author jihui-wxw on 2014/12/10
 */
define('NewsList', ['jquery', 'NewsModel', 'BaseCollection', 'BaseItem', 'BaseList', 'HandlebarsHelper',
    'template/news_list', 'template/news_item', 'BaseUtils', 'template/news_search', 'template/news_transfer',
    'template/news_sort', 'bui/calendar', 'BaseService'],
  function (require, exports, module) {
    var NewsModel, BaseCollection, BaseItem, BaseList, HandlebarsHelper, NewsList, NewsItem,
      NewsCollection, listTemp, itemTemp, searchTemp, BaseUtils, transferTemp, BaseService;

    NewsModel = require('NewsModel');
    BaseCollection = require('BaseCollection');
    BaseItem = require('BaseItem');
    BaseList = require('BaseList');
    HandlebarsHelper = require('HandlebarsHelper');
    listTemp = require('template/news_list');
    itemTemp = require('template/news_item');
    searchTemp = require('template/news_search');
    BaseUtils = require('BaseUtils');
    transferTemp = require('template/news_transfer');
    BaseService = require('BaseService');


    /**
     * 集合类
     */
    NewsCollection = BaseCollection.extend({
      url: CONST.API + '/news/list',
      batchDel: CONST.API + '/news/batch/del',
      model: NewsModel,
      initialize: function () {
        this._initialize();
      }
    });
    /**
     * 单视图
     */
    NewsItem = BaseItem.extend({
      tagName: 'tr',
      className: 'bui-grid-row',
      events: {
        'click .name': 'editName',
        'click .btn-display': 'setDisplay',
        'change .pro-category': 'changeCategory',
        'click .btn-topnews': 'setTopnews',
        'click .toggle': '_toggleChecked',
        'click .delete': '_del',
        'click .prodtype': 'editProdtype',
        'click .edit': '_edit',
        'click .move-up': 'moveUp',
        'click .move-down': 'moveDown',
        'change .input-sort': 'changeSort',
        'click .btn-more': '_more'
      },
      // 初始化
      initialize: function () {
        if (!app.getData('newsCategory')) {
          BaseService.getNewsCategory({
            extend: true,
            select: true
          }).then(function (list) {
            app.addData('newsCategory', list);
          })
        }
        this.model.set('newsCategoryList', app.getData('newsCategory'));
        this._initialize({ template: itemTemp });

      },
      // 渲染文档
      render: function () {
        this._render();
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
      // 修改分类
      changeCategory: function () {
        var ctx = this;
        var category = this.$('.pro-category').val();
        BaseUtils.comfirm({
          title: '提示：',
          content: '是否更改分类？',
          success: function () {
            ctx.model._saveField({
              id: ctx.model.get('id'),
              category: category
            }, ctx, {success: function () {
              ctx.model.set('category', category);
            }});
          }
        });
        this.render();
      },
      // 修改名称
      editName: function () {
        var options = {
          title: '修改名称',
          field: 'title',
          target: '.news-list-name'
        };
        this._editField(options, this);
      },
      // 显示/隐藏
      setDisplay: function () {
        this.model.set('display', this.model.get('display') === '01' ? '02' : '01');
        this.model._saveField({
          id: this.model.get('id'),
          display: this.model.get('display')
        }, this, { // ctx须初始化initModel
          success: function () {
          },
          async: false,
          hideTip: true
        });
      },
      // 置顶
      setTopnews: function () {
        this.model.set('topnews', this.model.get('topnews') === '01' ? '02' : '01');
        this.model._saveField({
          id: this.model.get('id'),
          topnews: this.model.get('topnews')
        }, this, { // ctx须初始化initModel
          success: function () {
          },
          async: false,
          hideTip: true
        });
      },
      // 修改型号
      editProdtype: function () {
        var options = {
          title: '修改型号',
          field: 'prodtype',
          target: '.pro-list-prodtype'
        };
        this._editField(options, this);
      },
      // 上移
      moveUp: function () {
        app.getView('newsList')._moveUp(this.model);
      },
      // 下移
      moveDown: function () {
        app.getView('newsList')._moveDown(this.model);
      }
    });
    /**
     * 列表视图
     */
    NewsList = BaseList.extend({
      events: {
        'click #toggle-all': '_toggleAllChecked',
        'click .news-add': 'edit',
        'click .btn-search': 'search',
        'click .search-advance-news': 'searchAdvance',
        'click .btn-batch-del': '_batchDel',
        'click .btn-batch-display': 'batchDisplay',
        'click .btn-batch-category-news': 'batchCategory',
        'click .btn-tool-sort': 'proSort',
        'click .btn-category': 'category'
      },
      initialize: function () {
        this._initialize({
          render: '#news-list-ul',
          enterRender: '.btn-search',
          template: listTemp,
          model: NewsModel,
          collection: NewsCollection,
          item: NewsItem,
          pagination: true,
          detail: CONST.HOST + '/modules/news/news_detail.html',
          route: '#/news'
        });
      },
      category: function () {
        this._navigate('#/category/news', true);
      },
      // 打开添加/修改对话框
      edit: function () {
        seajs.use(['NewsDetail'], function (NewsDetail) {
          app.addPanel('main', {
            el: '#jhw-main',
            template: '<div class="jhw-main-inner"></div>'
          }).addView('newsDetail', new NewsDetail({
            el: '.jhw-main-inner'
          }));
        });
      },
      // 简单搜索
      search: function () {
        this.searchKey = Est.trim(this.$('.search-text').val());
        if (Est.isEmpty(this.searchKey)) {
          this._load({ page: 1, pageSize: 16 });
        } else {
          this._search({
            filter: [
              {key: 'title', value: this.searchKey }
            ]
          });
        }
      },
      // 高级搜索
      searchAdvance: function () {
        var ctx = this;
        this.searchTemp = HandlebarsHelper.compile(searchTemp);
        if (!app.getData('newsCategory')) {
          BaseService.getNewsCategory({
            extend: true,
            select: true
          }).then(function (list) {
            app.addData('newsCategory', list);
          })
        }
        app.emptyDialog();
        BaseUtils.dialog({
          title: '高级搜索',
          width: 700,
          target: this.$('.search-advance').get(0),
          content: ctx.searchTemp({
            newsCategoryList: app.getData('newsCategory'),
            ImageNews: app.getStatus('ImageNews'),
            RollingNews: app.getStatus('RollingNews'),
            TopNews: app.getStatus('TopNews'),
            newsStateList: app.getStatus('newsState'),
            searchKey: ctx.searchKey,
            searchCategory: ctx.searchCategory,
            searchTypeView: ctx.searchTypeView
          }),
          success: function () {
            ctx.searchKey = $('input[name=searchKey]').val();
            ctx.searchCategory = $('select[name=searchCategory]').val();
            ctx.searchImageNews = $('select[name=searchImageNews]').val();
            ctx.searchRollingNews = $('select[name=searchRollingNews]').val();
            ctx.searchTopNews = $('select[name=searchTopNews]').val();
            ctx.searchState = $('select[name=searchState]').val();
            //ctx.baseSearch();
            ctx._search({
              filter: [
                {key: 'title', value: ctx.searchKey },
                {key: 'category', value: ctx.searchCategory === '/' ? '' : ctx.searchCategory},
                {key: 'imagenews', value: ctx.searchImageNews} ,
                {key: 'topnews', value: ctx.searchTopNews},
                {key: 'rollingnews', value: ctx.searchRollingNews},
                {key: 'display', value: ctx.searchState}
              ]
            });
            this.close().remove();
          }
        });
      },
      // 批量转移分类
      batchCategory: function (category) {
        var ctx = this;
        this.transferTemp = HandlebarsHelper.compile(transferTemp);
        this.checkboxIds = this._getCheckboxIds();
        if (this.checkboxIds.length === 0) {
          BaseUtils.tip('请至少选择一项！');
          return;
        }
        BaseUtils.dialog({
          id: 'transfer-dialog',
          title: '批量转移分类',
          width: 300,
          content: ctx.transferTemp({
            newsCategoryList: app.getData('newsCategory')
          }),
          target: this.$('.btn-batch-category').get(0),
          success: function () {
            ctx.transferCategory = $('select[name=transferCategory]').val();
            $.ajax({
              type: 'POST',
              async: false,
              url: CONST.API + '/news/batch/transfer',
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

    module.exports = NewsList;
  });