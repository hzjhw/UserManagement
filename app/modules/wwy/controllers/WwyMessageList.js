/**
 * @description 微网页留言控制
 * @namespace WwyMessageList
 * @author wxw on 2014/12/12
 */
define('WwyMessageList', ['jquery', 'WwyMessageModel', 'WwyModel', 'BaseCollection', 'BaseItem', 'BaseList', 'HandlebarsHelper',
    'template/wwy_message_list', 'template/wwy_message_item', 'BaseUtils'],
  function (require, exports, module) {
    var WwyMessageModel, WwyModel, BaseCollection, BaseItem, BaseList, HandlebarsHelper, WwyMessageList, WwyMessageItem,
      WwyMessageCollection, listTemp, itemTemp, BaseUtils;

    WwyMessageModel = require('WwyMessageModel');
    WwyModel = require('WwyModel');
    BaseCollection = require('BaseCollection');
    BaseItem = require('BaseItem');
    BaseList = require('BaseList');
    HandlebarsHelper = require('HandlebarsHelper');
    listTemp = require('template/wwy_message_list');
    itemTemp = require('template/wwy_message_item');
    BaseUtils = require('BaseUtils');

    /**
     * 集合类
     */
    WwyMessageCollection = BaseCollection.extend({
      url: function () {
        return CONST.API + '/wwy/message/list/' + this.getWyId()
      },
      model: WwyMessageModel,
      initialize: function () {
        this._initialize();
      },
      setWyId: function (wyId) {
        this.wyId = wyId;
      },
      getWyId: function () {
        return this.wyId;
      }
    });
    /**
     * 单视图
     */
    WwyMessageItem = BaseItem.extend({
      tagName: 'tr',
      className: 'bui-grid-row',
      events: {
        'click .toggle': '_toggleChecked',
        'click .delete': '_del'
      },
      initialize: function () {
        this._initialize({ template: itemTemp, model: WwyMessageModel});
      },
      render: function () {
        this._render();
      }
    });
    /**
     * 列表视图
     */
    WwyMessageList = BaseList.extend({
      el: '#jhw-main',
      events: {
        'click #toggle-all': '_toggleAllChecked'
      },
      initialize: function (options) {
        var ctx = this;
        this.options = options || {};
        this.editItem = true;
        var detail = new WwyModel();
        detail.set("id", options.wyId);
        detail.fetch({
          sync: true
        }).done(function (result) {
          ctx._initialize({
            render: '#wwy-message-list-ul',
            enterRender: '.btn-search',
            template: listTemp,
            model: WwyMessageModel,
            collection: WwyMessageCollection,
            item: WwyMessageItem,
            args: {
              msgctrl: detail.get("msgctrl")
            },
            beforeLoad: function (collection) {
              collection.setWyId(options.wyId);
            }
          })
        })
      }
    });

    module.exports = WwyMessageList;
  });