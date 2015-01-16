/**
 * @descr
 * iption MessageList
 * @namespace MessageList
 * @author wxw on 2014/12/12
 */
define('WwyMobileList', ['jquery', 'WwyModel', 'BaseCollection', 'BaseItem', 'BaseList', 'HandlebarsHelper',
    'template/wwy_mobile_list', 'template/wwy_mobile_item', 'BaseUtils'],
  function (require, exports, module) {
    var WwyModel, BaseCollection, BaseItem, BaseList, HandlebarsHelper, WwyMobileList, WwyMobileItem,
      WwyMobileCollection, listTemp, itemTemp, BaseUtils, wyId;

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
    WwyMobileCollection = BaseCollection.extend({
      url: function () {
        return CONST.API + '/wwy/mobile/list/' + this.getWyId()
      },
      model: WwyModel,
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
      events: {
        'click #toggle-all': '_toggleAllChecked'
      },
      initialize: function (options) {
        this.options = options || {};
        this.editItem = true;
        this._initialize({
          render: '#wwy-mobile-list-ul',
          enterRender: '.btn-search',
          template: listTemp,
          model: WwyModel,
          collection: WwyMobileCollection,
          item: WwyMobileItem,
          beforeLoad: function (collection) {
            collection.setWyId(options.wyId);
          }
        })
      }

    });
    module.exports = WwyMobileList;
  });