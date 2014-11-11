/**
 * @description 产品列表li视图
 * @namespace ProducItem
 * @author yongjin on 2014/10/31
 */
define('ProductItem', ['jquery', 'dialog', 'HandlebarsHelper', 'Est', 'BaseItem'],
    function (require, exports, module) {
        var ProductItem, HandlebarsHelper, Est, BaseItem;

        HandlebarsHelper = require('HandlebarsHelper');
        Est = require('Est');
        BaseItem = require('BaseItem');

        ProductItem = BaseItem.extend({
            tagName: 'li',
            template: HandlebarsHelper.compile($('#item-product').html()),
            events: {
                'click .name': 'editName',
                'click .edit': 'editItem',
                'click .delete': 'del'
            },

            initialize: function () {
                this.__proto__.constructor.__super__.initialize.apply(this, arguments);
            },

            render: function () {
                console.log('11.ProductItem.render [item display]');
                this.$el.html(this.template(this.model.toJSON()));
                return this;
            },

            editItem: function () {
                this.edit({
                    title: '产品修改',
                    url: host + '/modules/product/product_detail.html?id=' + this.model.id
                });
            },

            editName: function () {
                this.editField({
                    title: '修改名称',
                    field: 'name',
                    target: '.name'
                }, this);
            }

        });
        module.exports = ProductItem;
    });