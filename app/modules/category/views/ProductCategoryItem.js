/**
 * @description 产品分类列表li视图
 * @namespace ProducCategoryItem
 * @author yongjin on 2014/10/31
 */
define('ProductCategoryItem', ['jquery', 'dialog', 'HandlebarsHelper', 'Est', 'BaseItem'],
    function (require, exports, module) {
        var ProductCategoryItem, HandlebarsHelper, Est, BaseItem, template;

        HandlebarsHelper = require('HandlebarsHelper');
        Est = require('Est');
        BaseItem = require('BaseItem');
        template = require('http://jihui88.com/member/modules/category/templates/category_product_item.html');

        ProductCategoryItem = BaseItem.extend({
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
                console.log('11.ProductCategoryItem.render [item display]');
                this.$el.html(this.template(this.model.toJSON()));
                return this;
            },

            editItem: function () {
                this.edit({
                    title: '产品分类修改',
                    url: 'http://jihui88.com/member/modules/category/product_category_detail.html?id=' + this.model.id
                });
            },

            editName: function () {
                this.editField({
                    title: '修改分类名称',
                    field: 'name',
                    target: '.name'
                },this);
            },

            deleteItem: function () {
                this.del(this);
            }
        });

        module.exports = ProductCategoryItem;
    });