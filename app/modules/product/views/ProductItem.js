/**
 * @description 产品列表li视图
 * @namespace ProducItem
 * @author yongjin on 2014/10/31
 */
define('ProductItem', ['jquery', 'underscore', 'backbone', 'dialog', 'handlebars', 'BaseRoot', 'Est'],
    function (require, exports, module) {
        var ProductItem, handlebars, Backbone, BaseRoot, Est;

        Backbone = require('backbone');
        handlebars = require('handlebars');
        BaseRoot = require('BaseRoot');
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
                console.log('ProductItem.render [item display]');
                this.$el.html(this.template(this.model.toJSON()));
                return this;
            },
            close: function () {
                console.log('ProductItem.close');
                // 重新实例化时释放监听
                this.stopListening();
            },
            editItem: function () {
                var ctx = this;
                console.log('ProductItem.editItem');

                var dialog = require('dialog');
                var ProductDetail = require("ProductDetail");

                this.model.fetch().done(function (response) {
                    ctx.productDetail = new ProductDetail({
                        model: ctx.model
                    });
                    BUI.use(['bui/overlay', 'bui/form'], function (Overlay, Form) {

                        var form = new Form.HForm({
                            srcNode: '#form'
                        }).render();

                        if (!ctx.productDetailDialog){
                            ctx.productDetailDialog = new Overlay.Dialog({
                                title: '产品修改',
                                width: 800,
                                contentId: 'dialog-container',
                                closeAction : 'destroy',//每次关闭dialog释放
                                buttons:[
                                    {
                                        text:'确定',
                                        elCls : 'button button-primary',
                                        handler : function(){
                                            ctx.productDetail.saveItem(function () {
                                                //this.close();
                                            }, ctx);
                                            this.close();
                                            $("#dialog-container").append("<div id=\"product-add-container\"></div>");
                                        }
                                    },{
                                        text:'关闭',
                                        elCls : 'button',
                                        handler : function(){
                                            this.close();
                                            $("#dialog-container").append("<div id=\"product-add-container\"></div>");
                                        }
                                    }
                                ]
                            });
                        }
                        ctx.productDetailDialog.show();
                    });
                });
            },
            deleteItem: function () {
                console.log('ProductItem.deleteItem');
                this.model.destroy();
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
                d.show();
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