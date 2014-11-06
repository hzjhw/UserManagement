/**
 * @description 产品列表li视图
 * @namespace ProducItem
 * @author yongjin on 2014/10/31
 */
define('ProductItem', ['jquery', 'underscore', 'backbone', 'dialog', 'handlebars'],
    function (require, exports, module) {
        var ProductItem, handlebars, Backbone;

        Backbone = require('backbone');
        handlebars = require('handlebars');

        ProductItem = Backbone.View.extend({
            id: 'product-li-',
            tagName: 'li',
            template: handlebars.compile($('#item-product').html()),
            events: {
                'click .name': 'showName',
                'click .delete': 'deleteItem',
                'click .edit': 'editItem'
            },
            initialize: function () {
                // 判断是否修改
                this.listenTo(this.model, 'change', this.render);
            },
            render: function () {
                this.$el.html(this.template(this.model.toJSON()));
                return this;
            },
            close: function(){
                // 重新实例化时释放监听
                this.stopListening();
            },
            editItem: function(){
                var ctx = this;

                var dialog = require('dialog');
                var ProductDetail = require("ProductDetail");

                this.model.fetch().done(function(){
                    var productDetail = new ProductDetail({
                        model: ctx.model
                    });

                    BUI.use(['bui/overlay','bui/form'],function(Overlay,Form){

                        var form = new Form.HForm({
                            srcNode : '#form'
                        }).render();

                        var dialog = new Overlay.Dialog({
                            title:'产品修改',
                            width:800,
                            height:400,
                            contentId:'dialog-container',
                            success:function () {
                                productDetail.saveItem();
                                this.close();
                            }
                        });
                        dialog.show();
                    });
                });
            },
            deleteItem: function(){
                this.model.destroy();
                this.remove();
            },
            showName: function () {
               var ctx = this;
                var dialog = require('dialog');
                var oldName = this.model.attributes.name;
                var d = dialog({
                    title: '修改名称',
                    content: '<input id="property-returnValue-demo" class="text" value="'+oldName+'" />',
                    ok: function () {
                        var value = $('#property-returnValue-demo').val();
                        this.close(value);
                        this.remove();
                    }
                });
                d.addEventListener('close', function () {
                    if (!this.returnValue.length < 1){
                        ctx.setName(this.returnValue);
                    }
                });
                d.show();
            },
            setName: function (name) {
                var ctx = this;
                this.model.saveField({
                    'name': name,
                    'test': 'test'
                }, function(model, result){
                    console.dir(model);
                    console.dir(result);
                    ctx.render();
                }, this);
            },
            clear: function () {
                this.model.destroy();
            }
        });

        module.exports = ProductItem;
    });