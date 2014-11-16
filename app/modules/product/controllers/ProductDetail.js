/**
 * @description 产品添加或修改视图
 * @namespace ProductDetail
 * @author yongjin on 2014/10/31
 */
define('ProductDetail', ['jquery', 'ProductModel', 'HandlebarsHelper', 'Est', 'BaseDetail'],
    function (require, exports, module) {
        var ProductDetail, ProductModel, HandlebarsHelper, Est, BaseDetail, template;

        ProductModel = require('ProductModel');
        HandlebarsHelper = require('HandlebarsHelper');
        Est = require('Est');
        BaseDetail = require('BaseDetail');
        template = require('http://jihui88.com/member/modules/product/views/product_detail.html') || 'product_detail.html[404]';

        ProductDetail = BaseDetail.extend({
            el: '#jhw-detail',
            template: HandlebarsHelper.compile(template),
            events: {
                'click #product-reset': 'reset'
            },
            initialize: function () {
                console.log('2.ProductDetail.initialize');
                this.initModel(ProductModel, this);
            },

            render: function () {
                console.log('4.ProductDetail.render');
                var ctx = this;
                this.$el.html(this.template(this.model.toJSON()));

                BUI.use(['bui/tab', 'bui/mask'], function (Tab) {
                    var tab = new Tab.TabPanel({
                        render: '#tab',
                        elCls: 'nav-tabs',
                        panelContainer: '#panel',
                        autoRender: true,
                        children: [
                            {title: '常规', value: '1', selected: true},
                            {title: '产品描述', value: '2'},
                            {title: '产品属性', value: '3'},
                            {title: '产品标签', value: '4'},
                            {title: '搜索引擎优化', value: '5'}
                        ]
                    });
                });

                // 产品分类
                this.getProductCategory({ select: true, extend: true })
                    .then(function (list) {
                        ctx.initSelect({
                            render: '#s1',
                            target: '#category',
                            items: list
                        });
                    });

                // 产品属性
                this.initSelect({
                    render: '#s2',
                    width: 100,
                    target: '#model-type',
                    items: [ {text: '普通', value: 'NM'}, {text: '新品', value: 'NW'}, {text: '精品', value: 'CP'} ]
                });
                this.initSelect({
                    render: '#s2',
                    width: 100,
                    target: '#model-loginView',
                    items: [ {text: '访问者可见', value: '1'}, {text: '登录后可见', value: '0'} ]
                });
                this.initSelect({
                    render: '#s2',
                    width: 100,
                    target: '#model-ads',
                    items: [ {text: '广告产品', value: '2'}, {text: '是', value: '1'}, {text: '否', value: '0'} ]
                });

                // 编辑器
                this.initEditor();

                this.form('#J_Form').validate().init();
                return this;
            }
        });

        module.exports = ProductDetail;

    });