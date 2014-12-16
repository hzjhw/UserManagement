/**
 * @description RecruitList
 * @namespace RecruitList
 * @author wxw on 14-12-15
 */

define('RecruitList', ['jquery', 'RecruitModel', 'BaseCollection', 'BaseItem', 'BaseList', 'HandlebarsHelper',
    'template/recruit_list', 'template/recruit_item', 'BaseUtils', 'template/recruit_search'],
  function (require, exports, module) {
    var RecruitModel, BaseCollection, BaseItem, BaseList, HandlebarsHelper, RecruitList, RecruitItem,
      RecruitCollection, listTemp, itemTemp, searchTemp, BaseUtils, sortTemp;

    RecruitModel = require('RecruitModel');
    BaseCollection = require('BaseCollection');
    BaseItem = require('BaseItem');
    BaseList = require('BaseList');
    HandlebarsHelper = require('HandlebarsHelper');
    listTemp = require('template/recruit_list');
    itemTemp = require('template/recruit_item');
    searchTemp = require('template/recruit_search');
    BaseUtils = require('BaseUtils');

    /**
     * 集合类
     */
    RecruitCollection = BaseCollection.extend({
      url: CONST.API + '/job/list',
      model: RecruitModel,
      initialize: function () {
        this._initialize();
      }
    });
    /**
     * 单视图
     */
    RecruitItem = BaseItem.extend({
      tagName: 'tr',
      className: 'bui-grid-row',
      events: {
        'click .toggle': '_toggleChecked',
        'click .edit': '_edit',
        'click .delete': '_del',
        'click .move-up': '_moveUp',
        'click .move-down': '_moveDown',
        'change .input-sort': '_saveSort',
        'click .title': 'editTitle',
        'click .duty': 'editDuty',
        'click .sum': 'editNum'
      },
      // 初始化
      initialize: function () {
        this.model.set('recruitList', app.getData('recruitList'));
        this._initialize({
          template: itemTemp,
          viewId: 'recruitList',
          detail: CONST.HOST + '/modules/recruit/recruit_detail.html'
        });
      },
      // 渲染文档
      render: function () {
        this._render();
      },
      // 标题
      editTitle: function () {
        this._editField({
          target: '.pro-list-title a',
          title: '修改标题',
          field: 'title'
        });
      },
      // 修改职务
      editDuty: function () {
        this._editField({
          target: '.pro-list-duty a',
          title: '修改职务',
          field: 'duty'
        });
      },
      // 招聘人数
      editNum: function () {
        this._editField({
          target: '.pro-list-sum',
          title: '修改人数',
          field: 'sum'
        });
      }
    });
    /**
     * 列表视图
     */
    RecruitList = BaseList.extend({
      el: '#jhw-main',
      events: {
        'click #toggle-all': '_toggleAllChecked',
        'click .btn-batch-del': '_batchDel',
        'click .recruit-add': '_detail',
        'click .btn-search': 'search'
      },
      initialize: function () {
        this._initialize({
          render: '#recruit-list-ul',
          enterRender: '.btn-search',
          template: listTemp,
          model: RecruitModel,
          collection: RecruitCollection,
          item: RecruitItem,
          detail: CONST.HOST + '/modules/recruit/recruit_detail.html'
        }).then(function (thisCtx) {
          thisCtx._initPagination(thisCtx._options);
          thisCtx._load(thisCtx._options);
        });
      },
      // 简单搜索
      search: function () {
        this.searchTitle = Est.trim(this.$('.search-title').val());
        this.searchDuty = Est.trim(this.$('.search-duty').val());
        if (Est.isEmpty(this.searchTitle) && Est.isEmpty(this.searchDuty) ) {
          this._load({ page: 1, pageSize: 16 });
        } else {
          this._search({
            filter: [
              {key: 'title', value: this.searchTitle },{key: 'duty', value: this.searchDuty }
            ]
          });
        }
      },

      // 排序
      proSort: function () {
        var ctx = this;
        this.sortTemp = HandlebarsHelper.compile(sortTemp);
        seajs.use(['dialog-plus'], function (dialog) {
          window.dialog = dialog;
          ctx.sortDialog = dialog({
            id: 'sort-dialog',
            title: '招聘排序',
            width: 300,
            content: ctx.sortTemp({}),
            button: [
              {
                value: '确定',
                callback: function () {
                  ctx.sortType = $('select[name=sortCategory]').val();
                  $.ajax({
                    type: 'POST',
                    async: false,
                    url: CONST.DOMAIN + '/user_v2/recruit',
                    data: {
                      sortType: ctx.sortType
                    },
                    success: function (result) {
                      BaseUtils.tip('招聘排序成功');
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
          }).show(this.$('.btn-tool-sort').get(0));
        })
      }
    });

    module.exports = RecruitList;
  });