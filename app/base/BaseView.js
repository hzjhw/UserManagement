/**
 * @description BaseView
 * @namespace BaseView
 * @author yongjin on 2014/11/12
 */

define('BaseView', ['jquery', 'underscore', 'backbone', 'Est'],
    function (require, exports, module) {
        var BaseView, Backbone, Est;

        Backbone = require('backbone');
        Est = require('Est');

        BaseView = Backbone.View.extend({
            initCollection: function (collection, ctx) {
                console.log('1.ProductView.initialize');
                this.views = [];
                this.allCheckbox = this.$('#toggle-all')[0];
                this.collection = new collection();
                this.listenTo(this.collection, 'change:checked', this.checkSelect);
                return new Est.promise(function(resolve, reject){
                    ctx.collection.paginationModel.on('reloadList', function (model) {
                        ctx.collection.load(ctx.collection, ctx, model)
                            .then(function(result){
                                resolve(result);
                        });
                    });
                    ctx.collection.load(ctx.collection, ctx)
                        .then(function(result){
                            resolve(result);
                    });
                });
            },

            initBind: function(){
                this.collection.bind('add', this.addOne, this);
                this.collection.bind('reset', this.render, this);
            },

            render: function () {
                console.log('BaseView.render');
                this.addAll();
            },

            initItemView: function (itemView) {
                this.itemView = itemView;
            },

            empty: function () {
                console.log('5.ProductView.empty');
                _.each(this.views, function (view) {
                    view.off().remove();
                })
                this.views = [];
                this.list.html("");
            },

            addOne: function (target) {
                var itemView = new this.itemView({
                    model: target
                });
                this.list.append(itemView.render().el);
                this.views.push(itemView);
            },

            addAll: function () {
                console.log('ProductView.addAll');
                this.empty();
                this.collection.each(this.addOne, this);
            },

            detail: function (options) {
                console.log('1.ProductView.openAddDialog');
                var ctx = this;
                seajs.use(['dialog-plus'], function (dialog) {
                    window.dialog = dialog;
                    window.detailDialog = dialog({
                        id: 'detail-dialog',
                        title: options.title || '详细信息',
                        width: 800,
                        url: options.url || '',
                        button: [{
                                value: '保存',
                                callback: function () {
                                    this.iframeNode.contentWindow.$("#submit").click();
                                    return false;
                                },
                                autofocus: true
                            }, {
                                value: '重置',
                                callback: function () {
                                    this.iframeNode.contentWindow.$("#reset").click();
                                    return false;
                                }
                            },
                            { value: '关闭' }
                        ],
                        oniframeload: function () {
                            this.iframeNode.contentWindow.detailDialog = window.detailDialog;
                        },
                        onclose: function () {
                            ctx.collection.load(ctx.collection, ctx).
                                then(function () {
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

        module.exports = BaseView;

    });