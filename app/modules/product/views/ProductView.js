/**
 * @description 产品列表视图
 * @namespace ProductView
 * @author yongjin on 2014/10/31
 */
define('ProductView', ['jquery', 'underscore', 'backbone', 'ProductItem', 'ProductCollection', 'dialog','BaseRoot', 'ProductDetail', 'ProductModel'],
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
                var ctx = this;
                this.views = [];

                this.collection = new ProductCollection();
                this.listenTo(this.collection, 'add', this.addOne);
                this.listenTo(this.collection, 'reset', this.render);

                this.collection.paginationModel.on('reloadList', function(model){
                    ctx.collection.load(ctx.collection, ctx, model);
                });
                this.collection.load(ctx.collection, this);

                return this;
            },

            render: function () {
                this.collection.each(this.addOne, this);
            },

            empty: function(){
                _.each(this.views, function (view) {
                    view.remove().off();
                })
                this.views = [];
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
                var ProductModel = require('ProductModel');
                var ProductDetail = require("ProductDetail");

                this.productDetail = new ProductDetail({model: new ProductModel});

                BUI.use(['bui/overlay','bui/form'],function(Overlay, Form){
                    if (!BaseRoot.productDetailDialog){
                        BaseRoot.productDetailDialog = new Overlay.Dialog({
                            title:'产品添加',
                            width:800,
                            contentId:'dialog-container',
                            success:function () {
                                var context = this;
                                ctx.productDetail.saveItem(function(response){
                                    debugger
                                    ctx.collection.paginationModel.set('page', 1);
                                    //ctx.empty();
                                    ctx.collection.load(ctx.collection,ctx, ctx.collection.paginationModel).done(function(){
                                        ctx.render();
                                        context.close();
                                    });
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