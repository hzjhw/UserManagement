/**
 * @description 分类属性列表视图
 * @namespace CategoryAttrView
 * @author yongjin on 2014/11/13
 */
define('AttributesList', ['jquery', 'AttributesModel', 'BaseCollection', 'BaseItem', 'BaseList', 'HandlebarsHelper', 'template/attributes_list', 'template/attributes_item'],
    function (require, exports, module) {
        var AttributesModel, BaseCollection, AttributesCollection, AttributesItem, BaseItem, HandlebarsHelper, AttributesList, BaseList, listTemp, itemTemp;

        AttributesModel = require('AttributesModel');
        BaseCollection = require('BaseCollection');
        BaseItem = require('BaseItem');
        BaseList = require('BaseList');
        HandlebarsHelper = require('HandlebarsHelper');
        listTemp = require('template/attributes_list');
        itemTemp = require('template/attributes_item');

        AttributesCollection = BaseCollection.extend({
            url: 'http://jihui88.com/rest/api/attr/list',
            model: AttributesModel
        });

        AttributesItem = BaseItem.extend({
            tagName: 'li',
            template: HandlebarsHelper.compile(itemTemp),
            events: {
                'click .name': 'editName',
                'click .delete': '_del',
                'click .edit': 'editItem'
            },

            initialize: function () {
                this._initialize();
            },

            render: function () {
              this._render();
            },

            editItem: function () {
                this._edit({
                    title: '属性修改',
                    url: Global.HOST + '/modules/attributes/attributes_detail.html?id=' + this.model.id
                });
            },

            editName: function () {
                this._editField({
                    title: '修改属性名称',
                    field: 'name',
                    target: '.name'
                }, this);
            }
        });

        AttributesList = BaseList.extend({
            el: '#jhw-main',
            events: {
                'click #toggle-all': 'toggleAllChecked',
                'click #attributes-add': 'openAddDialog'
            },
            initialize: function () {
                var ctx = this;
                this.initCollection(AttributesCollection, {
                  template: listTemp,
                  render: '#attributes-list-ul',
                  item: AttributesItem,
                  model: AttributesModel
                }).then(function (options) {
                    ctx.initPagination(options);
                    ctx.load(options);
                });
                return this;
            },
            render: function () {
                this.addAll();
            },
            openAddDialog: function () {
                this.detail({
                    title: '属性添加',
                    url: Global.HOST + '/modules/attributes/attributes_detail.html?time=' + new Date().getTime()
                });
            }
        });

        module.exports = AttributesList;
    });