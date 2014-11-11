/**
 * @description 产品分类添加或修改视图
 * @namespace ProductCategoryDetail
 * @author yongjin on 2014/10/31
 */
define('ProductCategoryDetail', ['jquery', 'underscore', 'backbone', 'CategoryModel', 'handlebars', 'Est'],
    function (require, exports, module) {
        var ProductCategoryDetail, CategoryModel, Handlebars, Est, Backbone;

        CategoryModel = require('ProductModel');
        Handlebars = require('handlebars');
        Backbone = require('backbone');
        Est = require('Est');

        ProductCategoryDetail = Backbone.View.extend({

            el: '#product-category-add-container',

            events: {
                'click #product-category-reset': 'reset'
            },

            template: Handlebars.compile($("#product-category-detail-tpl").html()),

            initialize: function () {
                console.log('ProductCategoryDetail.initialize');
                var ctx = this;
                this.passId = Est.getUrlParam('id', window.location.href);

                if (!Est.isEmpty(this.passId)) {
                    this.model = new CategoryModel();
                    this.model.set('id', this.passId);
                    this.model.fetch().done(function () {
                        ctx.render().resetIframe();
                    });
                } else {
                    this.passId = new Date().getTime();
                    this.model = new CategoryModel();
                    this.render().resetIframe();
                }
            },

            saveItem: function (callback, context) {
                console.log('ProductCategoryDetail.saveItem');
                this.model.save(null, {
                    wait: true,
                    success: function (response) {
                        console.log('ProducCategorytDetail.saveSuccess');
                        if (top) {
                            top.model = response.attributes;
                        }
                        if (callback && typeof callback === 'function')
                            callback.call(context, response);
                    }
                });
            },

            render: function () {
                console.log('ProductCategoryDetail.render');
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
                            {title: '高级', value: '2'},
                            {title: '搜索引擎优化', value: '3'}
                        ]
                    });
                });

                // 分类
                $.ajax({
                    type: 'post',
                    url: 'http://jihui88.com/rest/api/category/product?pageSize=1000',
                    data: {
                        _method: 'GET'
                    },
                    success: function (result) {
                        if (result.attributes) {
                            ctx.items = Est.bulidTreeNode(result.attributes.data, 'grade', '01', {
                                categoryId: 'categoryId',// 分类ＩＤ
                                belongId: 'belongId',// 父类ＩＤ
                                childTag: 'cates', // 子分类集的字段名称
                                sortBy: 'sort', // 按某个字段排序
                                callback: function (item) {
                                    item.text = item.name;
                                    item.value = item.categoryId
                                }  // 回调函数
                            });
                            Est.bulidSelectNode(ctx.items, 2, {
                                name: 'text'
                            });
                            BUI.use('bui/select', function (Select) {
                                var select = new Select.Select({
                                    render: '#s1',
                                    valueField: '#category',
                                    items: Est.extendTree(ctx.items)
                                });
                                select.render();
                                select.on('change', function (ev) {
                                    $("#category").val(ev.item.categoryId);
                                });

                                var typeSelect = new Select.Select({
                                    render: '#s2',
                                    width:100,
                                    valueField: '#model-type',
                                    items: [{text: '普通', value: 'NM'}, {text: '新品', value: 'NW'}, {text: '精品', value: 'CP'}]
                                });
                                typeSelect.render();
                                typeSelect.on('change', function(ev){
                                    $("#model-type").val(ev.item.value);
                                });
                                var loginViewSelect = new Select.Select({
                                    render: '#s2',
                                    width:100,
                                    valueField: '#model-loginView',
                                    items: [{text: '访问者可见', value: '1'}, {text: '登录后可见', value: '0'}]
                                });
                                loginViewSelect.render();
                                loginViewSelect.on('change', function(ev){
                                    $("#model-loginView").val(ev.item.value);
                                });
                                var adsSelect = new Select.Select({
                                    render: '#s2',
                                    width:100,
                                    valueField: '#model-ads',
                                    items: [{text: '广告产品', value: '2'}, {text: '是', value: '1'}, {text: '否', value: '0'}]
                                });
                                adsSelect.render();
                                adsSelect.on('change', function(ev){
                                    $("#model-ads").val(ev.item.value);
                                });
                            });
                        }
                        console.dir(result);
                    }
                });

                // 验证
                BUI.use('bui/form', function (Form) {
                    new Form.Form({
                        srcNode: '#J_Form'
                    }).render();
                });

                // 保存
                $('#product-category-submit', this.el).on('click', function () {
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
                window.detailDialog.height($(document).height());
            },

            remove: function () {
                console.log('ProductCategoryDetail.remove');
                this.model.destroy();
                this.model = null;
                return this;
            },

            close: function () {
                console.log('ProductCategoryDetail.close');
                this.undelegateEvents();
                this.stopListening();
                this.off();
            }

        });

        module.exports = ProductCategoryDetail;

    });