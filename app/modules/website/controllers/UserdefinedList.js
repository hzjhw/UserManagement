/**
 * @description UserdefinedList
 * @namespace UserdefinedList
 * @author yongjin<zjut_wyj@163.com> 2014/12/26
 */
define('UserdefinedList', ['jquery', 'UserdefinedModel', 'BaseCollection', 'BaseItem', 'BaseList', 'HandlebarsHelper', 'template/userdefined_list', 'template/userdefined_item'],
  function (require, exports, module) {
    var UserdefinedModel, BaseCollection, UserdefinedCollection, UserdefinedItem, BaseItem, HandlebarsHelper, UserdefinedList, BaseList, listTemp, itemTemp;

    UserdefinedModel = require('UserdefinedModel');
    BaseCollection = require('BaseCollection');
    BaseItem = require('BaseItem');
    BaseList = require('BaseList');
    HandlebarsHelper = require('HandlebarsHelper');
    listTemp = require('template/userdefined_list');
    itemTemp = require('template/userdefined_item');

    UserdefinedCollection = BaseCollection.extend({
      url: function () {
        var url = CONST.API + '/userdefined/list';
        var end = '?page=' + this.paginationModel.get('page') + '&pageSize=' + this.paginationModel.get('pageSize');
        if (Est.isEmpty(this.options.data.page)) {
          return url + end;
        }
        return url + '/' + this.options.data.page + end;
      },
      model: UserdefinedModel,
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
          model: UserdefinedModel
        });
      },
      edit: function () {
        this._dialog({
          moduleId: 'UserdefinedDetail',
          title: '自定义模块修改',
          id: this.model.get('id'),
          width: 800,
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

    UserdefinedList = BaseList.extend({
      events: {
        'click #toggle-all': '_toggleAllChecked',
        'click .attributes-add': 'add',
        'click .btn-search': 'search',
        'click .attributes-show': 'attributesShow'
      },
      initialize: function () {
        this._initialize({
          template: listTemp,
          render: '#attributes-list-ul',
          item: UserdefinedItem,
          model: UserdefinedModel,
          collection: UserdefinedCollection
        });
      },
      add: function () {
        this._dialog({
          moduleId: 'UserdefinedDetail',
          width: 800,
          title: '自定义模块添加',
          onClose: function () {
            this._reload();
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

    module.exports = UserdefinedList;
  });