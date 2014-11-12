/**
 * @description 产品列表视图
 * @namespace ProductView
 * @author yongjin on 2014/10/31
 */
define('ProductView', ['jquery', 'ProductItem', 'ProductCollection', 'BaseView'],
    function (require, exports, module) {
        var ProductView, ProductItem, ProductCollection, BaseView, template;

        ProductItem = require("ProductItem");
        ProductCollection = require("ProductCollection");
        BaseView = require('BaseView');
        template = require('http://jihui88.com/member/modules/product/templates/product_list.html');

        ProductView = BaseView.extend({
            el: '#main',
            events: {
                'click #toggle-all': 'toggleAllChecked',
                'click .product-add': 'openAddDialog'
            },

            initialize: function () {
                this.$el.empty();
                this.$el.append($(template));
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
        module.exports = ProductView;
    });