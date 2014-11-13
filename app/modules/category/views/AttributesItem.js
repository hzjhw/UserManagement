/**
 * @description AttributesItem
 * @namespace AttributesItem
 * @author yongjin on 2014/11/13
 */
define('AttributesItem', ['jquery', 'dialog', 'HandlebarsHelper', 'Est', 'BaseItem'],
    function (require, exports, module) {
        var AttributesItem, HandlebarsHelper, Est, BaseItem, template;

        HandlebarsHelper = require('HandlebarsHelper');
        Est = require('Est');
        BaseItem = require('BaseItem');
        template = require('http://jihui88.com/member/modules/category/templates/attributes_item.html') || 'attributes_item.html[404]';

        AttributesItem = BaseItem.extend({
            tagName: 'li',
            template: HandlebarsHelper.compile(template),
            events: {
                'click .name': 'editName',
                'click .delete': 'deleteItem',
                'click .edit': 'editItem'
            },

            initialize: function () {
                this.__proto__.constructor.__super__.initialize.apply(this, arguments);
            },

            render: function () {
                console.log('11.AttributesItem.render [item display]');
                this.$el.html(this.template(this.model.toJSON()));
                return this;
            },

            editItem: function () {
                this.edit({
                    title: '属性修改',
                    url: 'http://jihui88.com/member/modules/category/attributes_detail.html?id=' + this.model.id
                });
            },

            editName: function () {
                this.editField({
                    title: '修改属性名称',
                    field: 'name',
                    target: '.name'
                },this);
            },

            deleteItem: function () {
                this.del(this);
            }
        });

        module.exports = AttributesItem;
    });