/**
 * @description 产品列表li视图
 * @namespace ProducItem
 * @author yongjin on 2014/10/31
 */
define('ProductItem', ['jquery', 'underscore', 'backbone', 'dialog', 'handlebars', 'Est'],
    function (require, exports, module) {
        var ProductItem, handlebars, Backbone, Est;

        Backbone = require('backbone');
        handlebars = require('handlebars');
        Est = require('Est');

        ProductItem = Backbone.View.extend({
            tagName: 'li',
            template: handlebars.compile($('#item-product').html()),
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
                console.log('11.ProductItem.render [item display]');
                this.$el.html(this.template(this.model.toJSON()));
                return this;
            },
            close: function () {
                console.log('ProductItem.close');
                // 重新实例化时释放监听
                this.stopListening();
            },
            toggleChecked: function () {
                this.$el.find(".toggle").attr( "checked", this.model.get('checked') );
            },
            editItem: function () {
                console.log('1.ProductItem.editItem');
                var ctx = this;
                seajs.use(['dialog-plus'], function (dialog) {
                    window.dialog = dialog;

                    window.detailDialog = dialog({
                        id: 'product-edit-dialog',
                        title: '产品修改',
                        width: 800,
                        url: 'http://jihui88.com/member/modules/product/product_detail.html?id=' + ctx.model.id ,
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
                            ctx.model.set(Est.cloneDeep(window.model));
                            this.remove();
                            window.model = {};
                        }
                    });
                    window.detailDialog.showModal();
                });


            },
            deleteItem: function () {
                console.log('ProductItem.deleteItem');
                var ctx = this;
                seajs.use(['dialog-plus'], function (dialog) {
                    dialog({
                        title: '提示',
                        content: '是否删除！',
                        width:150,
                        button: [{
                            value: '确定',
                            autofocus: true,
                            callback: function () {
                                ctx.model.destroy();
                            }}, {
                            value: '取消',
                            callback: function(){
                                this.close();
                            }
                        }]
                    }).show(ctx.$el.find('.delete').get(0));
                });
            },
            showName: function () {
                var ctx = this;
                console.log('ProductItem.showName');
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
                d.show(ctx.$el.find('.name').get(0));
            },
            setName: function (name) {
                console.log('ProductItem.setName');
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
                console.log('ProductItem.clear');
                this.model.destroy();
            }
        });

        module.exports = ProductItem;
    });