/**
 * @description CertificateList
 * @namespace CertificateList
 * @author wxw on 14-12-15
 */
define('CertificateList', ['jquery', 'CertificateModel', 'BaseCollection', 'BaseItem', 'BaseList', 'HandlebarsHelper',
    'template/certificate_list', 'template/certificate_item', 'BaseUtils', 'template/certificate_search', 'template/certificate_transfer',
    'template/certificate_sort'],
  function (require, exports, module) {
    var CertificateModel, BaseCollection, BaseItem, BaseList, HandlebarsHelper, CertificateList, CertificateItem,
      CertificateCollection, listTemp, itemTemp, searchTemp, BaseUtils, transferTemp, sortTemp;

    CertificateModel = require('CertificateModel');
    BaseCollection = require('BaseCollection');
    BaseItem = require('BaseItem');
    BaseList = require('BaseList');
    HandlebarsHelper = require('HandlebarsHelper');
    listTemp = require('template/certificate_list');
    itemTemp = require('template/certificate_item');
    searchTemp = require('template/certificate_search');
    BaseUtils = require('BaseUtils');
    transferTemp = require('template/certificate_transfer');
    sortTemp = require('template/certificate_sort');

    /**
     * 集合类
     */
    CertificateCollection = BaseCollection.extend({
      url: CONST.API + '/cert/list',
      batchDel: CONST.API + '/cert/batch/del',
      model: CertificateModel,
      initialize: function () {
        this._initialize();
      }
    });
    /**
     * 单视图
     */
    CertificateItem = BaseItem.extend({
      tagName: 'tr',
      className: 'bui-grid-row',
      events: {
        'click .toggle': '_toggleChecked',
        'click .edit': '_edit',
        'click .delete': '_del',
        'click .move-up': '_moveUp',
        'click .move-down': '_moveDown',
        'change .input-sort': '_saveSort',
        'click .btn-display': 'setState',
        'click .name': 'editName',
        'click .organize': 'editOrganize',
        'change .pro-category': 'changeCategory'
      },
      // 初始化
      initialize: function () {
        this.model.set('certificateList', app.getStatus('certType'));
        this._initialize({
          template: itemTemp,
          viewId: 'certificateList',
          detail: CONST.HOST + '/modules/certificate/certificate_detail.html'
        });
      },
      // 渲染文档
      render: function () {
        this._render();
      },
      // 修改分类
      changeCategory: function () {
        var ctx = this;
        var category = this.$('.pro-category').val();
        this.model._saveField({
          id: this.model.get('id'),
          category: category
        }, ctx, {success: function () {
          ctx.model.set('category', category);
        }});
      },
      // 修改名称
      editName: function () {
        this._editField({
          target: '.pro-list-name',
          title: '修改名称',
          field: 'name'
        });
      },
      // 修改型号
      editOrganize: function () {
        this._editField({
          target: '.pro-list-organize',
          title: '修改型号',
          field: 'organize'
        });
      }
    });
    /**
     * 列表视图
     */
    CertificateList = BaseList.extend({
      events: {
        'click #toggle-all': '_toggleAllChecked',
        'click .btn-batch-del': '_batchDel',
        'click .certificate-add': 'add',
        'click .btn-search': 'search',
        'click .search-advance': 'searchAdvance',
        'click .btn-batch-display': 'batchDisplay',
        'click .btn-batch-category': 'batchCategory',
        'click .btn-tool-sort': 'proSort'
      },
      initialize: function () {
        this._initialize({
          render: '#certificate-list-ul',
          enterRender: '.btn-search',
          template: listTemp,
          model: CertificateModel,
          collection: CertificateCollection,
          item: CertificateItem,
          pagination: true,
          detail: CONST.HOST + '/modules/certificate/certificate_detail.html',
          route: '#/certificate_detail'
        });
      },
      add: function(){
        this._navigate('#/certificate_add');
      },
      // 简单搜索
      search: function () {
        this.searchKey = Est.trim(this.$('.search-text').val());
        if (Est.isEmpty(this.searchKey)) {
          this._load({ page: 1, pageSize: 16 });
        } else {
          this._search({
            filter: [
              {key: 'name', value: this.searchKey }
            ]
          });
        }
      },
      // 高级搜索
      searchAdvance: function () {
        var ctx = this;
        this.searchTemp = HandlebarsHelper.compile(searchTemp);

        seajs.use(['dialog-plus'], function (dialog) {
          window.dialog = dialog;
          ctx.searchDialog = dialog({
            id: 'dialog',
            title: '高级搜索',
            width: 600,
            content: ctx.searchTemp({
              certificateCategoryList: app.getData('certificateCategory'),
              loginViewList: app.getStatus('loginViewList'),
              adsList: app.getStatus('adsList'),
              searchKey: ctx.searchKey,
              searchOrganize: ctx.searchOrganize,
              searchType: ctx.searchType,
              certificateList: app.getStatus('certType')
            }),
            button: [
              {
                value: '搜索',
                callback: function () {
                  ctx.searchKey = $('input[name=searchKey]').val();
                  ctx.searchOrganize = $('input[name=searchOrganize]').val();
                  ctx.searchType = $('select[name=searchType]').val();
                  ctx._search({
                    filter: [
                      {key: 'name', value: ctx.searchKey },
                      {key: 'organize', value: ctx.searchOrganize} ,
                      {key: 'type', value: ctx.searchType}
                    ]
                  });
                  this.remove();
                  return false;
                },
                autofocus: true
              },
              { value: '关闭' }
            ],
            oniframeload: function () {
              this.iframeNode.contentWindow.searchDialog = ctx.searchDialog;
            },
            onclose: function () {
              this.remove();
              if (this.returnValue) {
                $('#value').html(this.returnValue);
              }
            }
          }).show(this.$('.search-advance').get(0));
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
        seajs.use(['dialog-plus'], function (dialog) {
          window.dialog = dialog;
          ctx.transferDialog = dialog({
            id: 'transfer-dialog',
            title: '批量转移分类',
            width: 300,
            content: ctx.transferTemp({
              certificateCategoryList: app.getData('certificateCategory')
            }),
            button: [
              {
                value: '确定',
                callback: function () {
                  ctx.transferCategory = $('select[name=transferCategory]').val();
                  $.ajax({
                    type: 'POST',
                    async: false,
                    url: CONST.API + '/certificate/batch/transfer',
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
      },
      // 批量隐藏
      batchDisplay: function () {
        this._batch({
          url: CONST.API + '/certificate/batch/display',
          tip: '批量隐藏成功'
        });
      },
      // 排序
      proSort: function () {
        var ctx = this;
        this.sortTemp = HandlebarsHelper.compile(sortTemp);
        seajs.use(['dialog-plus'], function (dialog) {
          window.dialog = dialog;
          ctx.sortDialog = dialog({
            id: 'sort-dialog',
            title: '证书排序',
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
                    url: CONST.DOMAIN + '/user_v2/certificate',
                    data: {
                      sortType: ctx.sortType
                    },
                    success: function (result) {
                      BaseUtils.tip('证书排序成功');
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

    module.exports = CertificateList;
  });