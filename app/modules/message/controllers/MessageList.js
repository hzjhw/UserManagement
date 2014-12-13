/**
 * @descr
 * iption MessageList
 * @namespace MessageList
 * @author yongjin on 2014/11/16
 */
define('MessageList', ['jquery', 'MessageModel', 'BaseCollection', 'BaseItem', 'BaseList', 'HandlebarsHelper',
    'template/message_list', 'template/message_item', 'BaseUtils'],
  function (require, exports, module) {
    var MessageModel, BaseCollection, BaseItem, BaseList, HandlebarsHelper, MessageList, MessageItem,
      MessageCollection, listTemp, itemTemp, BaseUtils;

    MessageModel = require('MessageModel');
    BaseCollection = require('BaseCollection');
    BaseItem = require('BaseItem');
    BaseList = require('BaseList');
    HandlebarsHelper = require('HandlebarsHelper');
    listTemp = require('template/message_list');
    itemTemp = require('template/message_item');
    BaseUtils = require('BaseUtils');


    /**
     * 集合类
     */
    MessageCollection = BaseCollection.extend({
      url: CONST.API + '/message/list',
      model: MessageModel,
      initialize: function () {
        this._initialize();
      }
    });
    /**
     * 单视图
     */
    MessageItem = BaseItem.extend({
      tagName: 'tr',
      className: 'bui-grid-row',
      events: {
        'click .toggle': '_toggleChecked',
        'click .delete': '_del',
        'click .name': 'editName',
        'click .edit': 'editItem',
        'click .btn-recvState': 'isrecvState'
      },
      // 初始化
      initialize: function () {
        this._initialize({ template: itemTemp ,model : MessageModel});
      },
      // 渲染文档
      render: function () {
        this._render();
      },
      // 编辑产品
      editItem: function () {
        var url = CONST.HOST + '/modules/message/message_detail.html?id='
          + this.model.toJSON().messageId;
        var options = {
          title: '留言信息',
          url: url,
          reload: true
        }
        this._edit(options);
      },
      // 显示/隐藏
      isrecvState: function () {
        this.model.set('recvState', this.model.get('recvState') === '00' ? '01' : '00');
        this.model._saveField({
          id: this.model.get('id'),
          recvState: this.model.get('recvState')
        }, this, { // ctx须初始化initModel
          success: function () {
          },
          async: false,
          hideTip: true
        });
      }
    });
    /**
     * 列表视图
     */
    MessageList = BaseList.extend({
      el: '#jhw-main',
      events: {
        'click #toggle-all': '_toggleAllChecked',
        'click .message-add': 'openAddDialog',
        'click .btn-search': 'search',
        'click .search-advance': 'searchAdvance',
        'click .btn-batch-del': 'batchDel',
        'click .btn-batch-display': 'batchDisplay',
        'click .btn-batch-category': 'batchCategory'
      },
      initialize: function () {
        this._initialize({
          render: '#message-list-ul',
          enterRender: '.btn-search',
          template: listTemp,
          model: MessageModel,
          collection: MessageCollection,
          item: MessageItem
        }).then(function (thisCtx) {
          thisCtx._initPagination(thisCtx._options);
          thisCtx._load(thisCtx._options);
        });
      },
      // 打开添加/修改对话框
      openAddDialog: function () {
        var url = CONST.HOST + '/modules/message/message_detail.html?uId='
          + Est.nextUid();
        this._detail({
          title: '留言信息',
          url: url
        });
      },
      // 搜索基础方法
      baseSearch: function () {
        this._search([
          { key: 'title', value: this.searchKey }
        ], {});
      },
      // 简单搜索
      search: function () {
        this.searchKey = Est.trim(this.$('.search-text').val());
        if (Est.isEmpty(this.searchKey)) {
          this._load({ page: 1, pageSize: 16 });
        } else {
          this.baseSearch();
        }
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
                url: CONST.API + '/message/batch/del',
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
      }
    });

    module.exports = MessageList;
  });