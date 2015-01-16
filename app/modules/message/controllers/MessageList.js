/**
 * @descr
 * iption MessageList
 * @namespace MessageList
 * @author wxw on 2014/12/12
 */
define('MessageList', ['jquery', 'MessageModel', 'BaseCollection', 'BaseItem', 'BaseList', 'HandlebarsHelper',
    'template/message_list', 'template/message_item', 'BaseUtils', 'template/message_email', 'MessageBindModel',
    'template/message_send'],
  function (require, exports, module) {
    var MessageModel, BaseCollection, BaseItem, BaseList, HandlebarsHelper, MessageList, MessageItem,
      MessageCollection, listTemp, itemTemp, BaseUtils, emailTemp, MessageBindModel;

    MessageModel = require('MessageModel');
    BaseCollection = require('BaseCollection');
    BaseItem = require('BaseItem');
    BaseList = require('BaseList');
    HandlebarsHelper = require('HandlebarsHelper');
    listTemp = require('template/message_list');
    itemTemp = require('template/message_item');
    BaseUtils = require('BaseUtils');
    emailTemp = require('template/message_email');
    MessageBindModel = require('MessageBindModel');

    /**
     * 集合类
     */
    MessageCollection = BaseCollection.extend({
      url: CONST.API + '/message/list',
      batchDel: CONST.API + '/message/batch/del',
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
        'click .response': 'response',
        'click .btn-recvState': 'isrecvState'
      },
      // 初始化
      initialize: function () {
        this._initialize({ template: itemTemp, model: MessageModel});
      },
      response: function(){
        app.addData('curMessageUserName', this.model.get('sendUsername'));
        app.addData('curMessageType', this.model.get('type'));
        this._navigate('message_add');
      },
      // 渲染文档
      render: function () {
        this._render();
      },
      // 查看留言
      editItem: function () {
        var url = CONST.HOST + '/modules/message/message_detail.html?id='
          + this.model.toJSON().messageId;
        var options = {
          title: '留言信息',
          url: url,
          reload: true,
          padding: 0,
          hideSaveBtn: true,
          hideResetBtn: true,
          oniframeload: function (win) {
            win.app = app;
          }
        }
        this._edit(options);
      }
    });
    /**
     * 列表视图
     */
    MessageList = BaseList.extend({
      events: {
        'click #toggle-all': '_toggleAllChecked',
        'click .btn-batch-del': '_batchDel',
        'click .btn-search': 'search',
        'click .search-advance': 'searchAdvance',
        'click .btn-batch-display': 'batchDisplay',
        'click .btn-batch-category': 'batchCategory',
        'click .btn-email-bind': 'emailBind',
        'click .btn-blacklist': 'blackList'
      },
      initialize: function () {
        this.editItem = true;
        this._initialize({
          render: '#message-list-ul',
          enterRender: '.btn-search',
          template: listTemp,
          model: MessageModel,
          collection: MessageCollection,
          item: MessageItem,
          pagination: true,
          detail: CONST.HOST + '/modules/message/message_detail.html'
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
      // 邮箱绑定
      emailBind: function () {
        var model = new MessageBindModel();
        var template = HandlebarsHelper.compile(emailTemp)
        model.fetch().then(function () {
          BaseUtils.dialog({
            id: 'dialog',
            title: '邮箱绑定',
            content: template(model.toJSON()),
            target: '.btn-email-bind',
            width: 380,
            success: function () {
              model.set('state', $('input[name=state]').val());
              model.set('key', $('input[name=key]').val());
              model.save().then(function () {
              });
              this.close().remove();
            }
          });
        });
      },
      // 黑名单
      blackList: function () {
        BaseUtils.iframeDialog({
          title: '黑名单',
          url: CONST.DOMAIN + '/user/blacklist/view',
          width: 500
        });
      }
    });

    module.exports = MessageList;
  });