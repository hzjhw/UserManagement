/**
 * @description 产品属性添加或修改视图
 * @namespace ProductTypeDetail
 * @author yongjin on 2014/11/11
 */
define('ProductTypeDetail', ['jquery', 'underscore', 'backbone', 'ProductTypeModel', 'handlebars', 'Est'],
    function (require, exports, module) {
        var ProductTypeDetail, ProductTypeModel, Handlebars, Est, Backbone;

        ProductTypeModel = require('ProductTypeModel');
        Handlebars = require('handlebars');
        Backbone = require('backbone');
        Est = require('Est');

        ProductTypeDetail = Backbone.View.extend({

            el: '#product-add-container',

            events: {
                'click #product-type-reset': 'reset'
            },

            template: Handlebars.compile($("#product-type-detail-tpl").html()),

            initialize: function () {
                console.log('ProductTypeDetail.initialize');
                var ctx = this;
                this.passId = Est.getUrlParam('id', window.location.href);

                if (!Est.isEmpty(this.passId)) {
                    this.model = new ProductTypeModel();
                    this.model.set('id', this.passId);
                    this.model.fetch().done(function () {
                        ctx.render().resetIframe();
                    });
                } else {
                    this.passId = new Date().getTime();
                    this.model = new ProductTypeModel();
                    this.render().resetIframe();
                }
            },

            saveItem: function (callback, context) {
                console.log('ProductTypeDetail.saveItem');
                this.model.save(null, {
                    wait: true,
                    success: function (response) {
                        console.log('ProductsTypeDetail.saveSuccess');
                        if (top) {
                            top.model = response.attributes;
                        }
                        if (callback && typeof callback === 'function')
                            callback.call(context, response);
                    }
                });
            },

            render: function () {
                console.log('ProductTypeDetail.render');
                var ctx = this;
                this.$el.html(this.template(this.model.toJSON()));
                // 验证
                BUI.use('bui/form', function (Form) {
                    new Form.Form({
                        srcNode: '#J_Form'
                    }).render();
                });
                // 保存
                $('#product-type-submit', this.el).on('click', function () {
                    $("#J_Form input").each(function () {
                        ctx.model.set($(this).attr('name'), $(this).val());
                    });
                    ctx.saveItem(function () {
                    });
                });

                return this;
            },

            reset: function () {
                this.model.set(this.model.defaults);
            },

            resetIframe: function () {
                window.productTypeDetailDialog.height($(document).height());
            },

            remove: function () {
                console.log('ProductTypeDetail.remove');
                this.model.destroy();
                this.model = null;
                return this;
            },

            close: function () {
                console.log('ProductTypeDetail.close');
                this.undelegateEvents();
                this.stopListening();
                this.off();
            }

        });

        module.exports = ProductTypeDetail;

    });