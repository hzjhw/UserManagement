/**
 * @description 产品属性li视图
 * @namespace ProducTypeItem
 * @author yongjin on 2014/11/11
 */
define('ProductTypeItem', ['jquery', 'dialog', 'HandlebarsHelper', 'Est', 'BaseItem'],
    function (require, exports, module) {
        var ProductTypeItem, HandlebarsHelper, Est, BaseItem;

        HandlebarsHelper = require('HandlebarsHelper');
        Est = require('Est');
        BaseItem = require('BaseItem');

        ProductTypeItem = BaseItem.extend({
            tagName: 'li',
            template: HandlebarsHelper.compile($('#product-type-list-tpl').html()),
            events: {
                'click .name': 'editName',
                'click .delete': 'deleteItem',
                'click .edit': 'editItem',
                'click .list-attr': 'openAttrDialog'
            },
            initialize: function () {
                this.model.bind('reset', this.render, this);
                this.model.bind('change', this.render, this);
                this.model.bind('destroy', this.remove, this);
                if (this.model.view) this.model.view.remove();
                this.model.view = this;
            },
            render: function () {
                console.log('11.ProductTypeItem.render [item display]');
                this.$el.html(this.template(this.model.toJSON()));
                return this;
            },
            openAttrDialog: function(){

            },

            editItem: function () {
                this.edit({
                    title: '产品类型修改',
                    url: 'http://jihui88.com/member/modules/product/product_type_detail.html?id=' + this.model.id
                });
            },

            editName: function () {
                this.editField({
                    title: '修改名称',
                    field: 'name',
                    target: '.name'
                },this);
            },

            deleteItem: function () {
                this.del(this);
            }
        });

        module.exports = ProductTypeItem;
    });