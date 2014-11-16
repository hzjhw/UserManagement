/**
 * @description ProductList
 * @namespace ProductList
 * @author yongjin on 2014/11/16
 */
define('ProductList', ['jquery', 'ProductModel', 'BaseCollection', 'BaseItem', 'BaseList', 'HandlebarsHelper'],
    function (require, exports, module) {
        var ProductModel, BaseCollection, BaseItem, BaseList, HandlebarsHelper, ProductList, ProductItem, ProductCollection, listTemp, itemTemp;

        ProductModel = require('ProductModel');
        BaseCollection = require('BaseCollection');
        BaseItem = require('BaseItem');
        BaseList = require('BaseList');
        HandlebarsHelper = require('HandlebarsHelper');
        listTemp = require('http://jihui88.com/member/modules/product/views/product_list.html');
        itemTemp = require('http://jihui88.com/member/modules/product/views/product_item.html');

        ProductCollection = BaseCollection.extend({
            url: 'http://jihui88.com/rest/api/product/list',
            model: ProductModel
        });

        ProductItem = BaseItem.extend({
            tagName: 'li',
            template: HandlebarsHelper.compile(itemTemp),
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

        ProductList = BaseList.extend({
            el: '#jhw-main',
            events: {
                'click #toggle-all': 'toggleAllChecked',
                'click .product-add': 'openAddDialog'
            },

            initialize: function () {
                this.$el.empty();
                this.$el.append($(listTemp));
                this.list = $("#product-list-ul", this.$el);
                this.initCollection(ProductCollection, this);
                this.initBind();
                this.initItemView(ProductItem, this);
                return this;
            },

            openAddDialog: function(){
                this.detail({
                    title: '产品添加',
                    url: 'http://jihui88.com/member/modules/product/product_detail.html?time=' + new Date().getTime()
                });
            }

        });
        module.exports = ProductList;
    });