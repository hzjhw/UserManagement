/**
 * @description 产品列表视图
 * @namespace ProductView
 * @author yongjin on 2014/10/31
 */
define('ProductView', ['jquery', 'underscore', 'backbone', 'ProductItem', 'ProductCollection', 'ProductDetail', 'ProductModel'],
    function (require, exports, module) {
        var ProductView, ProductItem, ProductCollection, Backbone;

        ProductItem = require("ProductItem");
        ProductCollection = require("ProductCollection");
        Backbone = require('backbone');

        ProductView = Backbone.View.extend({

            el: '#list-product',
            list: $("#product-list-ul"),

            events: {
                'click #toggle-all': 'toggleAllChecked',
                'click .product-add': 'openAddDialog'
            },

            initialize: function () {
                console.log('1.ProductView.initialize');
                var ctx = this;
                this.views = [];

                this.allCheckbox = this.$('#toggle-all')[0];
                this.collection = new ProductCollection();

                this.collection.bind('add', this.addOne, this);
                // 当调用fetch后， 就会调用reset事件
                this.collection.bind('reset', this.render, this);
                this.listenTo(this.collection, 'change:checked', this.checkSelect);

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
                console.log('5.ProductView.empty');
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

            checkSelect: function(){

            },

            openAddDialog: function () {
                console.log('1.ProductView.openAddDialog');
                var ctx = this;

                seajs.use(['dialog-plus'], function (dialog) {
                    window.dialog = dialog;

                    window.detailDialog = dialog({
                        id: 'product-add-dialog',
                        title: '产品添加',
                        width: 800,
                        url: 'http://jihui88.com/member/modules/product/product_detail.html?time=' + new Date().getTime() ,
                        button: [{
                            value: '保存',
                            callback: function () {
                                this.iframeNode.contentWindow.$("#product-submit").click();
                                return false;
                            },
                            autofocus: true
                        },{
                            value: '重置',
                            callback: function () {
                                this.iframeNode.contentWindow.$("#product-reset").click();
                                return false;
                            }
                        },{ value: '关闭' } ],
                        oniframeload: function () {
                            this.iframeNode.contentWindow.detailDialog = window.detailDialog;
                        },
                        onclose: function () {
                            ctx.collection.load(ctx.collection, ctx).done(function(){
                                ctx.render();
                            });
                            this.remove();
                            if (this.returnValue) {
                                $('#value').html(this.returnValue);
                            }
                        }
                    });
                    window.detailDialog.showModal();
                });
            },
            toggleAllChecked: function () {
                var checked = this.allCheckbox.checked;
                this.collection.each(function (product) {
                   product.set('checked', checked);
                });
            }
        });
        module.exports = ProductView;
    });