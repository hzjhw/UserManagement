/**
 * @descr
 * iption MessageList
 * @namespace MessageList
 * @author wxw on 2014/12/12
 */
define('WwyMobileList', ['jquery', 'WwyModel', 'BaseCollection', 'BaseItem', 'BaseList', 'HandlebarsHelper',
    'template/wwy_mobile_list', 'template/wwy_mobile_item', 'BaseUtils'],
  function (require, exports, module) {
    var WwyModel, BaseCollection, BaseItem, BaseList, HandlebarsHelper, WwyMobileList, WwyItem,
      WwyCollection, listTemp, itemTemp, BaseUtils,wyId;

    WwyModel = require('WwyModel');
    BaseCollection = require('BaseCollection');
    BaseItem = require('BaseItem');
    BaseList = require('BaseList');
    HandlebarsHelper = require('HandlebarsHelper');
    listTemp = require('template/wwy_mobile_list');
    itemTemp = require('template/wwy_mobile_item');
    BaseUtils = require('BaseUtils');

    /**
     * 集合类
     */
    WwyCollection = BaseCollection.extend({
      url: CONST.API + '/wwy/mobile/list/'+model.get("wyId"),
      model: WwyModel,
      initialize: function () {
        this._initialize();
      }
    });
    /**
     * 单视图
     */
    WwyMobileItem = BaseItem.extend({
      tagName: 'tr',
      className: 'bui-grid-row',
      events: {
        'click .toggle': '_toggleChecked'
      },
      // 初始化
      initialize: function () {
        this._initialize({ template: itemTemp, model: WwyModel});
      },
      // 渲染文档
      render: function () {
        this._render();
      }
    });
    /**
     * 列表视图
     */
    WwyMobileList = BaseList.extend({
      el: '#jhw-main',
      defaults : {
        "wyId":"44444"
      },
      events: {
        'click #toggle-all': '_toggleAllChecked',
        'click .showqrcode': 'showQrcode',
        'click .wwy-add': 'openAddDialog',
        'click .btn-search': 'search',
        'click .btn-blacklist': 'blackList'
      },
      initialize: function () {
        alert(this.defaults.wyId);
        this.editItem = true;
        this._initialize({
          render: '#wwy-mobile-list-ul',
          enterRender: '.btn-search',
          template: listTemp,
          model: WwyModel,
          collection: WwyCollection,
          item: WwyMobileItem
        }).then(function (thisCtx) {
          thisCtx._initPagination(thisCtx._options);
          thisCtx._load(thisCtx._options);
        });
      }

    });
    module.exports = WwyMobileList;
  });