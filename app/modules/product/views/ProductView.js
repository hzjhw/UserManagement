/**
 * @description 产品列表视图
 * @namespace ProductView
 * @author yongjin on 2014/10/31
 */
define('ProductView', ['jquery', 'underscore', 'backbone', 'ProductItem', 'ProductCollection', 'dialog', 'ProductDetail', 'ProductModel'],
    function (require, exports, module) {
        var ProductView, ProductItem, ProductCollection, Backbone;

        ProductItem = require("ProductItem");
        ProductCollection = require("ProductCollection");
        Backbone = require('backbone');

        ProductView = Backbone.View.extend({

            el: '#list-product',

            list: $("#product-list-ul"),

            events: {
                'click .product-add': 'openAddDialog',
                'click .product-refresh': 'render'
            },

            initialize: function () {
                this.views = [];
                this.collection = new ProductCollection();
                this.listenTo(this.collection, 'add', this.addOne);
                this.listenTo(this.collection, 'reset replace', this.render);
                this.collection.fetch();
                return this;
            },

            render: function () {
                _.each(this.views, function (view) {
                    view.remove().off();
                })
                this.views = [];
                this.list.empty();

                this.collection.each(this.addOne, this);
            },

            addOne: function (product) {
                var itemView = new ProductItem({
                    model: product
                });
                this.list.append(itemView.render().el);
                this.views.push(itemView);
            },

            openAddDialog: function () {
                var ctx = this;
                var ProductDetail = require("ProductDetail");
                var ProductModel = require('ProductModel');
                var productDetail = new ProductDetail({model: new ProductModel()});

                BUI.use(['bui/overlay','bui/form'],function(Overlay, Form){
                    if (!ctx.addDialog){
                        ctx.addDialog = new Overlay.Dialog({
                            title:'产品添加',
                            contentId:'dialog-container',
                            success:function () {
                                ctx.collection.unshift(productDetail.saveItem());
                                this.close();
                            }
                        });
                    }
                    ctx.addDialog.show();
                });
            }
        });
        module.exports = ProductView;
    });