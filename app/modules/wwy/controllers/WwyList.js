/**
 * @descr
 * iption MessageList
 * @namespace MessageList
 * @author wxw on 2014/12/12
 */
define('WwyList', ['jquery', 'WwyModel', 'BaseCollection', 'BaseItem', 'BaseList', 'HandlebarsHelper',
    'template/wwy_list', 'template/wwy_detail', 'template/wwy_item', 'BaseUtils'],
  function (require, exports, module) {
    var WwyModel, BaseCollection, BaseItem, BaseList, HandlebarsHelper, WwyList, WwyItem,
      WwyCollection, listTemp, itemTemp, BaseUtils;

    WwyModel = require('WwyModel');
    BaseCollection = require('BaseCollection');
    BaseItem = require('BaseItem');
    BaseList = require('BaseList');
    HandlebarsHelper = require('HandlebarsHelper');
    listTemp = require('template/wwy_list');
    itemTemp = require('template/wwy_item');
    BaseUtils = require('BaseUtils');


    /**
     * 集合类
     */
    WwyCollection = BaseCollection.extend({
      url: CONST.API + '/wwy/list',
      batchDel: CONST.API + '/wwy/batch/del',
      model: WwyModel,
      initialize: function () {
        this._initialize();
      }
    });
    /**
     * 单视图
     */
    WwyItem = BaseItem.extend({
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
        this._initialize({ template: itemTemp, model: WwyModel});
      },
      // 渲染文档
      render: function () {
        this._render();
      },
      // 查看微网页
      editItem: function () {
        this._navigate('#/wwy_edit/' + this.model.get('id'));
      }
    });
    /**
     * 列表视图
     */
    WwyList = BaseList.extend({
      el: '#jhw-main',
      events: {
        'click #toggle-all': '_toggleAllChecked',
        'click .showqrcode': 'showQrcode',
        'click .wwy-add': 'add',
        'click .btn-search': 'search',
        'click .btn-blacklist': 'blackList'
      },
      initialize: function () {
        this.editItem = true;
        this._initialize({
          render: '#wwy-list-ul',
          enterRender: '.btn-search',
          template: listTemp,
          model: WwyModel,
          collection: WwyCollection,
          item: WwyItem,
          pagination: true,
          detail: CONST.HOST + '/modules/wwy/wwy_detail.html'
        });
      },
      // 打开添加/修改对话框
      add: function () {
        this._navigate('#/wwy_add', true);
      },
      // 查看二维码
      showQrcode: function (e) {
        var url = CONST.HOST + '/modules/wwy/views/wwy_qrcode.html?id='
          + $(e.srcElement).attr("wyId");
        this._detail({
          title: '查看二维码',
          url: url,
          width: 300,
          height: 300,
          hideSaveBtn: true,
          hideResetBtn: true,
          oniframeload: function (win) {
            win.app = app;
            // app.getView('wwyDetail').setType('edit');
          }
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
      }
    });

    module.exports = WwyList;
  });