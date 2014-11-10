/**
 * @description 产品添加或修改视图
 * @namespace ProductDetail
 * @author yongjin on 2014/10/31
 */
define('ProductDetail', ['jquery', 'underscore', 'backbone', 'ProductModel', 'handlebars', 'Est'],
    function (require, exports, module) {
        var ProductDetail, ProductModel, Handlebars, Est, Backbone;

        ProductModel = require('ProductModel');
        Handlebars = require('handlebars');
        Backbone = require('backbone');
        Est = require('Est');

        ProductDetail = Backbone.View.extend({

            el: '#product-add-container',

            events: {
                'click #product-reset': 'reset'
            },

            template: Handlebars.compile($("#product-detail-tpl").html()),

            initialize: function () {
                console.log('ProductDetail.initialize');
                var ctx = this;
                this.passId = Est.getUrlParam('id', window.location.href);

                this.items = [
                    {text: '分类1', value: 'Category_00000000000000000001683'},
                    {text: '选项2', value: 'Category_00000000000000000001684'},
                    {text: '选项3', value: 'Category_00000000000000000001685'}
                ];


                if (!Est.isEmpty(this.passId)) {
                    this.model = new ProductModel();
                    this.model.set('id', this.passId);
                    this.model.fetch().done(function () {
                        ctx.render().resetIframe();
                    });
                } else {
                    this.passId = new Date().getTime();
                    this.model = new ProductModel();
                    this.render().resetIframe();
                }
            },

            saveItem: function (callback, context) {
                console.log('ProductDetail.saveItem');
                this.model.save(null, {
                    wait: true,
                    success: function (response) {
                        console.log('ProductDetail.saveSuccess');
                        if (top) {
                            top.model = response.attributes;
                        }
                        if (callback && typeof callback === 'function')
                            callback.call(context, response);
                    }
                });
            },

            render: function () {
                console.log('ProductDetail.render');
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
                $('#product-submit', this.el).on('click', function () {
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
                console.log('ProductDetail.remove');
                this.model.destroy();
                this.model = null;
                return this;
            },

            close: function () {
                console.log('ProductDetail.close');
                this.undelegateEvents();
                this.stopListening();
                this.off();
            }

        });

        module.exports = ProductDetail;

    });