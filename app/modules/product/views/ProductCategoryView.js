/**
 * @description 产品分类列表视图
 * @namespace ProductCategoryView
 * @author yongjin on 2014/10/31
 */
define('ProductCategoryView', ['jquery', 'underscore', 'backbone', 'ProductCategoryItem', 'ProductCategoryCollection'],
    function (require, exports, module) {
        var ProductCategoryView, ProductCategoryItem, ProductCategoryCollection, Backbone;

        ProductCategoryItem = require("ProductCategoryItem");
        ProductCategoryCollection = require("ProductCategoryCollection");
        Backbone = require('backbone');

        ProductCategoryView = Backbone.View.extend({

            el: '#list-product-category',
            list: $("#product-category-list-ul"),

            events: {
                'click #toggle-all': 'toggleAllChecked',
                'click .product-category-add': 'openAddDialog'
            },

            initialize: function () {
                console.log('1.ProductCategoryView.initialize');
                var ctx = this;
                this.views = [];
                this.allCheckbox = this.$('#toggle-all')[0];
                this.collection = new ProductCategoryCollection();
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
                console.log('ProductCategoryView.render');
                this.addAll();
            },

            empty: function () {
                console.log('5.ProductCategoryView.empty');
                _.each(this.views, function (view) {
                    view.off().remove();
                })
                this.views = [];
                this.list.html("");
            },

            addOne: function (product) {
                var itemView = new ProductCategoryItem({
                    model: product
                });
                this.list.append(itemView.render().el);
                this.views.push(itemView);
            },

            addAll: function () {
                console.log('ProductCategoryView.addAll');
                this.empty();
                this.collection.each(this.addOne, this);
            },

            checkSelect: function(){

            },

            openAddDialog: function () {
                console.log('ProductCategoryView.openAddDialog');
                var ctx = this;

                seajs.use(['dialog-plus'], function (dialog) {
                    window.dialog = dialog;

                    window.detailDialog = dialog({
                        id: 'product-add-dialog',
                        title: '产品添加',
                        width: 800,
                        url: 'http://jihui88.com/member/modules/product/product_category_detail.html?time=' + new Date().getTime() ,
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
                        onshow: function () {
                            console.log('onshow');
                        },
                        oniframeload: function () {
                            this.iframeNode.contentWindow.detailDialog = window.detailDialog;
                            console.log('oniframeload');
                        },
                        onclose: function () {
                            ctx.collection.load(ctx.collection, ctx).done(function(){
                                ctx.render();
                            });
                            this.remove();
                            if (this.returnValue) {
                                $('#value').html(this.returnValue);
                            }
                            console.log('onclose');
                        },
                        onremove: function () {
                            console.log('onremove');
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
        module.exports = ProductCategoryView;
    });