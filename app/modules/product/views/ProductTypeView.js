/**
 * @description 产品属性列表视图
 * @namespace ProductTypeView
 * @author yongjin on 2014/11/11
 */
define('ProductTypeView', ['jquery', 'underscore', 'backbone', 'ProductTypeItem', 'ProductTypeCollection'],
    function (require, exports, module) {
        var ProductTypeView, ProductTypeItem, ProductTypeCollection, Backbone;

        ProductTypeItem = require("ProductTypeItem");
        ProductTypeCollection = require("ProductTypeCollection");
        Backbone = require('backbone');

        ProductTypeView = Backbone.View.extend({

            el: '#product-type-list',
            list: $("#product-type-list-ul"),

            events: {
                'click #toggle-all': 'toggleAllChecked',
                'click .product-type-add': 'openAddDialog'
            },

            initialize: function () {
                console.log('1.ProductTypeView.initialize');
                var ctx = this;

                this.views = [];
                this.allCheckbox = this.$('#toggle-all')[0];
                this.collection = new ProductTypeCollection();
                this.collection.bind('add', this.addOne, this);

                // 当调用fetch后， 就会调用reset事件
                this.collection.bind('reset', this.render, this);
                this.collection.paginationModel.on('reloadList', function (model) {
                    ctx.collection.load(ctx.collection, ctx, model);
                });
                this.collection.load(ctx.collection, ctx);

                return this;
            },

            render: function () {
                console.log('ProductTypeView.render');
                this.addAll();
            },

            empty: function () {
                console.log('5.ProductTypeView.empty');
                _.each(this.views, function (view) {
                    view.off().remove();
                })
                this.views = [];
                this.list.html("");
            },

            addOne: function (productType) {
                var itemView = new ProductTypeItem({
                    model: productType
                });
                this.list.append(itemView.render().el);
                this.views.push(itemView);
            },

            addAll: function () {
                console.log('ProductTypeView.addAll');
                this.empty();
                this.collection.each(this.addOne, this);
            },

            openAddDialog: function () {
                console.log('ProductTypeView.openAddDialog');
                var ctx = this;

                seajs.use(['dialog-plus'], function (dialog) {
                    window.dialog = dialog;

                    var buttons = [{
                        value: '保存',
                        autofocus: true,
                        callback: function () {
                            this.iframeNode.contentWindow.$("#product-type-submit").click();
                            return false;
                        }
                    }, {
                        value: '重置',
                        callback: function () {
                            this.iframeNode.contentWindow.$("#product-type-reset").click();
                            return false;
                        }
                    }, { value: '关闭' } ];

                    window.productTypeDetailDialog = dialog({
                        id: 'product-type-add-dialog',
                        title: '产品类型添加',
                        width: 400,
                        height: 150,
                        url: 'http://jihui88.com/member/modules/product/product_type_detail.html?time=' + new Date().getTime(),
                        button: buttons,
                        oniframeload: function () {
                            this.iframeNode.contentWindow.detailDialog = window.detailDialog;
                        },
                        onclose: function () {
                            ctx.collection.load(ctx.collection, ctx).done(function () {
                                ctx.render();
                            });
                            this.remove();
                            if (this.returnValue) {
                                $('#value').html(this.returnValue);
                            }
                        }
                    });
                    window.productTypeDetailDialog.showModal();
                });
            },
            toggleAllChecked: function () {
                var checked = this.allCheckbox.checked;
                this.collection.each(function (product) {
                    product.set('checked', checked);
                });
            }
        });
        module.exports = ProductTypeView;
    });