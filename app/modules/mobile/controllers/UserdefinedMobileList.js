/**
 * @description UserdefinedMobileList
 * @namespace UserdefinedMobileList
 * @author yongjin<zjut_wyj@163.com> 2014/12/26
 */
define('UserdefinedMobileList', ['jquery', 'UserdefinedMobileModel', 'BaseCollection', 'BaseItem', 'BaseList', 'HandlebarsHelper', 'template/userdefined_mobile_list', 'template/userdefined_mobile_item'],
  function (require, exports, module) {
    var UserdefinedMobileModel, BaseCollection, UserdefinedCollection, UserdefinedItem, BaseItem, HandlebarsHelper, UserdefinedMobileList, BaseList, listTemp, itemTemp;

    UserdefinedMobileModel = require('UserdefinedMobileModel');
    BaseCollection = require('BaseCollection');
    BaseItem = require('BaseItem');
    BaseList = require('BaseList');
    HandlebarsHelper = require('HandlebarsHelper');
    listTemp = require('template/userdefined_mobile_list');
    itemTemp = require('template/userdefined_mobile_item');

    UserdefinedCollection = BaseCollection.extend({
      url: function () {
        var url = CONST.API + '/userdefined/list';
        if (Est.isEmpty(this.options.data.page)) {
          return url + '?mobile=true';
        }
        return url + '/' + this.options.data.page + '?mobile=true';
      },
      model: UserdefinedMobileModel,
      initialize: function () {
        this._initialize();
      }
    });

    UserdefinedItem = BaseItem.extend({
      tagName: 'tr',
      className: 'bui-grid-row',
      events: {
        'click .toggle': '_toggleChecked',
        'click .edit': 'edit',
        'click .delete': '_del',
        'click .name': 'editName',
        'change .input-sort': 'changeSort'
      },
      initialize: function () {
        this._initialize({
          template: itemTemp,
          model: UserdefinedMobileModel,
          detail: CONST.HOST + '/modules/mobile/mobile_userdefined_detail.html'
        });
      },
      edit: function () {
        this._dialog({
          moduleId: 'UserdefinedMobileDetail',
          title: '自定义模块修改',
          width: 800,
          id: this.model.get('id'),
          onClose: function () {
            this.model.set(app.getModels().pop());
          }
        });
      },
      render: function () {
        this._render();
      },
      editName: function () {
        this._editField({
          title: '修改属性名称',
          field: 'name',
          target: '.name'
        }, this);
      },
      changeSort: function () {
        var ctx = this;
        var sort = this.$('.input-sort').val();
        this.model._saveField({ id: this.model.get('id'), orderList: sort
        }, ctx, { success: function () {
          ctx.model.set('orderList', sort);
        }, hideTip: true
        });
      }
    });

    UserdefinedMobileList = BaseList.extend({
      events: {
        'click #toggle-all': '_toggleAllChecked',
        'click .attributes-add': 'add',
        'click .btn-search': 'search',
        'click .attributes-show': 'attributesShow',
        'click .btn-back': 'back'
      },
      initialize: function () {
        this._initialize({
          template: listTemp,
          render: '#attributes-list-ul',
          item: UserdefinedItem,
          model: UserdefinedMobileModel,
          collection: UserdefinedCollection,
          detail: CONST.HOST + '/modules/mobile/mobile_userdefined_detail.html'
        });
      },
      back: function(){
        this._navigate('#/mobile', true);
      },
      add: function () {
        this._dialog({
          moduleId: 'UserdefinedMobileDetail',
          title: '自定义模块添加',
          width: 800,
          onClose: function () {
            this._reload()
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
              {key: 'name', value: this.searchKey }
            ]
          });
        }
      },
      render: function () {
        this._render();
      }
    });

    module.exports = UserdefinedMobileList;
  });