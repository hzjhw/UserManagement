/**
 * @description 产品分类列表li视图
 * @namespace ProducCategoryItem
 * @author yongjin on 2014/10/31
 */
define('ProductCategoryItem', ['jquery', 'underscore', 'backbone', 'dialog', 'handlebars', 'Est'],
    function (require, exports, module) {
        var ProductCategoryItem, handlebars, Backbone, Est;

        Backbone = require('backbone');
        handlebars = require('handlebars');
        Est = require('Est');

        ProductCategoryItem = Backbone.View.extend({
            tagName: 'li',
            template: handlebars.compile($('#item-product-category').html()),
            events: {
                'click .name': 'showName',
                'click .delete': 'deleteItem',
                'click .edit': 'editItem'
            },
            initialize: function () {
                // 判断是否修改
                this.model.bind('reset', this.render, this);
                this.model.bind('change', this.render, this);
                this.model.bind('destroy', this.remove, this);
                if (this.model.view) this.model.view.remove();
                this.model.view = this;
            },
            render: function () {
                console.log('11.ProductCategoryItem.render [item display]');
                this.$el.html(this.template(this.model.toJSON()));
                return this;
            },
            close: function () {
                console.log('ProductCategoryItem.close');
                // 重新实例化时释放监听
                this.stopListening();
            },
            toggleChecked: function () {
                this.$el.find(".toggle").attr( "checked", this.model.get('checked') );
            },
            editItem: function () {
                console.log('ProductCategoryItem.editItem');
                var ctx = this;
                seajs.use(['dialog-plus'], function (dialog) {
                    window.dialog = dialog;

                    window.detailDialog = dialog({
                        id: 'product-category-edit-dialog',
                        title: '产品修改',
                        width: 800,
                        url: 'http://jihui88.com/member/modules/product/product_category_detail.html?id=' + ctx.model.id ,
                        button: [{
                            value: '保存',
                            callback: function () {
                                this.iframeNode.contentWindow.$("#product-category-submit").click();
                                return false;
                            },
                            autofocus: true
                        },{
                            value: '重置',
                            callback: function () {
                                this.iframeNode.contentWindow.$("#product-category-reset").click();
                                return false;
                            }
                        },{ value: '关闭' } ],
                        oniframeload: function () {
                            this.iframeNode.contentWindow.detailDialog = window.detailDialog;
                        },
                        onclose: function () {
                            ctx.model.set(Est.cloneDeep(window.model));
                            this.remove();
                            window.model = {};
                        }
                    });
                    window.detailDialog.showModal();
                });


            },
            deleteItem: function () {
                console.log('ProductCategoryItem.deleteItem');
                this.model.destroy();
            },
            showName: function () {
                var ctx = this;
                console.log('ProductCategoryItem.showName');
                var dialog = require('dialog');
                var oldName = this.model.attributes.name;
                var d = dialog({
                    title: '修改名称',
                    content: '<input id="property-returnValue-demo" class="text" value="' + oldName + '" />',
                    ok: function () {
                        var value = $('#property-returnValue-demo').val();
                        this.close(value);
                        this.remove();
                    }
                });
                d.addEventListener('close', function () {
                    if (!this.returnValue.length < 1) {
                        ctx.setName(this.returnValue);
                    }
                });
                d.show();
            },
            setName: function (name) {
                console.log('ProductCategoryItem.setName');
                var ctx = this;
                this.model.saveField({
                    'name': name,
                    'test': 'test'
                }, function (model, result) {
                    console.dir(model);
                    console.dir(result);
                    ctx.render();
                }, this);
            },
            clear: function () {
                console.log('ProductCategoryItem.clear');
                this.model.destroy();
            }
        });

        module.exports = ProductCategoryItem;
    });