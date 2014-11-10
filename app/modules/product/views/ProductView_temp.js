/**
 * @description 产品列表视图
 * @namespace ProductView
 * @author yongjin on 2014/10/31
 */
define('ProductView', ['jquery', 'underscore', 'backbone', 'ProductItem', 'ProductCollection', 'dialog', 'BaseRoot', 'ProductDetail', 'ProductModel'],
    function (require, exports, module) {
        var ProductView, ProductItem, ProductCollection, Backbone, BaseRoot;

        ProductItem = require("ProductItem");
        ProductCollection = require("ProductCollection");
        Backbone = require('backbone');
        BaseRoot = require('BaseRoot');

        ProductView = Backbone.View.extend({

            el: '#list-product',
            list: $("#product-list-ul"),

            events: {
                'click .product-add': 'openAddDialog'
            },

            initialize: function () {
                console.log('ProductView.initialize');
                var ctx = this;
                this.views = [];

                this.collection = new ProductCollection();
                this.collection.bind('add', this.addOne, this);
                // 当调用fetch后， 就会调用reset事件
                this.collection.bind('reset', this.render, this);

                this.collection.paginationModel.on('reloadList', function (model) {
                    ctx.collection.load(ctx.collection, ctx, model);
                });
                this.collection.load(ctx.collection, this);

                return this;
            },

            render: function () {
                console.log('ProductView.render');
                this.addAll();
            },

            empty: function () {
                console.log('ProductView.empty');
                _.each(this.views, function (view) {
                    view.off().remove();
                })
                this.views = [];
                this.list.html("");
            },

            addOne: function (product) {
                var itemView = new ProductItem({
                    model: product
                });
                this.list.append(itemView.render().el);
                this.views.push(itemView);
            },

            addAll: function () {
                console.log('ProductView.addAll');
                this.empty();
                this.collection.each(this.addOne, this);
            },

            openAddDialog: function () {
                console.log('ProductView.openAddDialog');
                var ctx = this;
                var ProductModel = require('ProductModel');
                var ProductDetail = require("ProductDetail");
                var productModel = new ProductModel();

                this.productDetail = new ProductDetail({model: productModel});

                BUI.use(['bui/overlay', 'bui/form'], function (Overlay, Form) {
                    if (!BaseRoot.productDetailDialog) {
                        BaseRoot.productDetailDialog = new Overlay.Dialog({
                            title: '产品添加',
                            width: 800,
                            contentId: 'dialog-container',
                            success: function () {
                                var dialog = this;
                                ctx.productDetail.saveItem(function (response) {
                                    ctx.collection.paginationModel.set('page', 1);
                                    ctx.collection.load(ctx.collection, ctx, ctx.collection.paginationModel)
                                        .done(function (response) {
                                            dialog.close();
                                            $("#dialog-container").append("<div id=\"product-add-container\"></div>");
                                        });
                                    ctx.collection.load();
                                });
                            }
                        });
                    }
                    BaseRoot.productDetailDialog.show();
                });
            }
        });
        module.exports = ProductView;
    });