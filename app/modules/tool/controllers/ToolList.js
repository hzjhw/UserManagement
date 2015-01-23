/**
 * @description ToolList
 * @class ToolList
 * @author yongjin<zjut_wyj@163.com> 2015/1/16
 */
define('ToolList', ['BaseList', 'template/tool_list', 'template/tool_item', 'BaseUtils', 'BaseCollection', 'BaseItem', 'BaseModel'],
  function (require, exports, module) {
    var ToolList, BaseList, template, BaseUtils, BaseCollection, BaseModel, BaseItem, collection, model, item, itemTemp;

    BaseList = require('BaseList');
    template = require('template/tool_list');
    BaseUtils = require('BaseUtils');
    BaseCollection = require('BaseCollection');
    BaseItem = require('BaseItem');
    BaseModel = require('BaseModel');
    itemTemp = require('template/tool_item');

    model = BaseModel.extend({
      initialize: function () {
        this._initialize();
      }
    });

    collection = BaseCollection.extend({
      model: model,
      initialize: function () {
        this._initialize();
      }
    });

    item = BaseItem.extend({
      tagName: 'div',
      className: 'item',
      events: {
        'click .item-inner': 'openToolDialog'
      },
      initialize: function () {
        this._initialize({
          template: itemTemp
        });
      },
      openToolDialog: function (e) {
        e.stopImmediatePropagation();
        BaseUtils.iframeDialog({
          id: 'tool-dialog',
          width: 980,
          height: 'auto',
          title: this.model.get('name'),
          url: this.model.get('url'),
          hideSaveBtn: true
        });
      },
      render: function () {
        this._render();
      }
    });

    ToolList = BaseList.extend({
      initialize: function () {
        this._initialize({
          template: template,
          model: model,
          collection: collection,
          item: item,
          render: '.layout_app-unfavor-list-list'
        });
      },
      render: function () {
        this._render.call(this);
      }
    });


    module.exports = ToolList;
  });