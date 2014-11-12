/**
 * @description 产品分类添加或修改视图
 * @namespace ProductCategoryDetail
 * @author yongjin on 2014/10/31
 */
define('ProductCategoryDetail', ['jquery', 'CategoryModel', 'HandlebarsHelper', 'Est', 'BaseDetail'],
    function (require, exports, module) {
        var ProductCategoryDetail, CategoryModel, HandlebarsHelper, Est, BaseDetail;

        CategoryModel = require('CategoryModel');
        HandlebarsHelper = require('HandlebarsHelper');
        Est = require('Est');
        BaseDetail = require('BaseDetail');

        ProductCategoryDetail = BaseDetail.extend({
            el: '#product-category-add-container',
            events: {
                'click #product-category-reset': 'reset'
            },
            template: HandlebarsHelper.compile($("#product-category-detail-tpl").html()),

            initialize: function () {
                console.log('ProductCategoryDetail.initialize');
                this.initModel(CategoryModel, this);
            },

            render: function () {
                console.log('ProductCategoryDetail.render');
                console.log('4.ProductDetail.render');
                var ctx = this;
                this.$el.html(this.template(this.model.toJSON()));

                // 验证
                BUI.use('bui/form', function (Form) {
                    new Form.Form({
                        srcNode: '#J_Form'
                    }).render();
                });
                // 保存
                $('#submit', this.el).on('click', function () {
                    $("#J_Form input").each(function () {
                        ctx.model.set($(this).attr('name'), $(this).val());
                    });
                    ctx.saveItem(function () {
                    });
                });
                return this;
            }
        });

        module.exports = ProductCategoryDetail;

    });