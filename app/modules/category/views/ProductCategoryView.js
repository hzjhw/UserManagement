/**
 * @description 产品分类列表视图
 * @namespace ProductCategoryView
 * @author yongjin on 2014/10/31
 */
define('ProductCategoryView', ['jquery', 'ProductCategoryItem', 'ProductCategoryCollection', 'BaseView', 'Est'],
    function (require, exports, module) {
        var ProductCategoryView, ProductCategoryItem, ProductCategoryCollection, BaseView, Est, template;

        ProductCategoryItem = require("ProductCategoryItem");
        ProductCategoryCollection = require("ProductCategoryCollection");
        BaseView = require('BaseView');
        Est = require('Est');
        template = require('http://jihui88.com/member/modules/category/templates/category_product_list.html');

        ProductCategoryView = BaseView.extend({
            el: '#main',
            events: {
                'click #toggle-all': 'toggleAllChecked',
                'click .product-category-add': 'openAddDialog'
            },

            initialize: function(){
                var ctx = this;
                this.$el.empty();
                this.$el.append($(template));
                this.list = $("#product-category-list-ul", this.$el);
                this.initCollection(ProductCategoryCollection, this).then(function(collection){
                    Est.sortBy(collection.models, function(item){
                        return item.attributes.sort;
                    });
                    Est.bulidTreeNode(collection.models, 'grade', '00', {
                        categoryId: 'categoryId',// 分类ＩＤ
                        belongId: 'belongId',// 父类ＩＤ
                        childTag: 'cates', // 子分类集的字段名称
                        sortBy: 'sort', // 按某个字段排序
                        callback: function(item){}  // 回调函数
                    });
                    ctx.render();
                });
                this.initItemView(ProductCategoryItem, this);
                return this;
            },

            render: function(){
                this.addAll();
            },

            openAddDialog: function(){
                this.detail({
                    title: '分类添加',
                    url: 'http://jihui88.com/member/modules/category/product_category_detail.html?time=' + new Date().getTime()
                });
            }
        });

        module.exports = ProductCategoryView;
    });