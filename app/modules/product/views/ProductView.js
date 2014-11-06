/**
 * @description 产品列表视图
 * @namespace ProductView
 * @author yongjin on 2014/10/31
 */
define('ProductView', ['jquery', 'underscore', 'backbone', 'ProductItem', 'ProductCollection', 'dialog', 'ProductDetail', 'ProductModel', 'PaginationModel', 'PaginationView'],
    function (require, exports, module) {
        var ProductView, ProductItem, ProductCollection, Backbone, PaginationModel;

        ProductItem = require("ProductItem");
        ProductCollection = require("ProductCollection");
        Backbone = require('backbone');
        PaginationModel = require('PaginationModel');

        ProductView = Backbone.View.extend({
            el: '#list-product',

            list: $("#product-list-ul"),

            events: {
                'click .product-add': 'openAddDialog',
                'click .product-refresh': 'render'
            },

            initialize: function () {
                var ctx = this;
                this.collection = new ProductCollection();
                this.paginationModel = this.collection.paginationModel;

                this.paginationModel.on('reloadList', function(model){
                    ctx.collection.pagination();
                    ctx.collection.fetch({success: ctx.pagination.call(ctx)});
                });

                this.listenTo(this.collection, 'add', this.addOne);
                this.listenTo(this.collection, 'reset', this.render);

                this.collection.fetch({ success: this.pagination.call(ctx) });
                this.views = [];
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

            pagination: function(){
                var ctx = this;
                var PaginationView = require('PaginationView');
                new PaginationView({
                    model: ctx.paginationModel
                });
            },

            addOne: function (product, isHead) {
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